import { IBaseRequest } from '@demo/app-common';

export class CreateUserRequest implements IBaseRequest<CreateUserRequest> {
  public name: string = '';
  public birthDate: number = 0;
  public group: string[] = [];
  public personalId: string = '';
  public phone: string = '';
  public email: string = '';
  public account: string = '';

  checkRequired(): CreateUserRequest {
    return this;
  }

}