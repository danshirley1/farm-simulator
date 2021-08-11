import { parseCsv } from '@/../server/lib/file-io';

describe('lib file-io', () => {
  describe('parseCsv()', () => {
    const testString = `
      Johnson's Farm,84,106,3,10,1,20,15434
      Super Farm,210,33,6,8,4,15,24534
      Sarah's field,13,122,,,1,19,1432
      Hickory Homestead,150,68,10,13,4,54,21865
      Hickory Homestead 2,123,343,4,"8,4",4,54,18032
      Whispering Pines,84,232,3,7.6,2,20,3223
      Magnolia Ranch,43,33,6,8,1,15,2323
      Birch Wood Farm,240,433,4,14,2,32,21323
      Bumble Bee farm 1,56,68,,,1,69,4553
      Bumble Bee farm 2,123,143,7,12.3,6,54,10233
    `;

    it('returns the expected value', async (done) => {
      const result = await parseCsv(testString);

      expect(result).toEqual([
        ['Johnson\'s Farm', '84', '106', '3', '10', '1', '20', '15434'],
        ['Super Farm', '210', '33', '6', '8', '4', '15', '24534'],
        ['Sarah\'s field', '13', '122', '', '', '1', '19', '1432'],
        ['Hickory Homestead', '150', '68', '10', '13', '4', '54', '21865'],
        ['Hickory Homestead 2', '123', '343', '4', '8,4', '4', '54', '18032'],
        ['Whispering Pines', '84', '232', '3', '7.6', '2', '20', '3223'],
        ['Magnolia Ranch', '43', '33', '6', '8', '1', '15', '2323'],
        ['Birch Wood Farm', '240', '433', '4', '14', '2', '32', '21323'],
        ['Bumble Bee farm 1', '56', '68', '', '', '1', '69', '4553'],
        ['Bumble Bee farm 2', '123', '143', '7', '12.3', '6', '54', '10233'],
      ]);
      done();
    });
  });
});
