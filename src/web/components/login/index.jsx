
import React from 'react'
import style from './style.scss';
import {post} from '../../../util/request'

class LoginCard extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: ''
    }
  }
  nameChange = e => {
    this.setState({
      name: e.target.value,
    })
  }
  passwordChange = e => {
    this.setState({
      password: e.target.value,
    })
  }
  login(e){
    e.preventDefault();
    post('/api/enter',{
      name:this.state.name,
      password:this.state.password,
    }).then(res=>{
     if(res.success){
       window.location.href="/admin";
      //  window.location.reload();
     }
    })
  }
  render() {
    return (
      <div className={style.loginCard}>
        <div className={style.loginTitle}>
          welcome login
        </div>
        <form action="/upload " method="post" encType="multipart/form-data">
          <div className={style.formItem}>
            <label htmlFor="">name  </label>
            <div className={style.leftInput}>
              <input type="text" onChange={this.nameChange} value={this.state.name} />
            </div>
          </div>
          <div className={style.formItem}>
            <label htmlFor="">password  </label>
            <div className={style.leftInput}>
              <input onChange={this.passwordChange} value={this.state.password} type="text" />
            </div>
          </div>
          <div className={style.formItem}>
            <label htmlFor="">  </label>
            <div className={style.leftInput}>
              <button onClick={(e)=>{this.login(e)}}>Login</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginCard;