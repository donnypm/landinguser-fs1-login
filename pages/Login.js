import React, { useState, useEffect } from "react";
import Head from "next/head";
import { loginUser } from "../redux/actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import Swal from "sweetalert2";
import Cookie from "js-cookie";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (Cookie.get("token")) {
      router.push("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginUser({
        email: email,
        password: password,
        loggedIn: true,
      })
    );

    const token = fetch(
      "https://my-udemy-api.herokuapp.com/api/v1/user/signin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    )
      .then((response) => response.json())
      .then(
        (json) =>
          typeof window !== "undefined" && Cookie.set("token", json.token)
      )
      .then((json) => console.log(json));

    Swal.fire("Welcome " + email, "", "info");

    router.push("/");

    setEmail("");
    setPassword("");
  };

  return (
    <div style={{ marginTop: "100px", marginLeft: "50px" }}>
      <Head>
        <title>Login</title>
      </Head>

      <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Login here 🚪</h1>
        <input
          type="name"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="submit__btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
