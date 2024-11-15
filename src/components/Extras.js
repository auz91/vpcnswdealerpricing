const extras = {
    batterycover: [{ id: 20, cost: 700, name: "Sungrow Battery Cover", description: "Powder coated battery cover for exposed locations", unit: "Each" }],
    sysrewire: [{ id: 44, cost: 300, name: "Rewire Existing Inverter", description: "Rewire existing inverters DC feed into new inverter.", unit: "Each" }],
    tilts: [{ id: 0, cost: 40, name: "Tilt Kit", description: "Tilt kit for flat roof faces", unit: "Panel" }],
    kliplok: [{ id: 1, cost: 25, name: "KlipLok", description: "Kliplok bracket for this roof type", unit: "Panel" }],
    tigo: [{ id: 15, cost: 90, name: "Tigo Optimiser", description: "Tigo optimiser for shade/stringing deployment", unit: "Panel" }],
    addarray: [{ id: 2, cost: 300, name: "Additional Array", description: "Split in an array after first 3 faces", unit: "Each" }],
    threestorey: [{ id: 3, cost: 1000, name: "3 Storey Roof", description: "Rooves that are 3 storeys high", unit: "Each" }],
    sysremoval: [{ id: 4, cost: 25, name: "System Removal per Panel", description: "System removal per panel", unit: "Panel" }],
    pitchone: [{ id: 5, cost: 50, name: "Roof Pitch Between 35-40 Degrees", description: "Roof pitch is over 35 degrees but less than 40. Tile over 35 degrees does not qualify.", unit: "Panel" }],
    pitchtwo: [{ id: 6, cost: 100, name: "Roof Pitch Between 40-45 Degrees", description: "Roof pitch is over 40 degrees but less than 45. Over 45 does not qualify. Tile over 35 degrees does not qualify.", unit: "Panel" }],
    fullsbupg: [{ id: 7, cost: 1500, name: "Full Switchboard Upgrade", description: "Upgrade entire switchboard including backing sheet with new enclosure, RCDs and RCBOs. Completed by a L2", unit: "Each" }],
    twelvepoleupg: [{ id: 8, cost: 800, name: "12 Pole Board Upgrade", description: "Replace old ceramic breakers with RCDs/RCBOs and new enclosure", unit: "Each" }],
    twelvepoleweatherproof: [{ id: 9, cost: 300, name: "12 Pole Weatherproof Enclosure", description: "Used when there is insufficient space in a switchboard.", unit: "Each" }],
    longacsingle: [{ id: 10, cost: 10, name: "Long AC Run Single Phase", description: "When an inverter/battery is >20m from MSB. Measured as entire run.", unit: "Metre" }],
    longacthree: [{ id: 11, cost: 20, name: "Long AC Run Three Phase", description: "When an inverter/battery is >20m from MSB. Measured as entire run.", unit: "Metre" }],
    trenchfifty: [{ id: 12, cost: 900, name: "Trenching (First 50m)", description: "Cost of trenching for the first 50m", unit: "Each" }],
    trenchafterfifty: [{ id: 13, cost: 20, name: "Trenching (After 50m)", description: "Additional cost for every meter after 50m", unit: "Metre" }],
    sungrowdongle: [{ id: 14, cost: 400, name: "Sungrow 4G Dongle", description: "Sungrow 4G Dongle which replaces the wifi module.", unit: "Each" }],
    catchgreen: [{ id: 16, cost: 1200, name: "Catch Green Relay", description: "Catch Green Relay which allows diversion of excess solar into hot water.", unit: "Each" }],
    hwt: [{ id: 17, cost: 350, name: "Hot Water Timer", description: "Hot water timer makes the hot water runs during a specific window i.e during solar times", unit: "Each" }],
    outofregion: [{ id: 18, cost: 600, name: "Out of Region", description: "Out of region install. >150km from nearest warehouse.", unit: "Each" }],
    groundmount: [{ id: 19, cost: 750, name: "Ground Mount", description: "Ground mount cost per kW (min 6kW)", unit: "kW" }],
  };
  
  export { extras };
  