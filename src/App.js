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
  const [plentiTerm, setPlentiTerm] = useState(null);

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
  const getPaymentMonths = () => {
    if (selectedPaymentMethod?.isPlenti) {
      return plentiTerm?.months || 0;
    }
    return selectedPaymentMethod?.months || 0;
  };

  // Calculate monthly interest rate (annual rate / 12)
  const getMonthlyInterestRate = () => {
    if (selectedPaymentMethod?.isPlenti && plentiTerm) {
      return plentiTerm.interestRate / 100 / 12;
    }
    return 0;
  };

  const residualpayment = selectedPaymentMethod ? 
    (totalCost - deposit) * selectedPaymentMethod.multiplier : 0;

  // Calculate monthly payment using amortization formula
  const calculateMonthlyPayment = () => {
    if (!selectedPaymentMethod?.isPlenti || !plentiTerm) return 0;

    const principal = residualpayment;
    const monthlyRate = getMonthlyInterestRate();
    const numberOfPayments = getPaymentMonths();
    
    if (monthlyRate === 0 || numberOfPayments === 0) return 0;

    // Add $400 credit assistance fee to the principal
    const totalPrincipal = principal + 400;

    // Amortization formula: PMT = P * (r(1+r)^n)/((1+r)^n-1)
    // Where: P = Principal, r = Monthly Interest Rate, n = Number of Payments
    const baseMonthlyPayment = 
      totalPrincipal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Add $8.99 monthly account management fee
    return baseMonthlyPayment + 8.99;
  };

  // Calculate weekly payment
  const weeklypayment = useMemo(() => {
    if (!selectedPaymentMethod) return 0;
    
    if (selectedPaymentMethod.isPlenti) {
      // Convert monthly payment to weekly (monthly * 12 / 52)
      return calculateMonthlyPayment() * 12 / 52;
    }

    // Original calculation for non-Plenti payment methods
    return (residualpayment/(4.35*getPaymentMonths())) + 1.5;
  }, [selectedPaymentMethod, residualpayment, getPaymentMonths]);

  // Calculate total amount to be paid
  const agreementTotal = useMemo(() => {
    if (!selectedPaymentMethod) return 0;
    
    // For all payment methods, including Plenti, the supply agreement total
    // should be deposit + payment plan approval amount
    return Number(residualpayment) + Number(deposit);
    
  }, [selectedPaymentMethod, deposit, residualpayment]);

  // Add a new calculation for the total cost including fees (for display purposes if needed)
  const totalPaymentsWithFees = useMemo(() => {
    if (selectedPaymentMethod?.isPlenti && plentiTerm) {
      const monthlyPayment = calculateMonthlyPayment();
      const months = getPaymentMonths();
      // This includes all fees and payments
      return (monthlyPayment * months) + Number(deposit);
    }
    return agreementTotal;
  }, [selectedPaymentMethod, plentiTerm, deposit, agreementTotal]);

  return (
    <div className="App">
      <div className="flex items-center flex-col flex-wrap pt-10 text-5xl">
        <h1>Virtual Power Co Pricing Tool</h1>
        <h3>NSW Residential Pricing </h3>
        <h5>November 2024</h5>
      </div>

      <div className="flex flex-row w-full p-4 gap-4">
        <div className="w-1/2">
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
            plentiTerm={plentiTerm}
            setPlentiTerm={setPlentiTerm}
          />
        </div>

        <div className="w-1/2 space-y-4">
          <div className="bg-white p-4 rounded-xl">
            <h3><b>System Overview</b></h3>
            {selectedPanel && (
              <h5>The solar system size selected is <b>{sysSize}</b></h5>
            )}
            {selectedBattery && (
              <h5>The battery size selected is: <b>{selectedBattery.size} kWh</b></h5>
            )}
          </div>

          {selectedInverter && (
            <div className="bg-white p-4 rounded-xl">
              <h3><b>Pricing Breakdown</b></h3>
              <div className="grid grid-cols-3 grid-rows-3 pb-2 auto-cols-max auto-rows-max m-auto">
                <h5 className="col-span-2 pb-2">Total System Cost Before Rebates: </h5>
                <h5 className="text-gray-400"><b>{totalsystemcost}</b></h5>
                <h5 className="col-span-2">STC Rebate Amount: </h5>
                <h5><b>{Intl.NumberFormat("en-US", options).format(rebateamount)}</b></h5>

                {selectedBattery && (
                  <>
                    <h5 className="col-span-2">NSW 2024 Battery Rebate: </h5>
                    <h5><b>{Intl.NumberFormat("en-US", options).format(batteryRebate)}</b></h5>
                  </>
                )}

                <h5 className="col-span-2">Net System Cost After Rebates: </h5>
                <h5 className="text-emerald-500"><b>{finalCost}</b></h5>
              </div>
            </div>
          )}

          {selectedPaymentMethod && (
            <div className="bg-white p-4 rounded-xl">
              <h3><b>Payment Plan Breakdown</b></h3>
              <div className="grid grid-cols-3 grid-rows-3 pb-2 auto-cols-max auto-rows-max m-auto">
                <h5 className="col-span-2 pb-2">Deposit:</h5>
                <h5><b>{Intl.NumberFormat("en-US", options).format(deposit)}</b></h5>
                <h5 className="col-span-2 pb-2">Payment Plan Approval Amount: </h5>
                <h5><b>{Intl.NumberFormat("en-US", options).format(residualpayment)}</b></h5>
                <h5 className="col-span-2">Term (months): </h5>
                <h5><b>
                  {selectedPaymentMethod?.isPlenti 
                    ? plentiTerm?.months || 'Select Term'
                    : selectedPaymentMethod?.months || 0}
                </b></h5>
                <h5 className="col-span-2 pb-2">Estimated Weekly Payment: </h5>
                <h5 className="text-emerald-500"><b>{Intl.NumberFormat("en-US", options).format(weeklypayment)}</b></h5>
                <h5 className="col-span-2 pb-2">Supply Agreement Total: </h5>
                <h5><b>{Intl.NumberFormat("en-US", options).format(agreementTotal)}</b></h5>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;