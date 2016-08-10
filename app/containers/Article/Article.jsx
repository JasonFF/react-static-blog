import React,{Component} from 'react';
import {Link} from 'react-router';

export default class Article extends Component {
  componentWillMount() {
    const aid = this.props.params.id;
    let data;
    for (var i = 0; i < MDDATA.length; i++) {
      if (MDDATA[i].aid == aid) {
        data = MDDATA[i]
        break
      }
    }
    this.setState({
      data: data
    })
  }
  render() {
    const style = require('./Article.less');
    const {data} = this.state;
    return (
      <div className={`${style.container}`} >
        <h1>{data.title}</h1>
        <p className={style.info}>{data.createTime} <Link to={'/notebook/'+data.notebook}>{data.notebook}</Link></p>
        <div className={`markdown-body`} dangerouslySetInnerHTML={{__html: data.html}}>
        </div>
      </div>
    )
  }
}
