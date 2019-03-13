
const cache = {
  maxAge: 600,
  expires: true,
  cacheControl: true,
  lastModified: true,
  etag: true
}
export default async function cacheHeader(ctx, next) {
  ctx.set('Cache-Control', 'max-age=903330');
  ctx.set('Expires',( new Date(Date.now() + cache.maxAge * 1000)).toUTCString())
  await next();
}