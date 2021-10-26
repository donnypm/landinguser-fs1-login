import React, { useState } from "react";
import Head from "next/head";
import { loginUser } from "../redux/actions/loginActions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleToHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginUser({
        name: name,
        email: email,
        password: password,
        loggedIn: true,
      })
    );

    setName("");
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
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
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
