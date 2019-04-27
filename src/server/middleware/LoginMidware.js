
//white list
const allowUrl = [/\/favicon.ico/,/\/login/, /\/detail\/.*/, /\/api\/loadQuery/, /\/api\/enter/,/\/api\/queryArticleByPage/,/\/api\/queryArticleById/,/\/api\/queryHostList/];

//check the url is allowed
function isAllow(url) {
  let res = false;
  allowUrl.forEach(i => {
    if (i.test(url)) {
      res = true;
    }
  })
  return res;
}

export default async function LoginMidware(ctx, next) {
  console.log(ctx.url)
  const ck = ctx.cookies.get('koa:sess')
  if (ck) {
    await next();
  } else {
    if (isAllow(ctx.url) || ctx.url === "/") {
      console.log("passed")
      await next();
    } else {
      ctx.redirect('/login');
    }
  }
}