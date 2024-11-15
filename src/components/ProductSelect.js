import Dropdown from 'react-bootstrap/Dropdown';

function PanelSelect({ panels, selectedPanel, setSelectedPanel }) {
  return (
    <Dropdown>
      <Dropdown.Toggle className="w-full px-4 py-2 text-left text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none">
        {selectedPanel ? selectedPanel.panelbrand : 'Select Panel'} 
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
        {panels.map((panel) => (
          <Dropdown.Item
            key={panel.id}
            onClick={() => setSelectedPanel(panel)}
            className="px-4 py-2 text-gray-900 hover:bg-gray-50"
          >
            {panel.panelbrand}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

function InverterSelect({ inverters, selectedInverter, setSelectedInverter }) {
  return (
    <Dropdown>
      <Dropdown.Toggle className="w-full px-4 py-2 text-left text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none">
        {selectedInverter ? selectedInverter.model : 'Select Inverter'} 
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
        {inverters.map((inverter) => (
          <Dropdown.Item
            key={inverter.id}
            onClick={() => setSelectedInverter(inverter)}
            className="px-4 py-2 text-gray-900 hover:bg-gray-50"
          >
            {inverter.model}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

function AdditionalInverterSelect({ inverters, additionalSelectedInverter, setAdditionalSelectedInverter }) {
  return (
    <Dropdown>
      <Dropdown.Toggle className="w-full px-4 py-2 text-left text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none">
        {additionalSelectedInverter ? additionalSelectedInverter.model : 'Select Inverter'} 
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
        {inverters.map((inverter) => (
          <Dropdown.Item
            key={inverter.id}
            onClick={() => setAdditionalSelectedInverter(inverter)}
            className="px-4 py-2 text-gray-900 hover:bg-gray-50"
          >
            {inverter.model}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

function BatterySelect({ battery, selectedBattery, setSelectedBattery }) {
  return (
    <Dropdown>
      <Dropdown.Toggle className="w-full px-4 py-2 text-left text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none">
        {selectedBattery ? selectedBattery.brand : 'Select Battery'} 
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
        {battery.map((battery) => (
          <Dropdown.Item
            key={battery.id}
            onClick={() => setSelectedBattery(battery)}
            className="px-4 py-2 text-gray-900 hover:bg-gray-50"
          >
            {battery.brand}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export { InverterSelect, AdditionalInverterSelect, PanelSelect, BatterySelect };

