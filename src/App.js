import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useRoutes } from './routes';
import './App.css';

const App = () => {
  const routes = useRoutes();
  return (
    <Router>
      <div className="container">{routes}</div>
    </Router>
  );
};

export default App;
