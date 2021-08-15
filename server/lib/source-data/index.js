const constants = require('../../../constants');
const { readFile, parseCsv } = require('../file-io');
const schemaKeys = constants.SOURCE_DATA_SCHEMA;

async function getParsedSourceData(dataFile) {
  const fileCsv = await readFile(dataFile);
  return parseCsv(fileCsv);
}

function getUnitConversionFactor(purchaseType, fromUnit) {
  const toUnit = constants.SOURCE_DATA_SCHEMA.RESOURCES[purchaseType].defaultUnit;
  let factor = 1;

  if (fromUnit === toUnit) return factor;

  switch (fromUnit) {
    case constants.SOURCE_DATA_SCHEMA.UNITS.GALLON:
      factor = 4.54609; // imperial gallon
      break;
    case constants.SOURCE_DATA_SCHEMA.UNITS.TON:
      factor = 1016.05; // imperial ton
      break;
    default:
  }

  return factor;
}

function getCombinedPurchases(farmData, purchasesData) {
  return purchasesData.filter((purchase) => purchase[constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.FARM_NAME]
    === farmData[constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.FARM_NAME])
    .reduce((acc, cur) => {
      const accItem = acc.find((a) => a[schemaKeys.PURCHASES_DATA.PURCHASE_TYPE] === cur[schemaKeys.PURCHASES_DATA.PURCHASE_TYPE]);

      if (accItem) {
        const conversionFactor = getUnitConversionFactor(cur[schemaKeys.PURCHASES_DATA.PURCHASE_TYPE], cur[schemaKeys.PURCHASES_DATA.PURCHASE_UNIT]);
        const convertedAmount = cur[schemaKeys.PURCHASES_DATA.PURCHASE_AMOUNT] * conversionFactor;

        accItem[schemaKeys.PURCHASES_DATA.PURCHASE_AMOUNT] += convertedAmount;
      } else {
        acc.push({
          [schemaKeys.PURCHASES_DATA.PURCHASE_TYPE]: cur[schemaKeys.PURCHASES_DATA.PURCHASE_TYPE],
          [schemaKeys.PURCHASES_DATA.PURCHASE_AMOUNT]: cur[schemaKeys.PURCHASES_DATA.PURCHASE_AMOUNT],
        });
      }

      return acc;
    }, []);
}

function getCombinedFarmInventory(farmData, purchasesData) {
  const combinedPurchases = getCombinedPurchases(farmData, purchasesData);

  return {
    [schemaKeys.FARM_DATA.FARM_NAME]: farmData[schemaKeys.FARM_DATA.FARM_NAME],
    [schemaKeys.FARM_DATA.ACRES]: farmData[schemaKeys.FARM_DATA.ACRES],
    [schemaKeys.FARM_DATA.MILK_PRODUCED]: farmData[schemaKeys.FARM_DATA.MILK_PRODUCED],
    [schemaKeys.FARM_DATA.TRACTOR_USAGE]: farmData[schemaKeys.FARM_DATA.TRACTOR_USAGE],
    [schemaKeys.FARM_DATA.MILK_MACHINE_USAGE]: farmData[schemaKeys.FARM_DATA.MILK_MACHINE_USAGE],

    inventory: {
      combinedPurchases,
      [schemaKeys.FARM_DATA.COW_COUNT]: farmData[schemaKeys.FARM_DATA.COW_COUNT],
      [schemaKeys.FARM_DATA.TRACTOR_COUNT]: farmData[schemaKeys.FARM_DATA.TRACTOR_COUNT],
      [schemaKeys.FARM_DATA.MILK_MACHINE_COUNT]: farmData[schemaKeys.FARM_DATA.MILK_MACHINE_COUNT],
    },
  };
}

module.exports = {
  getParsedSourceData,
  getCombinedFarmInventory,
  getCombinedPurchases,
  getUnitConversionFactor,
};
