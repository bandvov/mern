import React from "react";
import { AuthPage, CreatePage, DetailPage, LinksPage } from "../Pages";
import { Switch, Route, Redirect } from "react-router-dom";


const myRoutes = isAuthentificated => {
  if (isAuthentificated) {
    return (
      <Switch>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Route>
          <Redirect to="/create" />
        </Route>
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/">
        <AuthPage />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};
export default myRoutes;
