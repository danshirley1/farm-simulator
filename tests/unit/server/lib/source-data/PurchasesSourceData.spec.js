import PurchasesSourceData from '@/../server/lib/source-data/PurchasesSourceData';

describe('PurchasesSourceData class', () => {
  describe('getDataStruct()', () => {
    const testFields = [['A', 'B', 'C', 'D'], [1, 2, 3, 4]];
    const classInstance = new PurchasesSourceData(testFields);

    it('returns the expected object structure', async (done) => {
      const result = classInstance.getDataStruct();

      expect(result).toEqual(
        [
          {
            FARM_NAME: 'A',
            PURCHASE_TYPE: 'B',
            PURCHASE_AMOUNT: 'C',
            PURCHASE_UNIT: 'D',
          },
          {
            FARM_NAME: 1,
            PURCHASE_TYPE: 2,
            PURCHASE_AMOUNT: 3,
            PURCHASE_UNIT: 4,
          },
        ],
      );
      done();
    });
  });
});
