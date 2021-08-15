const keyMirror = require('key-mirror');

module.exports = {
  API: {
    ENDPOINT: 'http://localhost:3000',
  },
  SOURCE_DATA: {
    FARMS_DATA_FILE: 'source-data/farms-data.csv',
    PURCHASES_DATA_FILE: 'source-data/purchases-data.csv',
  },
  SOURCE_DATA_SCHEMA: {
    FARM_DATA: keyMirror({
      FARM_NAME: null,
      ACRES: null,
      COW_COUNT: null,
      TRACTOR_COUNT: null,
      TRACTOR_USAGE: null,
      MILK_MACHINE_COUNT: null,
      MILK_MACHINE_USAGE: null,
      MILK_PRODUCED: null,
    }),
    PURCHASES_DATA: keyMirror({
      FARM_NAME: null,
      PURCHASE_TYPE: null,
      PURCHASE_AMOUNT: null,
      PURCHASE_UNIT: null,
    }),
    RESOURCES: {
      DIESEL: {
        key: 'DIESEL',
        defaultUnit: 'l',
        label: 'Diesel',
      },
      ELECTRICITY: {
        key: 'ELECTRICITY',
        defaultUnit: 'kwH',
        label: 'Electricity',
      },
      SOY: {
        key: 'SOY',
        defaultUnit: 'kg',
        label: 'Soy for cows',
      },
      GRASS: {
        key: 'GRASS',
        defaultUnit: 'kg',
        label: 'Gras for cows',
      },
    },
    UNITS: {
      LITRE: 'l',
      KWH: 'kwH',
      KG: 'kg',
      GALLON: 'gallon',
      TON: 'ton',
    },
  },
  EMISSIONS_SCHEMA: {
    SCOPES: keyMirror({
      FOSSIL: null,
      ELECTRICITY: null,
      FOOD: null,
    }),
    EMISSION_FACTORS: {
      ELECTRICITY: 0.23314, // per kWh
      DIESEL: 2.68787, // per liter
      FOOD: 1.3289, // per kg
    },
  },
};
