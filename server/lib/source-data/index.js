const constants = require('../../constants');
const { readFile, parseCsv } = require('../file-io');
const FarmSourceData = require('./FarmSourceData');
const PurchasesSourceData = require('./PurchasesSourceData');

async function getParsedSourceData(dataFile) {
  const fileCsv = await readFile(dataFile);
  return parseCsv(fileCsv);
}

async function getFarmEmissions() {
  const parsedFarmData = await getParsedSourceData(constants.SOURCE_DATA.FARMS_DATA_FILE);
  const parsedPurchasesData = await getParsedSourceData(constants.SOURCE_DATA.PURCHASES_DATA_FILE);

  const farmSourceData = new FarmSourceData(parsedFarmData);
  const purchasesSourceData = new PurchasesSourceData(parsedPurchasesData);

  const farmData = farmSourceData.getDataStruct();
  const purchasesData = purchasesSourceData.getDataStruct();

  return { farmData, purchasesData };
}

module.exports = {
  getFarmEmissions,
};
