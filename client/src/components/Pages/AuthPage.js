import React, { useState, useContext, useEffect } from "react";
import { useHttp } from "../CustomHooks";
import { useMessage } from "../CustomHooks";
import { Context } from "../Context";

const AuthPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  console.log(form);
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();

  const { token, userId, login, logOut } = useContext(Context);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/register", "POST", { ...form });
      message(data.message);
     } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/login", "POST", { ...form });
      console.log(data.token,data.userId);      
      login(data.token, data.userId);
    } catch (e) {}
  };
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card blue darken-2">
          <div className="card-content white-text">
            <span className="card-title">Short link</span>
            <input
              type="email"
              placeholder="enter email..."
              name="email"
              id="email"
              onChange={changeHandler}
            />
            <input
              type="password"
              placeholder="enter password..."
              name="password"
              id="password"
              onChange={changeHandler}
            />
            <div className="card-action">
              <input
                className="btn green"
                type="button"
                value="login"
                style={{ marginRight: "1rem" }}
                disabled={loading}
                onClick={loginHandler}
              />
              <input
                className="btn orange"
                type="button"
                value="register"
                disabled={loading}
                onClick={registerHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
