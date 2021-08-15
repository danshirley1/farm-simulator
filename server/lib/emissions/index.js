const constants = require('../../../constants');

function doCalculateScopeFossil(purchases) {
  const dieselPurchase = purchases.find((p) => p[constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.PURCHASE_TYPE]
      === constants.SOURCE_DATA_SCHEMA.RESOURCES.DIESEL.key);

  if (dieselPurchase) {
    return dieselPurchase[constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.PURCHASE_AMOUNT]
      * constants.EMISSIONS_SCHEMA.EMISSION_FACTORS.DIESEL;
  }

  return 0;
}

function doCalculateScopeElectricity(purchases) {
  const electricityPurchase = purchases.find((p) => p[constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.PURCHASE_TYPE]
      === constants.SOURCE_DATA_SCHEMA.RESOURCES.ELECTRICITY.key);

  if (electricityPurchase) {
    return electricityPurchase[constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.PURCHASE_AMOUNT]
      * constants.EMISSIONS_SCHEMA.EMISSION_FACTORS.ELECTRICITY;
  }

  return 0;
}

function doCalculateScopeFood(purchases) {
  const foodPurchase = purchases.find((p) => p[constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.PURCHASE_TYPE]
      === constants.SOURCE_DATA_SCHEMA.RESOURCES.SOY.key
    || p[constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.PURCHASE_TYPE]
      === constants.SOURCE_DATA_SCHEMA.RESOURCES.GRASS.key);

  if (foodPurchase) {
    return foodPurchase[constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.PURCHASE_AMOUNT]
      * constants.EMISSIONS_SCHEMA.EMISSION_FACTORS.FOOD;
  }

  return 0;
}

function doCalculateFarmEmissions(farm) {
  return {
    [constants.EMISSIONS_SCHEMA.SCOPES.FOSSIL]: doCalculateScopeFossil(farm.inventory.combinedPurchases),
    [constants.EMISSIONS_SCHEMA.SCOPES.ELECTRICITY]: doCalculateScopeElectricity(farm.inventory.combinedPurchases),
    [constants.EMISSIONS_SCHEMA.SCOPES.FOOD]: doCalculateScopeFood(farm.inventory.combinedPurchases),
  };
}

module.exports = {
  doCalculateFarmEmissions,
};
