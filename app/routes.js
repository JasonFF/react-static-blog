import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Index,
    Notebook,
    Article
  } from 'containers';

const localStorage = localStorage?localStorage:{};

export default ()=>{
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Index}></IndexRoute>
      <Route path='/notebook/:id' component={Notebook}></Route>
      <Route path='/article/:id' component={Article}></Route>
    </Route>
  );
}
