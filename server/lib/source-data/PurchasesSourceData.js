const SourceData = require('./SourceData');
const constants = require('../../../constants');

// Serialised representation of source data in file 'source-data/purchases-data.csv'
class PurchasesSourceData extends SourceData {
  getDataStruct() {
    return this.data.reduce((acc, cur) => {
      const resourceKey = Object.values(constants.SOURCE_DATA_SCHEMA.RESOURCES).find((r) => r.label === cur[1]);

      acc.push({
        [constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.FARM_NAME]: cur[0],
        [constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.PURCHASE_TYPE]: resourceKey.key,
        [constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.PURCHASE_AMOUNT]: parseInt(cur[2], 10) || 0,
        [constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.PURCHASE_UNIT]: cur[3],
      });

      return acc;
    }, []);
  }
}

module.exports = PurchasesSourceData;
