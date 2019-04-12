

import React from 'react';
import PropTypes from 'prop-types';
import style from './style.less'

class UserInfo extends React.PureComponent {

  constructor(props) {
    super(props);
  }
  render() {
    let user = this.props.data;
    return (
      <div className={style.userInfo}>
        <img className={style.avator} src={user.avator} alt="" />
        <div className={style.detail}>
          <p>{user.name}</p>
        </div>
      </div>
    )
  }
}
UserInfo.propTypes = {
  data: PropTypes.object
}

export default UserInfo