import React, { useContext, useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import AuthForm from "./authForm";
import Button from "react-bootstrap/Button";
import { CurrentUserContext } from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Cart from "./cart";
import AuthForm2 from "./authForm2";

function TopBar() {
  const [tokenValid, setTokenValid] = useState(true);
  const [state, setState] = useContext(CurrentUserContext);
  const apiUrl = tokenValid ? "/user" : "/token/refresh/";
  const [{ response }, doFetch] = useFetch(apiUrl);
  const token = localStorage.getItem("token");

  const handleSubmitLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
    setState((state) => ({
      ...state,
      isLoggedIn: false, userId: null
    }));
  };
  useEffect(() => {
    if (response !== null && response.code) {
      doFetch({ method: "POST" });
      setTokenValid(false);
      console.log(response);
    }

    if (response !== null && response.access) {
      localStorage.setItem("token", response.access);
      setTokenValid(true);

    }
    if (apiUrl === "/token/refresh/" && response !== null && response.code) {
      handleSubmitLogOut();
    }
  }, [response]);

  useEffect(() => {
    if (token) {
      setState((state) => ({
        ...state,
        isLoggedIn: true,
        userId: response.id
      }));
    }
  }, []);

  useEffect(() => {
    if (state.isLoggedIn) {
      doFetch({ method: "GET" });
    }
  }, [state.isLoggedIn, tokenValid]);

  return (
    <Navbar bg="dark" variant="dark">
      <Link to={"/"}>
        <Navbar.Brand>Super Shop</Navbar.Brand>
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {state.isLoggedIn ? (
          <Navbar.Text>
            <div className="pr-3">
              Hello{" "}
              <a href="#login">{response !== null ? response.username : ""}</a>
            </div>
          </Navbar.Text>
        ) : (
          <div>
            <AuthForm />
            <AuthForm2 />
          </div>
        )}
        {state.isLoggedIn && (
          <Button variant="outline-secondary" onClick={handleSubmitLogOut}>
            Log Out
          </Button>
        )}
        <Cart/>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default TopBar;
