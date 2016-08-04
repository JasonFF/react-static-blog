import React, {Component} from 'react';
import {Link} from 'react-router'

export default class Navbar extends Component {
  render() {
    const style = require('./Navbar.less');
    return <nav className={style.nav}>
      <h1 className={style.title}>JasonFF</h1>
      {
        NOTEBOOK.map((data,index)=><Link to={"/notebook/"+data.notebook} className={style.list} key={'notebook'+index}>
          {data.notebook}
        </Link>)
      }
    </nav>
  }
}
