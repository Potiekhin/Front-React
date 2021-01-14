import React, { useContext, useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import AuthForm from "./authForm";
import Button from "react-bootstrap/Button";
import { CurrentUserContext } from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function TopBar() {
  const [tokenValid, setTokenValid] = useState(true);
  const [state, setState] = useContext(CurrentUserContext);
  const apiUrl = tokenValid ? "/user" : "/token/refresh/";
  const [{ response }, doFetch] = useFetch(apiUrl);
  const token = localStorage.getItem("token");

  const handleSubmitLogOut = () => {
    // localStorage.clear();
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
    setState((state) => ({
      ...state,
      isLoggedIn: false,
    }));
  };
  useEffect(() => {
    if (response !== null && response.code) {
      doFetch({ method: "POST" });
      setTokenValid(false);
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
        <Navbar.Brand href="#home">Super Shop</Navbar.Brand>
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
          </div>
        )}
        {state.isLoggedIn && (
          <Button variant="outline-secondary" onClick={handleSubmitLogOut}>
            Log Out
          </Button>
        )}
        <div className="pl-3">
          <Button className="pl-2" variant="outline-secondary">
            <small className="text-danger">1</small>
            <ShoppingCartIcon />
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default TopBar;
