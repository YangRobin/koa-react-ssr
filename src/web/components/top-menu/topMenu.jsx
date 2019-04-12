
import React from 'react'
import style from './style.less'

export default class topMenu extends React.Component{

  render(){
    return(
      <div className={style.top}>
         <ul>
           <li>home</li>
           <li>article</li>
           <li>other</li>
         </ul>
      </div>
    )
  }
}