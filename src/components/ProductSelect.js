import Dropdown from 'react-bootstrap/Dropdown';

function PanelSelect({ panels, selectedPanel, setSelectedPanel }) {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic"  className="custom-dropdown-toggle">
        {selectedPanel ? selectedPanel.panelbrand : 'Select Panel'} 
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {panels.map((panel) => (
          <Dropdown.Item
            key={panel.id}
            onClick={() => setSelectedPanel(panel)}  // Update state in App.js on click
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
      <Dropdown.Toggle id="dropdown-basic"  className="custom-dropdown-toggle">
        {selectedInverter ? selectedInverter.model : 'Select Inverter'} 
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {inverters.map((inverter) => (
          <Dropdown.Item
            key={inverter.id}
            onClick={() => setSelectedInverter(inverter)}  // Update state in App.js on click
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
      <Dropdown.Toggle id="dropdown-basic"  className="custom-dropdown-toggle">
        {additionalSelectedInverter ? additionalSelectedInverter.model : 'Select Inverter'} 
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {inverters.map((inverter) => (
          <Dropdown.Item
            key={inverter.id}
            onClick={() => setAdditionalSelectedInverter(inverter)}  // Update state in App.js on click
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
      <Dropdown.Toggle id="dropdown-basic"  className="custom-dropdown-toggle">
        {selectedBattery ? selectedBattery.brand : 'Select Battery'} 
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {battery.map((battery) => (
          <Dropdown.Item
            key={battery.id}
            onClick={() => setSelectedBattery(battery)}  // Update state in App.js on click
          >
            {battery.brand}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export { InverterSelect, AdditionalInverterSelect, PanelSelect, BatterySelect };

