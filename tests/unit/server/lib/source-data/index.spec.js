import lib from '@/../server/lib/source-data/';
import constants from '@/../constants';

describe('source-data library', () => {
  describe('getCombinedPurchases()', () => {
    test('returns the expected result()', () => {
      const farmData = {
        FARM_NAME: 'Foo Farm',
        ACRES: 'acres_1',
        COW_COUNT: 'cowCount_1',
        TRACTOR_COUNT: 'tractorCount_1',
        TRACTOR_USAGE: 'tractorUse_1',
        MILK_MACHINE_COUNT: 'milkMachineCount_1',
        MILK_MACHINE_USAGE: 'milkMachineUse_1',
        MILK_PRODUCED: 'milkProduced_1',
      };

      const purchasesData = [
        {
          FARM_NAME: 'Foo Farm',
          PURCHASE_TYPE: 'DIESEL',
          PURCHASE_AMOUNT: 2,
          PURCHASE_UNIT: 'l',
        },
        {
          FARM_NAME: 'Foo Farm',
          PURCHASE_TYPE: 'DIESEL',
          PURCHASE_AMOUNT: 3,
          PURCHASE_UNIT: 'gallon',
        },
        {
          FARM_NAME: 'Foo Farm',
          PURCHASE_TYPE: 'DIESEL',
          PURCHASE_AMOUNT: 6,
          PURCHASE_UNIT: 'l',
        },
        {
          FARM_NAME: 'Foo Farm',
          PURCHASE_TYPE: 'GRASS',
          PURCHASE_AMOUNT: 7,
          PURCHASE_UNIT: 'kg',
        },
        {
          FARM_NAME: 'Foo Farm',
          PURCHASE_TYPE: 'GRASS',
          PURCHASE_AMOUNT: 8,
          PURCHASE_UNIT: 'ton',
        },
        {
          FARM_NAME: 'Bar Farm',
          PURCHASE_TYPE: 'GRASS',
          PURCHASE_AMOUNT: 9,
          PURCHASE_UNIT: 'kg',
        },
      ];

      expect(lib.getCombinedPurchases(farmData, purchasesData)).toEqual([
        {
          PURCHASE_AMOUNT: 21.638270000000002,
          PURCHASE_TYPE: 'DIESEL',
        },
        {
          PURCHASE_AMOUNT: 8135.4,
          PURCHASE_TYPE: 'GRASS',
        },
      ]);
    });
  });

  describe('getCombinedFarmInventory()', () => {
    test('returns the expected result()', () => {
      const farmData = {
        FARM_NAME: 'Foo Farm',
        ACRES: 'acres_1',
        COW_COUNT: 'cowCount_1',
        TRACTOR_COUNT: 'tractorCount_1',
        TRACTOR_USAGE: 'tractorUse_1',
        MILK_MACHINE_COUNT: 'milkMachineCount_1',
        MILK_MACHINE_USAGE: 'milkMachineUse_1',
        MILK_PRODUCED: 'milkProduced_1',
      };

      const purchasesData = [
        {
          FARM_NAME: 'Foo Farm',
          PURCHASE_TYPE: 'DIESEL',
          PURCHASE_AMOUNT: 2,
          PURCHASE_UNIT: 'l',
        },
        {
          FARM_NAME: 'Foo Farm',
          PURCHASE_TYPE: 'DIESEL',
          PURCHASE_AMOUNT: 3,
          PURCHASE_UNIT: 'gallon',
        },
        {
          FARM_NAME: 'Foo Farm',
          PURCHASE_TYPE: 'DIESEL',
          PURCHASE_AMOUNT: 6,
          PURCHASE_UNIT: 'l',
        },
        {
          FARM_NAME: 'Foo Farm',
          PURCHASE_TYPE: 'GRASS',
          PURCHASE_AMOUNT: 7,
          PURCHASE_UNIT: 'kg',
        },
        {
          FARM_NAME: 'Foo Farm',
          PURCHASE_TYPE: 'GRASS',
          PURCHASE_AMOUNT: 8,
          PURCHASE_UNIT: 'ton',
        },
        {
          FARM_NAME: 'Bar Farm',
          PURCHASE_TYPE: 'GRASS',
          PURCHASE_AMOUNT: 9,
          PURCHASE_UNIT: 'kg',
        },
      ];

      expect(lib.getCombinedFarmInventory(farmData, purchasesData)).toEqual({
        FARM_NAME: 'Foo Farm',
        ACRES: 'acres_1',
        MILK_PRODUCED: 'milkProduced_1',
        TRACTOR_USAGE: 'tractorUse_1',
        MILK_MACHINE_USAGE: 'milkMachineUse_1',

        inventory: {
          COW_COUNT: 'cowCount_1',
          TRACTOR_COUNT: 'tractorCount_1',
          MILK_MACHINE_COUNT: 'milkMachineCount_1',

          combinedPurchases: [
            {
              PURCHASE_TYPE: 'DIESEL',
              PURCHASE_AMOUNT: 21.638270000000002,
            },
            {
              PURCHASE_TYPE: 'GRASS',
              PURCHASE_AMOUNT: 8135.4,
            },
          ],
        },
      });
    });
  });

  describe('getUnitConversionFactor()', () => {
    test('returns the expected result (same from and to units)', () => {
      expect(lib.getUnitConversionFactor('DIESEL', constants.SOURCE_DATA_SCHEMA.UNITS.LITRE)).toEqual(1);
      expect(lib.getUnitConversionFactor('ELECTRICITY', constants.SOURCE_DATA_SCHEMA.UNITS.KWH)).toEqual(1);
      expect(lib.getUnitConversionFactor('SOY', constants.SOURCE_DATA_SCHEMA.UNITS.KG)).toEqual(1);
      expect(lib.getUnitConversionFactor('GRASS', constants.SOURCE_DATA_SCHEMA.UNITS.KG)).toEqual(1);
    });

    test('returns the expected result (from gallons to litres)', () => {
      expect(lib.getUnitConversionFactor('DIESEL', constants.SOURCE_DATA_SCHEMA.UNITS.GALLON)).toEqual(4.54609);
    });

    test('returns the expected result (from tons to kg)', () => {
      expect(lib.getUnitConversionFactor('GRASS', constants.SOURCE_DATA_SCHEMA.UNITS.TON)).toEqual(1016.05);
    });
  });
});
