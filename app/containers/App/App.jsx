import React, {Component, PropTypes} from 'react';
import {Navbar} from 'components';

export default class App extends Component {
  render() {
    const style = require('./App.less');
    return (
      <div className={style.container}>
        <Navbar/>
        {this.props.children}
      </div>
    )
  }
}
