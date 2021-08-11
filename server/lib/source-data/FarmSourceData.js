const SourceData = require('./SourceData');
const constants = require('../../constants');

class FarmSourceData extends SourceData {
  getDataStruct() {
    return this.data.reduce((acc, cur) => {
      acc.push({
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.FARM_NAME]: cur[0],
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.ACRES]: cur[1],
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.COW_COUNT]: cur[2],
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.TRACTOR_COUNT]: cur[3],
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.TRACTOR_USAGE]: cur[4],
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.MILK_MACHINE_COUNT]: cur[5],
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.MILK_MACHINE_USAGE]: cur[6],
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.MILK_PRODUCED]: cur[7],
      });

      return acc;
    }, []);
  }
}

module.exports = FarmSourceData;
