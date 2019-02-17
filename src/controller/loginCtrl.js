/**
 * @author robin.yang
 * @description all method in file  named like  **Ctrl.js  will be a middleware for koa-router 
 */

 import userService from '../services/userServiceFacade'

/**
 *  login controller  ,render the login.html 
 */
export async function login(ctx, next) {
  
  var res = await userService.queryUseByNameAndPassword('robin', '15595469543');
  await ctx.render('login')
}