// import React from "react";
// import {
//   renderToString
// } from "react-dom/server";
// import fs from "fs";
// import Home from "../pages/home";

// import path from "path";
import {
  queryUseByNameAndPassword
} from '../services/userServiceFacade';

export async function login(ctx, next) {
  var res = await queryUseByNameAndPassword('robin', '15595469543');
  console.log(res)
  await ctx.render('login')
}