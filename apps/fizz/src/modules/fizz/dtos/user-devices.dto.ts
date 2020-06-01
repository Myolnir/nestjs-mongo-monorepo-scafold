import { FizzDto } from './fizzDto';

export class UserDevicesDto extends FizzDto {
  readonly devices: [];

  constructor(data: any) {
    super(data);
    this.devices = data.devices;
  }
}
