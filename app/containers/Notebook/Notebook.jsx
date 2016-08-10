import React,{Component} from 'react';
import {ArticleList} from 'components';

export default class Notebook extends Component {

  render() {
    const style = require('./Notebook.less')
    return (
      <ArticleList notebook={this.props.params.id}>

      </ArticleList>
    )
  }
}
