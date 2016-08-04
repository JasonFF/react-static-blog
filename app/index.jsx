import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
const dest = document.getElementById('content');
render(
    <Router history={browserHistory}>
        {routes()}
    </Router>,
    dest
)
