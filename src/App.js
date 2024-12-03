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
import { pricingVersions } from './components/Data';
import { VersionSelect } from './components/VersionSelect';


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
  const [selectedVersion, setSelectedVersion] = useState(
    pricingVersions.find(v => v.isActive) || pricingVersions[0]
  );

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
    (selectedPanel.watts * parseInt(numberPanels) * 1.3762 * selectedVersion.stcYear / 1000 * 39.40) : 0;
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
    <div className="App bg-[#f5f5f5] min-h-screen pb-16 md:pb-24">
      {/* Header */}
      <div className="flex items-center flex-col pt-8 md:pt-16 pb-6 md:pb-12 px-4">
        <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2 text-center">Virtual Power Co</h1>
        <h3 className="text-lg md:text-xl font-light text-gray-600 text-center">NSW Residential Pricing</h3>
        <div className="flex items-center gap-2">
          <VersionSelect 
            versions={pricingVersions}
            selectedVersion={selectedVersion}
            setSelectedVersion={setSelectedVersion}
          />
        </div>
      </div>

      {/* Main content - Adjusted max-width and column ratios */}
      <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto px-4 md:px-8 gap-4 md:gap-8">
        {/* Left Column - Configuration - Made wider */}
        <div className="w-full lg:w-3/5 bg-white rounded-2xl shadow-sm">
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

        {/* Right Column - Summary - Made narrower */}
        <div className="w-full lg:w-2/5 space-y-4 md:space-y-6">
          {/* System Overview Card */}
          <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-4">System Overview</h3>
            {selectedPanel && (
              <div className="text-sm md:text-base text-gray-700 mb-3">
                System Size: <span className="font-medium text-gray-900">{sysSize}</span>
              </div>
            )}
            {selectedBattery && (
              <div className="text-sm md:text-base text-gray-700">
                Battery Capacity: <span className="font-medium text-gray-900">{selectedBattery.size} kWh</span>
              </div>
            )}
          </div>

          {/* Pricing Breakdown Card */}
          {selectedInverter && (
            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-4">Pricing Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm md:text-base">
                  <span className="text-gray-700">Total System Cost</span>
                  <span className="text-gray-400 font-medium">{totalsystemcost}</span>
                </div>
                <div className="flex justify-between items-center text-sm md:text-base">
                  <span className="text-gray-700">STC Rebate</span>
                  <span className="font-medium text-green-600">
                    {Intl.NumberFormat("en-US", options).format(rebateamount)}
                  </span>
                </div>
                {selectedBattery && (
                  <div className="flex justify-between items-center text-sm md:text-base">
                    <span className="text-gray-700">NSW Battery Rebate</span>
                    <span className="font-medium text-green-600">
                      {Intl.NumberFormat("en-US", options).format(batteryRebate)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-sm md:text-base">
                  <span className="text-gray-900 font-medium">Net System Cost</span>
                  <span className="text-[#f4b942] font-medium">{finalCost}</span>
                </div>
              </div>
            </div>
          )}

          {/* Payment Plan Card */}
          {selectedPaymentMethod && (
            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-4">Payment Plan</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm md:text-base">
                  <span className="text-gray-700">Deposit</span>
                  <span className="font-medium text-gray-900">
                    {Intl.NumberFormat("en-US", options).format(deposit)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm md:text-base">
                  <span className="text-gray-700">Payment Plan Amount</span>
                  <span className="font-medium text-gray-900">
                    {Intl.NumberFormat("en-US", options).format(residualpayment)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm md:text-base">
                  <span className="text-gray-700">Term</span>
                  <span className="font-medium text-gray-900">
                    {selectedPaymentMethod?.isPlenti 
                      ? plentiTerm?.months || 'Select Term'
                      : selectedPaymentMethod?.months || 0} months
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm md:text-base">
                  <span className="text-gray-700">Weekly Payment</span>
                  <span className="text-[#f4b942] font-medium">
                    {Intl.NumberFormat("en-US", options).format(weeklypayment)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-sm md:text-base">
                  <span className="text-gray-900 font-medium">Total Agreement Value</span>
                  <span className="font-medium text-gray-900">
                    {Intl.NumberFormat("en-US", options).format(agreementTotal)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;