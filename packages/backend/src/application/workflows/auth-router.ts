import Router from '@koa/router';
import { UserController } from '../workflows/user-controller';

const _router = new Router()
  .prefix('/authorization');

_router
  .use(UserController.build().routes());

export default _router;