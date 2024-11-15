import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { PanelSelect, InverterSelect, AdditionalInverterSelect, BatterySelect } from './ProductSelect';
import { Deposit, PaymentMethod, BatteryRebate } from './Pricing';
import { NumberPanels } from './NumberPanels';
import ExtraInputs from './ExtraInputs';


function SwitchTabs({
    panels, selectedPanel, setSelectedPanel,
    inverters, selectedInverter, setSelectedInverter, additionalSelectedInverter, setAdditionalSelectedInverter,
    numberPanels, setNumberPanels, sysSize,
    battery, selectedBattery, setSelectedBattery,
    deposit, setDeposit,
    paymentMethod, selectedPaymentMethod, setSelectedPaymentMethod, 
    batteryRebate, setBatteryRebate,
    quantities, handleChange, totalSum, extras,
    plentiTerm,
    setPlentiTerm,
}) 
    {
  return (
    <div className="flex flex-col rounded-t-2xl">
      <Tabs
        defaultActiveKey="Main"
        id="fill-tab-example"
        className="mb-0"
        fill
      >
        <Tab 
          eventKey="Main" 
          title={<span className="px-4 py-2">Main</span>} 
          className="pt-6"
        >
          <div className="p-6 pt-0">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="w-1/3 text-sm text-gray-700">Select Panel Model</label>
                <div className="w-2/3">
                  <PanelSelect panels={panels} selectedPanel={selectedPanel} setSelectedPanel={setSelectedPanel} />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-1/3 text-sm text-gray-700">Select Inverter Model</label>
                <div className="w-2/3">
                  <InverterSelect inverters={inverters} selectedInverter={selectedInverter} setSelectedInverter={setSelectedInverter} />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-1/3 text-sm text-gray-700">Additional Inverter</label>
                <div className="w-2/3">
                  <AdditionalInverterSelect inverters={inverters} additionalSelectedInverter={additionalSelectedInverter} setAdditionalSelectedInverter={setAdditionalSelectedInverter} />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-1/3 text-sm text-gray-700">Number of Panels</label>
                <div className="w-2/3">
                  <NumberPanels numberPanels={numberPanels} setNumberPanels={setNumberPanels}/>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-1/3 text-sm text-gray-700">Battery Model</label>
                <div className="w-2/3">
                  <BatterySelect battery={battery} selectedBattery={selectedBattery} setSelectedBattery={setSelectedBattery} />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-1/3 text-sm text-gray-700">Battery Rebate Eligible</label>
                <div className="w-2/3">
                  <BatteryRebate 
                    batteryRebate={batteryRebate} 
                    setBatteryRebate={setBatteryRebate}
                    selectedBattery={selectedBattery}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-1/3 text-sm text-gray-700">Deposit Amount</label>
                <div className="w-2/3">
                  <Deposit deposit={deposit} setDeposit={setDeposit} />
                </div>
              </div>

              {deposit !== null && (
                <div className="flex items-center gap-4">
                  <label className="w-1/3 text-sm text-gray-700">Payment Method</label>
                  <div className="w-2/3">
                    <PaymentMethod 
                      paymentMethod={paymentMethod} 
                      selectedPaymentMethod={selectedPaymentMethod} 
                      setSelectedPaymentMethod={setSelectedPaymentMethod}
                      plentiTerm={plentiTerm}
                      setPlentiTerm={setPlentiTerm}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Tab>

        <Tab 
          eventKey="Extras" 
          title={<span className="px-4 py-2">Extras</span>} 
          className="pt-0"
        >
          <div className="p-6 pt-0">
            <ExtraInputs quantities={quantities} handleChange={handleChange} totalSum={totalSum} extras={extras}/>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export { SwitchTabs } ;