import React, {Component, PropTypes} from 'react';
import {ArticleList} from 'components';

export default class Index extends Component {
  render() {
    return <div>
      <ArticleList notebook="javascript"/>
    </div>
  }
}
