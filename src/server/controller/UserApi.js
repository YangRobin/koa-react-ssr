/**
 * @author robin.yang
 * @description all method in file  named like  **Ctrl.js  will be a middleware for koa-router and retrun 
 * type is json ,in another words ,restful controller.
 */

import userService from '../services/userServiceFacade'


class UserApi {

  /**
   *   request url /queryUserByNameAndPassword
   *   return the user information which type is json
   */
  async queryUserByNameAndPassword(ctx, next) {
     
    var res = await userService.queryUseByNameAndPassword('robin', '15595469543');
    ctx.body = res;
  }
}
export default new UserApi();