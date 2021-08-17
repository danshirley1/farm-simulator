const constants = require('../../constants');
const { getParsedSourceData, getCombinedFarmInventory } = require('./source-data');
const FarmSourceData = require('./source-data/FarmSourceData');
const PurchasesSourceData = require('./source-data/PurchasesSourceData');
const Farm = require('./source-data/Farm');
const { doCalculateFarmEmissions } = require('./emissions');

class InvalidUserSubmissionError {
  constructor() {
    this.name = 'InvalidUserSubmissionError';
    this.message = 'Invalid user submission';
  }
}

async function getReferenceData() {
  // Parse flat data structure from csv sources
  const parsedFarmData = await getParsedSourceData(`${__dirname}/../../${constants.SOURCE_DATA.FARMS_DATA_FILE}`);
  const parsedPurchasesData = await getParsedSourceData(`${__dirname}/../../${constants.SOURCE_DATA.PURCHASES_DATA_FILE}`);

  // Create some business objects to maintain source data in a serialised fashion
  const farmSourceData = new FarmSourceData(parsedFarmData);
  const purchasesSourceData = new PurchasesSourceData(parsedPurchasesData);

  const farmData = farmSourceData.getDataStruct();
  const purchasesData = purchasesSourceData.getDataStruct();

  return {
    farmData,
    purchasesData,
  };
}

function doValidateUserSubmission() {
  const isValid = true; // TODO actually implement the logic

  if (!isValid) throw new InvalidUserSubmissionError();
}

function getUserSubmittedFarmInventory(userSubmission) {
  const farmProps = {
    [constants.SOURCE_DATA_SCHEMA.FARM_DATA.FARM_NAME]: constants.SOURCE_DATA_SCHEMA.USER_FARM_DEFAULT_NAME,
    [constants.SOURCE_DATA_SCHEMA.FARM_DATA.TRACTOR_USAGE]: 0, // TODO discuss what we do with this
    [constants.SOURCE_DATA_SCHEMA.FARM_DATA.MILK_MACHINE_USAGE]: 0, // TODO discuss what we do with this
    ...userSubmission,
  };

  // Hard coding this for now, will take from form entry shortly
  const purchasesProps = [
    {
      FARM_NAME: constants.SOURCE_DATA_SCHEMA.USER_FARM_DEFAULT_NAME,
      PURCHASE_TYPE: 'GRASS',
      PURCHASE_AMOUNT: 7686,
      PURCHASE_UNIT: 'kg',
    },
    {
      FARM_NAME: constants.SOURCE_DATA_SCHEMA.USER_FARM_DEFAULT_NAME,
      PURCHASE_TYPE: 'DIESEL',
      PURCHASE_AMOUNT: 16097,
      PURCHASE_UNIT: 'l',
    },
    {
      FARM_NAME: constants.SOURCE_DATA_SCHEMA.USER_FARM_DEFAULT_NAME,
      PURCHASE_TYPE: 'ELECTRICITY',
      PURCHASE_AMOUNT: 6761,
      PURCHASE_UNIT: 'kwH',
    },
    {
      FARM_NAME: constants.SOURCE_DATA_SCHEMA.USER_FARM_DEFAULT_NAME,
      PURCHASE_TYPE: 'SOY',
      PURCHASE_AMOUNT: 13271,
      PURCHASE_UNIT: 'kg',
    },
    {
      FARM_NAME: constants.SOURCE_DATA_SCHEMA.USER_FARM_DEFAULT_NAME,
      PURCHASE_TYPE: 'GRASS',
      PURCHASE_AMOUNT: 8598,
      PURCHASE_UNIT: 'kg',
    },
  ];

  return getCombinedFarmInventory(farmProps, purchasesProps);
}

async function doCalculateResponse(userFarmSubmission) {
  doValidateUserSubmission(userFarmSubmission);

  const { farmData: referenceFarmData, purchasesData: referencePurchasesData } = await getReferenceData();

  // Create some business objects to provide collated view per reference farm of expenditure and ultimately therefore emissions
  const referenceFarms = referenceFarmData.reduce((acc, cur) => {
    const referenceFarm = new Farm(getCombinedFarmInventory(cur, referencePurchasesData));

    referenceFarm.emissions = doCalculateFarmEmissions(referenceFarm);

    acc.push(referenceFarm);
    return acc;
  }, []);

  // And the same for the user submitted farm
  const userFarm = new Farm(getUserSubmittedFarmInventory(userFarmSubmission));
  userFarm.emissions = doCalculateFarmEmissions(userFarm);

  return [userFarm, ...referenceFarms];
}

module.exports = {
  doCalculateResponse,
};
