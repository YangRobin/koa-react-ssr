import React from 'react';
import style from './style.less';

class Breif extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      name: 'robin'
    }
  }
  render() {
    return (
      <div>
        <div className={style.info}>
          <div className={style.avator}>
            <img src="avator.jpg" alt="avator" />
          </div>
          <div className={style.brief}>
            <h3>robin</h3>
            <div className={style.social}>
              <span>
                <a target='blank' href="https://github.com/YangRobin">github</a>
              </span>
              <span>
                <a target='blank' href="https://www.zhihu.com/people/robinYang11/activities">知乎</a>
              </span>
            </div>
          </div>
          <div className={style.about}>
            <p>
              寻找知识的力量
           </p>
          </div>
          {/* <div className={style.contact}>
            <span className={style.title}>CONTACT</span>
            <div>
              <ul>
                <li>
                  <span>email : 756517553@qq.com</span>
                </li>
                <li>
                  <span>phone : 15595469543</span>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}

export default Breif;