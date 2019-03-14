

import React from 'react';
import style from './style.scss';

import Wrapper from '../wrapper/index.jsx'

export default class Header extends React.PureComponent {
  render() {
    return (
      <div className={style.header}>
        <Wrapper>
          <div>
            <span className={style.logo}>DISCOVER THE POWER</span>
          </div>
        </Wrapper>
      </div>
    )
  }
}