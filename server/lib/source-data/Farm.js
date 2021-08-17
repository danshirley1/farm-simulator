/* eslint-disable no-underscore-dangle */

const constants = require('../../../constants');

class Farm {
  constructor(props) {
    this[constants.SOURCE_DATA_SCHEMA.FARM_DATA.FARM_NAME] = props[constants.SOURCE_DATA_SCHEMA.FARM_DATA.FARM_NAME];
    this[constants.SOURCE_DATA_SCHEMA.FARM_DATA.ACRES] = props[constants.SOURCE_DATA_SCHEMA.FARM_DATA.ACRES];
    this[constants.SOURCE_DATA_SCHEMA.FARM_DATA.MILK_PRODUCED] = props[constants.SOURCE_DATA_SCHEMA.FARM_DATA.MILK_PRODUCED];
    this[constants.SOURCE_DATA_SCHEMA.FARM_DATA.TRACTOR_USAGE] = props[constants.SOURCE_DATA_SCHEMA.FARM_DATA.TRACTOR_USAGE];
    this[constants.SOURCE_DATA_SCHEMA.FARM_DATA.MILK_MACHINE_USAGE] = props[constants.SOURCE_DATA_SCHEMA.FARM_DATA.MILK_MACHINE_USAGE];

    this.inventory = props.inventory;
  }
}

module.exports = Farm;
