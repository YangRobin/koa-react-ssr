
import fs from 'fs'
import path from 'path';
import { writeFile } from '../../util/util'



export default async function upload(ctx, next) {
  const file = ctx.request.files.file;
  console.log(file)

  const tmpdir = path.join(__dirname, "../resource/img");
  const filePath = path.join(tmpdir, file.name);
  const reader = fs.createReadStream(file.path);
  const writer = fs.createWriteStream(filePath);
  reader.pipe(writer);

  ctx.body = { file: "/img/" + file.name }
}

