

const allowUrl = ['/', '/login', '/api/loadQuery', '/api/enter'];

export default async function LoginMidware(ctx, next) {
  const ck = ctx.cookies.get('koa:sess')
   
  if (ck) {
    await next();
  } else {
    if (allowUrl.indexOf(ctx.url) > -1) {
      await next();
    } else {
      ctx.redirect('/login');
    }
  }
}