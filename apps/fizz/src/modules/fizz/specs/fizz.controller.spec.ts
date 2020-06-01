import { Test } from '@nestjs/testing';

import { FIZZ_SCHEMA } from './resources/fizz.schema';
import { createFizzDto } from './resources/fizz.dto.resource';
import { FizzController } from '../fizzController';
import { FizzDto } from '../dtos/fizzDto';
import { FizzDomainService } from '../fizz-domain.service';
import { FizzResponseDto } from '../dtos/fizz-response.dto';

describe('FizzController', () => {
  let fizzController: FizzController;
  let fizzDomainService: FizzDomainService;

  const fizzDomainServiceMocks = {
    create: jest.fn(),
    findOne: jest.fn(),
    updateFizz: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [
        FizzController,
      ],
      providers: [
        {
          provide: FizzDomainService,
          useFactory: () => (fizzDomainServiceMocks),
        },
      ],
      imports: [],
    }).compile();

    fizzDomainService = module.get<FizzDomainService>(FizzDomainService);
    fizzController = module.get<FizzController>(FizzController);
  });

  beforeEach(() => {
    const resetMocks = {
      ...fizzDomainServiceMocks,
    };
    Object.keys(resetMocks).map((e) => resetMocks[e].mockReset());
  });

  describe('Create fizz', () => {
    it('Should return a new fizz', async () => {
      fizzDomainServiceMocks.create.mockResolvedValueOnce(new FizzDto(FIZZ_SCHEMA));
      const result = await fizzController.create(createFizzDto);
      expect(result).toEqual(new FizzResponseDto(new FizzDto(FIZZ_SCHEMA)));
      expect(fizzDomainService.create).toBeCalledTimes(1);
      expect(fizzDomainService.create).toBeCalledWith(createFizzDto);
    });
  });


  describe('Read fizz', () => {
    it('Should Return a fizz by id', async () => {
      fizzDomainServiceMocks.findOne.mockResolvedValueOnce(new FizzDto(FIZZ_SCHEMA));
      const result = await fizzController.readOne(FIZZ_SCHEMA.id);
      expect(result).toEqual(new FizzResponseDto(new FizzDto(FIZZ_SCHEMA)));
      expect(fizzDomainService.findOne).toBeCalledTimes(1);
      expect(fizzDomainService.findOne).toBeCalledWith(FIZZ_SCHEMA.id);
    });

    it('Should return a 404 ERROR', async () => {
      fizzDomainServiceMocks.findOne.mockRejectedValueOnce('FIZZ NOT FOUND');
      try {
        await fizzController.readOne(FIZZ_SCHEMA.id);
      } catch (err) {
        expect(err).toEqual('USER NOT FOUND');
        expect(fizzDomainService.findOne).toBeCalledTimes(1);
        expect(fizzDomainService.findOne).toBeCalledWith(FIZZ_SCHEMA.id);
      }
    });
  });

  describe('Update fizz', () => {
    const updateFizz = { name: 'juan' };
    it('Should update a fizz by id', async () => {
      fizzDomainServiceMocks.updateFizz.mockResolvedValueOnce(new FizzDto(FIZZ_SCHEMA));
      const result = await fizzController.updateOne(FIZZ_SCHEMA.id, updateFizz);
      expect(result).toEqual(new FizzResponseDto(new FizzDto(FIZZ_SCHEMA)));
      expect(fizzDomainService.updateFizz).toBeCalledTimes(1);
      expect(fizzDomainService.updateFizz).toBeCalledWith(FIZZ_SCHEMA.id, updateFizz);
    });

    it('Should return a 404 ERROR', async () => {
      fizzDomainServiceMocks.updateFizz.mockRejectedValueOnce('FIZZ NOT FOUND');
      try {
        await fizzController.updateOne(FIZZ_SCHEMA.id, updateFizz);
      } catch (err) {
        expect(err).toEqual('FIZZ NOT FOUND');
        expect(fizzDomainService.updateFizz).toBeCalledTimes(1);
        expect(fizzDomainService.updateFizz).toBeCalledWith(FIZZ_SCHEMA.id, updateFizz);
      }
    });
  });
});
