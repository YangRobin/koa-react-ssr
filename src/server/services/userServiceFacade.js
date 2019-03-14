/**
 * @author robin.yang
 */
import Query from '../../util/Query';
const query = Query.query;

class UserServiceFacade {
  /**
   * get all user 
   */
  async  getAllUser() {
    return await query("select * from user");
  }

  /**queryUseByNameAndPassword
   * query user by name and password
   */
  async  queryUseByNameAndPassword(name, password) {
    const sql = `select * from user where name = "${name}" and password ="${password}"`;
    return await query(sql);
  }

  async queryUserById(id) {
    return await query(`select * from  user where id =${id}`)
  }
}
export default new UserServiceFacade();