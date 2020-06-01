import { obfuscateObjectUtil } from '../obfuscate-object.utils';

describe('obfuscateObjectUtil', () => {
  const whatever = {
    name: 'Bot',
    surname: 'bot',
    age: 1,
    birth: '2015-02-12 10:38:05.384854',
    data: {},
  };

  it('should return a new object obfuscate', async () => {
    const result = obfuscateObjectUtil(whatever);
    expect(result).toEqual({
      name: '****',
      surname: '****',
      age: 0,
      birth: null,
      data: {},
    });
  });
});
