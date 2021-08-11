const { createReadStream } = require('fs');
const csv = require('csv');

async function readFile(filePath) {
  const readable = createReadStream(filePath);

  return new Promise((resolve, reject) => {
    let data = '';

    readable.on('data', (chunk) => {
      data += chunk;
    });

    readable.on('end', () => {
      resolve(data);
    });

    readable.on('error', (err) => {
      reject(err);
    });
  });
}

function parseCsv(csvString) {
  const parser = csv.parse({
    trim: true,
    skip_empty_lines: true,
  });

  return new Promise((resolve, reject) => {
    const rtn = [];

    parser.on('readable', () => {
      let record;

      while (record = parser.read()) { /* eslint-disable-line no-cond-assign */
        rtn.push(record);
      }
    });

    parser.on('error', (err) => {
      reject(err);
    });

    parser.on('end', () => {
      resolve(rtn);
    });

    parser.write(csvString);
    parser.end();
  });
}

module.exports = {
  readFile,
  parseCsv,
};
