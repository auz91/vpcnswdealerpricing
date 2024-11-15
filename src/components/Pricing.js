import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { plentiTerms } from './Data';

function Deposit({ deposit, setDeposit }) {
  const handleChange = (e) => {
    // Ensure numeric value and prevent negative numbers
    const value = Math.max(0, Number(e.target.value));
    setDeposit(value);
  };

  return (
    <input
      min="0"
      type="number"
      className='border-2 rounded-lg flex w-100 h-10 text-center overflow-hidden'
      value={deposit === null ? '' : deposit} // Handle initial null case better
      onChange={handleChange}
      placeholder="Enter deposit amount"
      style={{ 
        minWidth: '100px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }}
    />
  );
}

function PaymentMethod({ 
  paymentMethod, 
  selectedPaymentMethod, 
  setSelectedPaymentMethod,
  plentiTerm,
  setPlentiTerm 
}) {
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" className="custom-dropdown-toggle-2">
          {selectedPaymentMethod ? selectedPaymentMethod.method : 'Select Payment Method'} 
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {paymentMethod.map((method) => (
            <Dropdown.Item
              key={method.id}
              onClick={() => setSelectedPaymentMethod(method)}
            >
              {method.method}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {selectedPaymentMethod?.isPlenti && (
        <div className="mt-2">
          <Dropdown>
            <Dropdown.Toggle id="plenti-term-dropdown" className="custom-dropdown-toggle-2">
              {plentiTerm ? `${plentiTerm.months} months` : 'Select Term'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {plentiTerms.map((term) => (
                <Dropdown.Item
                  key={term.months}
                  onClick={() => setPlentiTerm(term)}
                >
                  {term.months} months
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </>
  );
}

function BatteryRebate({ batteryRebate, setBatteryRebate, selectedBattery }) {
  if (typeof setBatteryRebate !== 'function') {
    console.error('setBatteryRebate is not a function');
    return null;
  }

  const isEligible = Boolean(batteryRebate);
  
  const handleRebateChange = (eligible) => {
    if (eligible && selectedBattery) {
      // Calculate rebate: Battery Size x 80 x 1.7
      const rebateAmount = selectedBattery.size * 80 * 1.7;
      setBatteryRebate(rebateAmount);
    } else {
      setBatteryRebate(0);
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" className="custom-dropdown-toggle-2">
        {isEligible ? 'Yes' : 'No'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleRebateChange(true)}>
          Yes
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleRebateChange(false)}>
          No
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export { Deposit, PaymentMethod, BatteryRebate};

