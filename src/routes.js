import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { NewsPage } from './pages/NewsPage';
import { StoryPage } from './pages/StoryPage';

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <NewsPage />
      </Route>
      <Route path="/:id" exact>
        <StoryPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
