
import fs from 'fs'
import os from 'os'


export default async function upload (ctx, next) {
  console.log(ctx.request.files.file)
  ctx.body = "upload"
}