import React from "react";
import { renderToString } from "react-dom/server";
import fs from "fs";
import Home from "../pages/home";

import path from "path";
import { getAllUser } from '../services/userServiceFacade';

export async function  home(ctx, next) {

   var res = await getAllUser();
   await ctx.render('home')
  // console.log(__dirname);
  // const html = fs.readFileSync(path.join(__dirname, "../dist/home.html"));
  // ctx.body =html.toString()
}


export async function  test(ctx, next) {
  ctx.body={
    name:'robin',
    age:33,
  }
 // console.log(__dirname);
 // const html = fs.readFileSync(path.join(__dirname, "../dist/home.html"));
 // ctx.body =html.toString()
}


// export function test(ctx, next) {
//   const html = fs.readFileSync(path.join(__dirname, "../dist/test.html"));
//   ctx.body = html.toString();
// }
