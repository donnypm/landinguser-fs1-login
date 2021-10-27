import React, { useState, useEffect } from "react";
import Head from "next/head";
import { loginUser } from "../redux/actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import Swal from "sweetalert2";
import Cookie from "js-cookie";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (Cookie.get("token")) {
      router.push("/");
    }
  }, []);

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
    Swal.fire("Welcome " + name, "", "info");

    typeof window !== "undefined" && Cookie.set("token", "user");

    router.push("/protected");

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
