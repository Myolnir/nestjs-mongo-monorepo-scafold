import { FizzDto } from './fizzDto';

export class UserPassDto extends FizzDto {
  readonly password: string;

  constructor(data: any) {
    super(data);
    this.password = data.password;
  }
}
