import { ParameterizedContext, Next } from 'koa';
import Router from '@koa/router';
import { injectable } from 'inversify';
import {
	CustomClassBuilder,
	CustomResult,
	lazyInject,
	TNullable,
} from '@demo/app-common';
import { IStateResult } from '../../domain/types';
import { InjectorCodes } from '../../domain/enums/injector-codes';
import { IUserRepository } from '../../domain/repositories/i-user-repository';
import { UserEntity } from '../../domain/entities/user-entity';
import { CreateUserRequest } from '../../domain/value-objects/create-user-request';

@injectable()
export class UserController {

  @lazyInject(InjectorCodes.I_USER_REPO)
  private _repo: TNullable<IUserRepository>;

  public create = async (ctx: ParameterizedContext<IStateResult>, next: Next): Promise<void> => {
    const mReq = CustomClassBuilder.build(CreateUserRequest, ctx.request.body)?.checkRequired();
    const entity = new UserEntity();
    entity.name = <string>mReq?.name;
    entity.birthDate = <number>mReq?.birthDate;
    entity.group = <string[]>mReq?.group;
    entity.personalId = <string>mReq?.personalId;
    entity.phone = <string>mReq?.phone;
    entity.email = <string>mReq?.email;
    entity.account = <string>mReq?.account;
    await this._repo?.save(entity);
    ctx.state.result = new CustomResult().withResult(entity);
    await next();

  }

  public findOne = async (ctx: ParameterizedContext<IStateResult>, next: Next): Promise<void> => {
    const id = ctx.query.accountId;
    const entity = await this._repo?.findOne(<string>id);
    ctx.state.result = new CustomResult().withResult(entity);
    await next();
  }

  public static build(): Router {
    const _ctrl = new UserController();
    return new Router()
      .prefix('/')
      .get('/lookup', _ctrl.findOne)
      .post('/sign_up', _ctrl.create);
  }
}