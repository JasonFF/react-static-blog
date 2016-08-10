import React, {Component} from 'react';
import {Link} from 'react-router'

export default class Navbar extends Component {
  render() {
    const style = require('./Navbar.less');
    return <nav className={style.nav}>
      <h1 className={style.title}>JasonFF</h1>
      <Link to='/' className={style.list}>首页</Link>
      {
        NOTEBOOK.map((data,index)=><Link to={"/notebook/"+data.notebook} activeClassName={style.active} className={style.list} key={'notebook'+index}>
          {data.notebook}
        </Link>)
      }
      <div className={style.navBottom}>
        微博，微信
      </div>
    </nav>
  }
}
