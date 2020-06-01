import { clearUndefinedPropertiesUtil } from '../clear-undefined-properties-to-dto.utils';

describe('clearUndefinedPropertiesUtil', () => {
  const whatever = {
    name: 'Bot',
    surname: undefined,
  };

  class Dto {
    readonly name?: string;

    readonly surname?: string;

    constructor(data: Dto) {
      this.name = data.name;
      this.surname = data.surname;
    }
  }

  const resultDto = new Dto({ name: 'Bot' });

  it('should return an object with no undefined properties', async () => {
    const result = clearUndefinedPropertiesUtil(whatever, Dto);
    expect(result).toEqual(resultDto);
  });
});
