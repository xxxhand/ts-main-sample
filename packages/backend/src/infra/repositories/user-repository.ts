import { injectable, inject, named } from 'inversify';
import { IUserRepository } from '../../domain/repositories/i-user-repository';
import {
  TNullable,
  IMongooseClient,
  commonInjectorCodes,
  CustomClassBuilder,
} from '@demo/app-common';
import { IUserDocument } from '../orm-models/user';
import { UserEntity } from '../../domain/entities/user-entity';
import { ModelCodes } from '../../domain/enums/model-codes';

@injectable()
export class UserRepository implements IUserRepository {
  private _defaultClient: IMongooseClient;

  constructor(
    @inject(commonInjectorCodes.I_MONGOOSE_CLIENT) @named(commonInjectorCodes.DEFAULT_MONGO_CLIENT) defaultClient: IMongooseClient
  ) {
    this._defaultClient = defaultClient;
  }

  save = async (entity: TNullable<UserEntity>): Promise<TNullable<UserEntity>> => {
    if (!entity) {
      return undefined;
    }
    const col = this._defaultClient.getModel<IUserDocument>(ModelCodes.USER);
    let obj = <IUserDocument><unknown>{
      name: entity.name,
      birthDate: entity.birthDate,
      group: entity.group,
      personalId: entity.personalId,
      phone: entity.phone,
      email: entity.email,
      account: entity.account,
    };
    obj = await col.create(obj);
    entity.id = obj._id;
    return entity;
  }
  findOne = async (id: string): Promise<TNullable<UserEntity>> => {
    const col = this._defaultClient.getModel<IUserDocument>(ModelCodes.USER);
    const q = { id }
    const obj: IUserDocument = await col.findOne(q).lean();
    return this._transform(obj);
  }

  private _transform = (doc: IUserDocument): TNullable<UserEntity> => {
		if (!doc) {
			return undefined;
		}
    const entity = CustomClassBuilder.build(UserEntity, doc) as UserEntity;
    entity.id = doc._id;
		return entity;
	}

}