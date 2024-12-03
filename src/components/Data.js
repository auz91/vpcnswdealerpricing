import React, { useEffect, useState } from 'react';

function Fetchpanels () {
  const [panels, setPanels] = useState([]);

  useEffect(() => {
    const fetchPanels = async () => {
      const response = await fetch('https://sheet.zoho.com/api/v2/meiao38b9a8cc8b2243e391668e1c8f8d5562?sheetid=24&range=A1/records', {
        method: 'GET',
        headers: {
          'Authorization': ''
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPanels(data); // Assuming the data is an array of panel objects
      }
    };

    fetchPanels();
  }, []);
}

const paymentMethod = [
    {
        id: 0,
        method: 'Cash',
        multiplier: 1,
    },
    {
      id: 1,
      method: 'HEUF - Plenti Green Loan',
      multiplier: 1,
      isPlenti: true,
    },
    {
      id: 2,
      method: 'Humm 24 Months',
      multiplier: 1.135,
      months: 24,
  },
    {
      id: 3,
      method: 'Humm 36 Months',
      multiplier: 1.165,
      months: 36,
  },
    {
      id: 4,
      method: 'Humm 60 Months',
      multiplier: 1.265,
      months: 60,
  },
  ]

const inverters = [
    {
        id: 0,
        model: 'None',
        power: '0W',
        price: 0,
    },
    {
        id: 1,
        model: 'Sungrow SG5.0-RS - Single Phase',
        power: '5000W',
        price: 1089,
    },
    {
      id: 1.1,
      model: 'Sungrow SG5.0-RS-ADA - Single Phase',
      power: '5000W',
      price: 1485,
  },
    {
        id: 2,
        model: 'Sungrow SG8.0-RS - Single Phase',
        power: '8000W',
        price: 1925,
    },
    {
        id: 3,
        model: 'Sungrow SG10.0-RS - Single Phase',
        power: '1000W',
        price: 2035,
    },
    {
      id: 4,
      model: 'Sungrow SH6.0RS Hybrid - Single Phase',
      power: '6000W',
      price: 2420,
  },
  {
    id: 5,
    model: 'Sungrow SH8.0RS Hybrid - Single Phase',
    power: '8000W',
    price: 2970,
},
{
  id: 6,
  model: 'Sungrow SH10.0RS Hybrid - Single Phase',
  power: '10000W',
  price: 3300,
},
{
  id: 7,
  model: 'Sungrow SH10.0RT Hybrid - Three Phase',
  power: '10000W',
  price: 3740,
},
{
  id: 8,
  model: 'Sungrow SH15.0T Hybrid - Three Phase',
  power: '15000W',
  price: 4950,
},
{
  id: 9,
  model: 'Sungrow SH20.0T Hybrid - Three Phase',
  power: '20000W',
  price: 6050,
},
{
  id: 10,
  model: 'Sungrow SH25.0T Hybrid - Three Phase',
  power: '25000W',
  price: 7150,
},
{
  id: 11,
  model: 'Sungrow SG5.0RT - Three Phase',
  power: '5000W',
  price: 1980,
},
{
  id: 12,
  model: 'Sungrow SG8.0RT - Three Phase',
  power: '8000W',
  price: 2090,
},
{
  id: 13,
  model: 'Sungrow SG10.0RT - Three Phase',
  power: '10000W',
  price: 2365,
},
{
  id: 14,
  model: 'Sungrow SG15.0RT - Three Phase',
  power: '15000W',
  price: 2750,
},
{
  id: 15,
  model: 'Sungrow SG20.0RT - Three Phase',
  power: '20000W',
  price: 3025,
},
];
  
const panels = [
    {
      id: 0,
      panelbrand: 'None',
      cost: 0,
      watts: 0,
    },
    {
      id: 2,
      panelbrand: 'LONGI 440W - LR5-54HTH-440M',
      cost: 646,
      watts: 440,
    },
      {
        id: 1,
        panelbrand: 'AIKO 470W - AIKO-A470-MAH54Mw',
        cost: 724,
        watts: 470,
      },

]

const battery = [
  {
    id: 0,
    brand: 'None',
    cost: 0,
    size: 0,
  },
  {
    id: 11,
    brand: 'Sungrow 3.2kWh Module Upgrade',
    cost: 2990,
    size: 3.2,
  },
  {
    id: 1,
    brand: 'Sungrow 6.4kWh SBR',
    cost: 10100,
    size: 6.4,
  },
  {
    id: 2,
    brand: 'Sungrow 9.6kWh SBR',
    cost: 12100,
    size: 9.6,
  },
  {
    id: 3,
    brand: 'Sungrow 12.8kWh SBR',
    cost: 14730,
    size: 12.8,
    },
    {
      id: 4,
      brand: 'Sungrow 16.0kWh SBR',
      cost: 17383,
      size: 16.0,
      },
      {
        id: 5,
        brand: 'Sungrow 19.2kWh SBR',
        cost: 20000,
        size: 19.2,
        },
        {
          id: 6,
          brand: 'Sungrow 22.4kWh SBR',
          cost: 22687,
          size: 22.4,
          },
          {
            id: 7,
            brand: 'Sungrow 25.6kWh SBR',
            cost: 25339,
            size: 25.6,
            },
            {
              id: 8,
              brand: 'Tesla Powerwall 3',
              cost: 18881,
              size: 13.5,
              },

              {
                id: 9,
                brand: 'Sungrow 20kWh SBH200',
                cost: 21780,
                size: 20,
                },
                {
                  id: 10,
                  brand: 'Sungrow 25kWh SBH250',
                  cost: 26125,
                  size: 25,
                  },
                  {
                    id: 11,
                    brand: 'Sungrow 30kWh SBH300',
                    cost: 30470,
                    size: 30,
                    },
                    {
                      id: 12,
                      brand: 'Sungrow 35kWh SBH350',
                      cost: 34815,
                      size: 35,
                      },
                      {
                        id: 13,
                        brand: 'Sungrow 40kWh SBH400',
                        cost: 39160,
                        size: 40,
                        },

]

const plentiTerms = [
    { months: 36, interestRate: 6.65 },
    { months: 48, interestRate: 6.65 },
    { months: 60, interestRate: 6.65 },
    { months: 72, interestRate: 6.65 },
    { months: 84, interestRate: 6.65 },
    { months: 96, interestRate: 6.65 },
    { months: 108, interestRate: 6.65 },
    { months: 120, interestRate: 7.15 },
    { months: 132, interestRate: 7.65 },
    { months: 144, interestRate: 7.65 },
];

const pricingVersions = [
  {
    id: 1,
    name: "November 2024",
    stcYear: 7,
    isActive: false,
    isHidden: false
  },
  {
    id: 2,
    name: "December 2024",
    stcYear: 6,
    isActive: true,
    isHidden: false
  }
];

export { inverters, panels, battery, paymentMethod, plentiTerms, pricingVersions };
  