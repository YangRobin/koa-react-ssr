

import React ,{Component} from  'react';
import ReactDom from 'react-dom';
import TopMenu from '../components/top-menu/topMenu.jsx'
export default class User extends Component {



  render(){
    return(
      <div>
        <TopMenu/>
        this is User page！
        <div> hello robin</div>
      </div>
    )
  }
}

