

const allowUrl = ['/', '/login','/queryAllArticle'];

export default async function LoginMidware(ctx, next) {
  console.log(ctx.url)
  if (allowUrl.indexOf(ctx.url) > -1) {
   
    await next();
    // next();
    // next();
  } else {
    ctx.redirect('/login');
    // next();
  }
}