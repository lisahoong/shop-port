import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import routes from './routes.js';

ReactDom.render(<Router routes={routes} history={browserHistory} />,
document.getElementById('app'));
