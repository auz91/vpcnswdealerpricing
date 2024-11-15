import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { plentiTerms } from './Data';

function Deposit({ deposit, setDeposit }) {
  const handleDepositChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setDeposit(value === '' ? '' : Number(value));
    }
  };

  return (
    <input
      type="text"
      className="w-full px-4 py-2 text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-[#f4b942] focus:ring-1 focus:ring-[#f4b942]"
      value={deposit === null ? '' : deposit}
      onChange={handleDepositChange}
      placeholder="Enter deposit amount"
    />
  );
}

function PaymentMethod({ paymentMethod, selectedPaymentMethod, setSelectedPaymentMethod, plentiTerm, setPlentiTerm }) {
  return (
    <div className="space-y-2">
      <Dropdown>
        <Dropdown.Toggle className="w-full px-4 py-2 text-left text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none">
          {selectedPaymentMethod ? selectedPaymentMethod.method : 'Select Payment Method'} 
        </Dropdown.Toggle>

        <Dropdown.Menu className="w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {paymentMethod.map((method) => (
            <Dropdown.Item
              key={method.id}
              onClick={() => setSelectedPaymentMethod(method)}
              className="px-4 py-2 text-gray-900 hover:bg-gray-50"
            >
              {method.method}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {selectedPaymentMethod?.isPlenti && (
        <Dropdown>
          <Dropdown.Toggle className="w-full px-4 py-2 text-left text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none">
            {plentiTerm ? `${plentiTerm.months} months` : 'Select Term'}
          </Dropdown.Toggle>

          <Dropdown.Menu className="w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
            {plentiTerms.map((term) => (
              <Dropdown.Item
                key={term.months}
                onClick={() => setPlentiTerm(term)}
                className="px-4 py-2 text-gray-900 hover:bg-gray-50"
              >
                {term.months} months
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
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

