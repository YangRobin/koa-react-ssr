
/**
 * @author robin.yang
 * @description all method in file  named like  **Ctrl.js  will be a middleware for koa-router 
 */

/**
 * render home.html  
 */
export async function admin(ctx, next) {
  await ctx.render('admin')
}


