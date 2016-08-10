import React, {Component} from 'react';
import {Link} from 'react-router';

export default class ArticleList extends Component {
  componentWillMount() {
    for (var i = 0; i < NOTEBOOK.length; i++) {
      if (NOTEBOOK[i].notebook==this.props.notebook) {
        this.setState({
          data: NOTEBOOK[i].data
        })
        break
      }else {
          this.setState({
              data: MDDATA
          })
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    for (var i = 0; i < NOTEBOOK.length; i++) {
      if (NOTEBOOK[i].notebook==nextProps.notebook) {
        this.setState({
          data: NOTEBOOK[i].data
        })
        break
      }else {
        this.setState({
            data: MDDATA
        })
      }
    }
  }
  render() {
    const {data} = this.state;
    const style = require('./ArticleList.less')
    return (
      <div className={style.container}>
        {
          data&&data.map((data,index)=><div className={style.listBox} key={'ArticleList'+index}>
            <Link className={style.title} to={"/article/"+data.aid}>{data.title}</Link>
            <p className={style.time}>{data.createTime} <Link to={'/notebook/'+data.notebook}>《 {data.notebook} 》</Link></p>
          </div>)
        }
      </div>
    )
  }
}

{
  /*data&&data.map((data,index)=><div className='markdown-body' key={'ArticleList'+index} dangerouslySetInnerHTML={{__html:data.html}}>
  </div>)*/
}
