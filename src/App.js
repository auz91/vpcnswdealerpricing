import './index.css';
import { useState, useEffect, useMemo } from 'react';
import { PanelSelect, InverterSelect, AdditionalInverterSelect, BatterySelect } from './components/ProductSelect.js';
import {NumberPanels} from './components/NumberPanels';
import { inverters } from './components/Data';
import { panels } from './components/Data';
import { battery } from './components/Data';
import { paymentMethod } from './components/Data';
import { Deposit, PaymentMethod, BatteryRebate } from './components/Pricing';
import { SwitchTabs } from './components/Tabs';
import { extras } from './components/Extras.js';
import ExtraInputs from './components/ExtraInputs.js';


function App() {

  const options = { style: 'currency', currency: 'USD' };
  
  // Initialize quantities first
  const initialQuantities = Object.keys(extras).reduce((acc, key) => {
    if (key === "addarray") {
      acc[key] = 1;
    } else {
      acc[key] = 0;
    }
    return acc;
  }, {});

  // Then use it in useState declarations
  const [quantities, setQuantities] = useState(initialQuantities);
  const [totalSum, setTotalSum] = useState(0);
  const [numberPanels, setNumberPanels] = useState('0');
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [selectedInverter, setSelectedInverter] = useState(null);
  const [additionalSelectedInverter, setAdditionalSelectedInverter] = useState(null);
  const [selectedBattery, setSelectedBattery] = useState(battery[0]);
  const [batteryRebate, setBatteryRebate] = useState(0);
  const [deposit, setDeposit] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Derived calculations
  const sysSize = selectedPanel ? [numberPanels * selectedPanel.watts/1000 + 'kW'] : 0;

  // Handle quantity changes
  const handleChange = (item, value) => {
    const numericalValue = Math.max(0, parseFloat(value) || 0);
    setQuantities(prev => ({ ...prev, [item]: numericalValue }));
  };

  // Calculate totalSum effect
  useEffect(() => {
    const newTotalSum = Object.entries(quantities).reduce((acc, [key, qty]) => {
      return acc + (qty * extras[key][0].cost);
    }, 0);
    setTotalSum(newTotalSum);
  }, [quantities]);

  // Calculate STC rebates
  const rebates = selectedPanel ? 
    (selectedPanel.watts * parseInt(numberPanels) * 1.3762 * 7 / 1000 * 39.40) : 0;
  const rebateamount = Math.floor(rebates);

  // Calculate raw system cost
  const rawSystemCost = useMemo(() => {
    return (selectedInverter ? selectedInverter.price : 0) +
           (additionalSelectedInverter ? additionalSelectedInverter.price : 0) +
           (selectedBattery ? selectedBattery.cost : 0) +
           ((selectedPanel ? selectedPanel.cost : 0) * parseInt(numberPanels)) +
           totalSum;
  }, [selectedInverter, additionalSelectedInverter, selectedBattery, 
      selectedPanel, numberPanels, totalSum]);

  // Calculate total cost after rebates
  const totalCost = rawSystemCost - rebateamount - batteryRebate;
  
  // Format costs for display
  const finalCost = Intl.NumberFormat("en-US", options).format(totalCost);
  const totalsystemcost = totalCost > 0 ? 
    Intl.NumberFormat("en-US", options).format(rawSystemCost) : 0;

  // Finance calculations
  const residualpayment = selectedPaymentMethod ? 
    (totalCost - deposit) * selectedPaymentMethod.multiplier : 0;

  const weeklypayment = selectedPaymentMethod ? 
    (residualpayment/(4.35*selectedPaymentMethod.months)) + 1.5 : 0;
  
  const agreementTotal = Number(residualpayment) + Number(deposit);
  
  const effInterestRate = selectedPaymentMethod ? 
    (Number(agreementTotal) - Number(totalCost))/
    ((selectedPaymentMethod.months/12)*(Number(totalCost)))*100 : 0;

  return (
    <div className="App">
      <div className="flex items-center flex-col flex-wrap pt-10 text-5xl">
        <h1>Virtual Power Co Pricing Tool</h1>
        <h3>NSW Residential Pricing </h3>
        <h5>November 2024</h5>
      </div>

          <div class="
          flex-row
          p-4
          mb-3 
          md:w-full
          lg:w-full
          xl:w-1/2
          md:m-auto">

          <div class="flex-initial shrink m-auto w-full l:w-1/2 h-auto rounded-xl mr-5">
          <SwitchTabs 
          panels={panels}
          selectedPanel={selectedPanel}
          setSelectedPanel={setSelectedPanel}
          inverters={inverters}
          selectedInverter={selectedInverter}
          setSelectedInverter={setSelectedInverter}
          additionalSelectedInverter={additionalSelectedInverter}
          setAdditionalSelectedInverter={setAdditionalSelectedInverter}
          numberPanels={numberPanels}
          setNumberPanels={setNumberPanels}
          sysSize={sysSize}
          battery={battery}
          selectedBattery={selectedBattery}
          setSelectedBattery={setSelectedBattery}
          deposit={deposit}
          setDeposit={setDeposit}
          paymentMethod={paymentMethod}
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          quantities={quantities} 
          handleChange={handleChange} 
          totalSum={totalSum}
          extras={extras}
          batteryRebate={batteryRebate}
          setBatteryRebate={setBatteryRebate}
          ></SwitchTabs>
                </div>
          

        <div class="mt-10 w-100">
          
        <div className="cost-info flex-col flex-wrap justify-stretch py-0 px-0">

        <div className="bg-white p-0 rounded-xl">
          <h3><b>System Overview</b></h3>
        {selectedPanel && (
        
        <h5>The solar system size selected is <b>{sysSize}</b></h5>
        )}
          {selectedBattery && (
          <h5>The battery size selected is: <b>{selectedBattery.size} kWh</b></h5>
          )}
        </div>
          {selectedInverter && (
          <div className="mt-10 pt-4 bg-white p-0 rounded-xl">
        <h3><b>Pricing Breakdown</b></h3>
        <div className="grid grid-cols-3 grid-rows-3 pb-2 auto-cols-max auto-rows-max m-auto">

          <h5 className="col-span-2 pb-2">Total System Cost Before Rebates: </h5>
          <h5 className="text-gray-400"><b>{totalsystemcost}</b></h5>
          <h5 className="col-span-2">STC Rebate Amount: </h5>
          <h5 className=""><b>{Intl.NumberFormat("en-US", options).format(rebateamount)}</b></h5>

          {selectedBattery && (
            <>
          <h5 className="col-span-2">NSW 2024 Battery Rebate: </h5>
          <h5 className=""><b>{Intl.NumberFormat("en-US", options).format(batteryRebate)}</b></h5>
          </>
         )}

          <h5 className="col-span-2 ">Net System Cost After Rebates: </h5>
          <h5 className="text-emerald-500"><b>{finalCost}</b></h5>
          </div>
          </div>
  )}
            {selectedPaymentMethod && ( 
          <div className="mt-10 pt-4 bg-white p-0 rounded-xl">
        <h3><b>Payment Plan Breakdown</b></h3>
        <div className="grid grid-cols-3 grid-rows-3 pb-2 auto-cols-max auto-rows-max m-auto">
          <h5 className="col-span-2 pb-2">Deposit:</h5>
            <h5> <b>{Intl.NumberFormat("en-US", options).format(deposit)}</b></h5>
          <h5 className="col-span-2 pb-2">Payment Plan Approval Amount: </h5>
            <h5> <b>{Intl.NumberFormat("en-US", options).format(residualpayment)}</b></h5>
          <h5 className="col-span-2">Term (months): </h5>
          <h5><b>{selectedPaymentMethod ? selectedPaymentMethod.months : 0}</b></h5>
          <h5 className="col-span-2 pb-2">Estimated Weekly Payment: </h5>
            <h5 className="text-emerald-500"> <b>{Intl.NumberFormat("en-US", options).format(weeklypayment)}</b></h5>
            <h5 className="col-span-2 pb-2">Supply Agreement Total: </h5>
            <h5> <b>{Intl.NumberFormat("en-US", options).format(agreementTotal)}</b></h5>
            <h5 className="col-span-2">Effective Interest Rate Versus Cash: </h5>
            <h5><b>{effInterestRate.toFixed(1)}%</b></h5>
          </div>
          </div>
          )}
        </div>
      
          </div>
          </div>
    </div>
  );
}

export default App;