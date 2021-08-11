const SourceData = require('./SourceData');
const constants = require('../../constants');

class PurchasesSourceData extends SourceData {
  getDataStruct() {
    return this.data.reduce((acc, cur) => {
      acc.push({
        [constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.FARM_NAME]: cur[0],
        [constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.PURCHASE_TYPE]: cur[1],
        [constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.PURCHASE_AMOUNT]: cur[2],
        [constants.SOURCE_DATA_SCHEMA.PURCHASES_DATA.PURCHASE_UNIT]: cur[3],
      });

      return acc;
    }, []);
  }
}

module.exports = PurchasesSourceData;
