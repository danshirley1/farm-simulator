const constants = require('../../constants');
const { getParsedSourceData, getCombinedFarmInventory } = require('./source-data');
const FarmSourceData = require('./source-data/FarmSourceData');
const PurchasesSourceData = require('./source-data/PurchasesSourceData');
const Farm = require('./source-data/Farm');
const { doCalculateFarmEmissions } = require('./emissions');

async function doCalculateResponse() {
  // Parse flat data structure from csv sources
  const parsedFarmData = await getParsedSourceData(`${__dirname}/../../${constants.SOURCE_DATA.FARMS_DATA_FILE}`);
  const parsedPurchasesData = await getParsedSourceData(`${__dirname}/../../${constants.SOURCE_DATA.PURCHASES_DATA_FILE}`);

  // Create some business objects to maintain source data in a serialised fashion
  const farmSourceData = new FarmSourceData(parsedFarmData);
  const purchasesSourceData = new PurchasesSourceData(parsedPurchasesData);
  const farmData = farmSourceData.getDataStruct();
  const purchasesData = purchasesSourceData.getDataStruct();

  // Create some business objects to provide collated view per farm of expenditure and ultimately therefore emissions
  const farms = farmData.reduce((acc, cur) => {
    const farm = new Farm(getCombinedFarmInventory(cur, purchasesData));

    farm.emissions = doCalculateFarmEmissions(farm);

    acc.push(farm);
    return acc;
  }, []);

  return farms;
}

module.exports = {
  doCalculateResponse,
};
