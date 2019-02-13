import { query } from '../util/util';

export function getAllUser(){

  return  query("select * from user");
}