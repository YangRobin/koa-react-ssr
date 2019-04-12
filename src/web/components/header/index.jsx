

import React from 'react';
import style from './style.less';

import Wrapper from '../wrapper/index.jsx'

export default class Header extends React.PureComponent {
  render() {
    return (
      <div className={style.header}>
        <Wrapper>
          <div>
            <a href="/" className={style.logo}>一个全栈的养成记</a>
          </div>
        </Wrapper>
      </div>
    )
  }
}