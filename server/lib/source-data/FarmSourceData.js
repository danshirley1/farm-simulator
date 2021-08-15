const SourceData = require('./SourceData');
const constants = require('../../../constants');

// Serialised representation of source data in file 'source-data/farms-data.csv'
class FarmSourceData extends SourceData {
  getDataStruct() {
    return this.data.reduce((acc, cur) => {
      acc.push({
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.FARM_NAME]: cur[0],
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.ACRES]: parseInt(cur[1], 10) || 0,
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.COW_COUNT]: parseInt(cur[2], 10) || 0,
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.TRACTOR_COUNT]: parseInt(cur[3], 10) || 0,
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.TRACTOR_USAGE]: parseInt(cur[4], 10) || 0,
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.MILK_MACHINE_COUNT]: parseInt(cur[5], 10) || 0,
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.MILK_MACHINE_USAGE]: parseInt(cur[6], 10) || 0,
        [constants.SOURCE_DATA_SCHEMA.FARM_DATA.MILK_PRODUCED]: parseInt(cur[7], 10) || 0,
      });

      return acc;
    }, []);
  }
}

module.exports = FarmSourceData;
