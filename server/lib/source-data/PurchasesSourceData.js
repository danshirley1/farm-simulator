const SourceData = require('./SourceData');
const constants = require('../../../constants');

// Serialised representation of source data in file 'source-data/purchases-data.csv'
class PurchasesSourceData extends SourceData {
  getDataStruct() {
    return this.data.reduce((acc, cur) => {
      acc.push({
        [constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.FARM_NAME]: cur[0],
        [constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.PURCHASE_TYPE]: cur[1],
        [constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.PURCHASE_AMOUNT]: parseInt(cur[2], 10),
        [constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.PURCHASE_UNIT]: cur[3],
      });

      return acc;
    }, []);
  }
}

module.exports = PurchasesSourceData;
