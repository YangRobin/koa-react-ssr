/**
 * @author robin.yang
 */

import {
  query
} from '../../util/util';

class UserServiceFacade {
  /**
   * get all user 
   */
  getAllUser() {
    return query("select * from user");
  }

  /**queryUseByNameAndPassword
   * query user by name and password
   */
  queryUseByNameAndPassword(name, password) {
    const sql = `select * from user where name = "${name}" and password ="${password}"`;
    return query(sql);
  }

}
export default  new UserServiceFacade();