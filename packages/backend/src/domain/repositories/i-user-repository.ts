import { TNullable } from '@demo/app-common';
import { UserEntity } from '../entities/user-entity';

export interface IUserRepository {
    save(entity: TNullable<UserEntity>): Promise<TNullable<UserEntity>>;
    findOne(id: string): Promise<TNullable<UserEntity>>;
}