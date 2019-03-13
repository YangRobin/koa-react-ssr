/**
 * @author robin.yang
 */
import Query from '../../util/Query';
const query = Query.query;

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

  queryUserById(id) {
    return query(`select * from  user where id =${id}`)
  }

}
export default new UserServiceFacade();