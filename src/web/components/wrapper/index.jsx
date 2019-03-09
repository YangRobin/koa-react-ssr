

import React from 'react';
import  style from './style.scss'

export default class Wrapper extends React.PureComponent{
  constructor(props){
    super(props);
    
  }
  render(){

     
    return(
      <div className={style.wrapper}> 
        {this.props.children}
      </div>
    )
  }
}