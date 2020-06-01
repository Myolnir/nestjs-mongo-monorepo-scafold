import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../../app.config';
import { FizzDatabaseService } from '../fizz-database.service';
import { FizzDomainService } from '../fizz-domain.service';
import { FizzDto } from '../dtos/fizzDto';

import {
  FIZZ_SCHEMA,
} from './resources/fizz.schema';
import { createFizzDto } from './resources/fizz.dto.resource';

describe('FizzDomainService', () => {
  let fizzDatabaseService: FizzDatabaseService;
  let fizzDomainService: FizzDomainService;

  const fizzDatabaseServiceMock = {
    updateOneById: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
  };

  const generateTestingModule = async () => {
    const module = await Test.createTestingModule({
      controllers: [],
      providers: [
        FizzDomainService,
        {
          provide: FizzDatabaseService,
          useFactory: () => (fizzDatabaseServiceMock),
        },
      ],
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
      ],
    }).compile();

    fizzDatabaseService = module.get<FizzDatabaseService>(FizzDatabaseService);
    fizzDomainService = module.get<FizzDomainService>(FizzDomainService);
  };

  beforeEach(() => {
    const resetMocks = {
      ...fizzDatabaseServiceMock,
    };
    Object.keys(resetMocks).map((e) => resetMocks[e].mockReset());
  });

  beforeAll(async () => {
    await generateTestingModule();
  });

  describe('Register new fizz', () => {
    it('Should create a new fizz', async () => {
      fizzDatabaseServiceMock.create.mockResolvedValueOnce(new FizzDto(FIZZ_SCHEMA));
      const result = await fizzDomainService.create(createFizzDto);
      expect(result).toEqual(new FizzDto(FIZZ_SCHEMA));
      expect(fizzDatabaseService.create).toBeCalledTimes(1);
    });
  });

  describe('Update fizz', () => {
    const updateFizz = { name: 'juan' };
    it('Should update a fizz', async () => {
      fizzDatabaseServiceMock.updateOneById.mockResolvedValueOnce(new FizzDto(FIZZ_SCHEMA));
      const result = await fizzDomainService.updateFizz(FIZZ_SCHEMA.id, updateFizz);
      expect(result).toEqual(new FizzDto(FIZZ_SCHEMA));
      expect(fizzDatabaseService.updateOneById).toBeCalledTimes(1);
      expect(fizzDatabaseService.updateOneById).toBeCalledWith(FIZZ_SCHEMA.id, updateFizz);
    });
    it('Should return a 404 Error', async () => {
      try {
        await fizzDomainService.updateFizz(FIZZ_SCHEMA.id, updateFizz);
      } catch (err) {
        expect(err).toEqual(new Error('Fizz does not exist'));
        expect(fizzDatabaseService.updateOneById).toBeCalledTimes(1);
        expect(fizzDatabaseService.updateOneById).toBeCalledWith(FIZZ_SCHEMA.id, updateFizz);
      }
    });
  });

  describe('Find one fizz', () => {
    it('Should return a fizz', async () => {
      fizzDatabaseServiceMock.findById.mockResolvedValueOnce(new FizzDto(FIZZ_SCHEMA));
      const result = await fizzDomainService.findOne(FIZZ_SCHEMA.id);
      expect(result).toEqual(new FizzDto(FIZZ_SCHEMA));
      expect(fizzDatabaseService.findById).toBeCalledTimes(1);
      expect(fizzDatabaseService.findById).toBeCalledWith(FIZZ_SCHEMA.id);
    });
    it('Should return a 404 Error', async () => {
      try {
        await fizzDomainService.findOne(FIZZ_SCHEMA.id);
      } catch (err) {
        expect(err).toEqual(new Error('Fizz does not exist'));
        expect(fizzDatabaseService.findById).toBeCalledTimes(1);
        expect(fizzDatabaseService.findById).toBeCalledWith(FIZZ_SCHEMA.id);
      }
    });
  });

});
