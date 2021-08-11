const { getFarmEmissions } = require('./source-data');

function doCalculateResponse() {
  return getFarmEmissions();
}

module.exports = {
  doCalculateResponse,
};
