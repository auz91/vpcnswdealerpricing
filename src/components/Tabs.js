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
    <Tabs
      defaultActiveKey="Main"
      id="fill-tab-example"
      className="mt-3 vpctab font-bold"
      fill
    >
      <Tab eventKey="Main" title="Main" className=" mb-3 border-gray-200	 border-x-2 border-b-2 rounded-b-lg">
        
      <div className="grid grid-cols-2 grid-rows-3 p-2 auto-cols-max auto-rows-max m-auto">
                  

                  <div className="p-2 self-center">          
                  <h5 className="pr-5 items-center">Please select a panel:</h5>
                  </div>
  
                  <div className="p-2 self-center"> <PanelSelect panels={panels} selectedPanel={selectedPanel} setSelectedPanel={setSelectedPanel} /></div>
  
                  <div className="p-2 self-center"><h5 className="pr-5">Please select an inverter:</h5>
        </div>
  
                  <div className="p-2 self-center"><InverterSelect inverters={inverters} selectedInverter={selectedInverter} setSelectedInverter={setSelectedInverter} />
        </div>
                  <div className="p-2 self-center"><p className="pr-5">Additional inverter (if required):</p>
                  </div>
  
  
                  <div className="p-2 self-center"><AdditionalInverterSelect inverters={inverters} additionalSelectedInverter={additionalSelectedInverter} setAdditionalSelectedInverter={setAdditionalSelectedInverter} />
        </div>
  
                  <div className="p-2 self-center"><h5 className="pr-5">Select number of panels:</h5>
        </div>
  
                  <div className="p-2 self-center"><NumberPanels numberPanels={numberPanels} setNumberPanels={setNumberPanels}/>
                  </div>
  
                  <div className="p-2 self-center"><h5>Select a battery model: </h5>
                  </div>
  
                  <div className="p-2 self-center"><BatterySelect battery={battery} selectedBattery={selectedBattery} setSelectedBattery={setSelectedBattery} />
                  </div>

                  <div className="p-2 self-center"><h5>Eligible NSW Battery Rebate?: </h5>
                  </div>

                  <div className="p-2 self-center">
                    <BatteryRebate 
                      batteryRebate={batteryRebate} 
                      setBatteryRebate={setBatteryRebate}
                      selectedBattery={selectedBattery}
                    />
                  </div>

  
                  <div className="p-2 self-center"><h5>How much deposit is being paid?</h5>
                  </div>
  
                  <div className="p-2 self-center"><Deposit deposit={deposit} setDeposit={setDeposit} />
                  </div>
                  {deposit !== null && (
                    <>
                      <div className="p-2 self-center"><h5>Select a payment method</h5>
                      </div>
  
                      <div className="p-2 self-center">
                        <PaymentMethod 
                          paymentMethod={paymentMethod} 
                          selectedPaymentMethod={selectedPaymentMethod} 
                          setSelectedPaymentMethod={setSelectedPaymentMethod}
                          plentiTerm={plentiTerm}
                          setPlentiTerm={setPlentiTerm}
                        />
                      </div>
                    </>
                  )}
                 
  
                  </div>

      </Tab>
      <Tab eventKey="Extras" title="Extras" className="mb-3 border-gray-200	 border-x-2 border-b-2 rounded-b-l">
        <ExtraInputs quantities={quantities} handleChange={handleChange} totalSum={totalSum} extras={extras}/>
      </Tab>
    </Tabs>
  );
}

export { SwitchTabs } ;