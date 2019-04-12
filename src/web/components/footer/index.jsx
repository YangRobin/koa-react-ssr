

import React from 'react';
import Wrapper from '../wrapper/index.jsx'
import style from './style.less'

export default class Footer extends React.PureComponent {

  render() {
    return (
      <div>
        <Wrapper>
          <div className={style.footer}>
             All copyright reserved by Robin.
          </div>
        </Wrapper>
      </div>
    )
  }
}