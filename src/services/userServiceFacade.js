import { query } from '../util/util';

export function getAllUser(){
  return  query("select * from user");
}


export function queryUseByNameAndPassword(name,password){
  const sql =`select * from user where name = ${name} and password =${password}`;
  console.log(sql)
  return  query(`select * from user where name = "${name}" and password ="${password}"`);
}
