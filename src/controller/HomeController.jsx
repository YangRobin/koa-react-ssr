import React from "react";
import { renderToString } from "react-dom/server";
import fs from "fs";
import Home from "../pages/home";

import path from "path";

export async function  home(ctx, next) {
  
   await ctx.render('home')
  // console.log(__dirname);
  // const html = fs.readFileSync(path.join(__dirname, "../dist/home.html"));
  // ctx.body =html.toString()
}

// export function test(ctx, next) {
//   const html = fs.readFileSync(path.join(__dirname, "../dist/test.html"));
//   ctx.body = html.toString();
// }
