import FarmSourceData from '@/../server/lib/source-data/FarmSourceData';

describe('FarmSourceData class', () => {
  describe('getDataStruct()', () => {
    const testFields = [['A', 'B', 'C', 1, 2, 3, 4, 5], ['d', 'e', 'f', 6, 7, 8, 9, 10]];
    const classInstance = new FarmSourceData(testFields);

    it('returns the expected object structure', async (done) => {
      const result = classInstance.getDataStruct();

      expect(result).toEqual(
        [
          {
            ACRES: 'B',
            COW_COUNT: 'C',
            FARM_NAME: 'A',
            MILK_MACHINE_COUNT: 3,
            MILK_MACHINE_USAGE: 4,
            MILK_PRODUCED: 5,
            TRACTOR_COUNT: 1,
            TRACTOR_USAGE: 2,
          },
          {
            ACRES: 'e',
            COW_COUNT: 'f',
            FARM_NAME: 'd',
            MILK_MACHINE_COUNT: 8,
            MILK_MACHINE_USAGE: 9,
            MILK_PRODUCED: 10,
            TRACTOR_COUNT: 6,
            TRACTOR_USAGE: 7,
          },
        ],
      );
      done();
    });
  });
});
