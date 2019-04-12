

const allowUrl = [/\//, /\/login/, /\/detail\/.*/, /\/api\/loadQuery/, /\/api\/enter/];

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
  const ck = ctx.cookies.get('koa:sess')
  if (ck) {
    await next();
  } else {
    if (isAllow(ctx.url)) {
      await next();
    } else {
      ctx.redirect('/login');
    }
  }
}