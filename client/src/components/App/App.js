import React, { useContext } from "react";
import myRoutes from "../Routes/myRoutes";
import { BrowserRouter } from "react-router-dom";
import { Context } from "../Context";
import { useAuth } from "../CustomHooks";
import "./App.scss";
import "materialize-css";

function App() {
  const { token, userId, login, logOut } = useAuth();
  const isAuthentificated = !!token;
  const routes = myRoutes(isAuthentificated);
  return (
    <Context.Provider
      value={{ token, userId, login, logOut, isAuthentificated }}
    >
      <BrowserRouter>{routes}</BrowserRouter>
    </Context.Provider>
  );
}

export default App;
