import React, { useState, useContext, useEffect } from "react";
import { useHttp } from "../CustomHooks";
import { useMessage } from "../CustomHooks";
import { Context } from "../Context";

const AuthPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  console.log(form);
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();


  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const requestHandler = async () => {
    try {
      const data = await request("/api/register", "POST", { ...form });
      message(data.message);
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
             
              />
              <input
                className="btn orange"
                type="button"
                value="register"
                disabled={loading}
                onClick={requestHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
