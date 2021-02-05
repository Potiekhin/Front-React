import React, {useContext, useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {CurrentUserContext} from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";
import {Link} from "react-router-dom";
import Cart from "./cart";
import AuthForm2 from "./authForm2";
import {useDispatch} from "react-redux";
import {getCartFromDBAction} from "../../redux/actions/cart-action";

function TopBar() {
    const [tokenValid, setTokenValid] = useState(true);
    const [state, setState] = useContext(CurrentUserContext);
    const apiUrlCart = `http://127.0.0.1:8000/cart/`
    const apiUrl = tokenValid ? "/user" : "/token/refresh/";
    const [{response}, doFetch] = useFetch(apiUrl);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch()
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
            doFetch({method: "POST"});
            setTokenValid(false);
        }

        if (response !== null && response.access) {
            localStorage.setItem("token", response.access);
            setTokenValid(true);

        }
        if (apiUrl === "/token/refresh/" && response !== null && response.code) {
            handleSubmitLogOut();
        }
        if (response !== null) {

            setState((state) => ({
                ...state,
                userId: response.id
            }))
            response.id !== undefined && dispatch(getCartFromDBAction(apiUrlCart+response.id))
        }
    }, [response]);

    useEffect(() => {
        if (token) {
            setState((state) => ({
                ...state,
                isLoggedIn: true
            }));
        }

    }, []);

    useEffect(() => {
        if (state.isLoggedIn) {
            doFetch({method: "GET"});
        }
    }, [state.isLoggedIn, tokenValid]);


    return (
        <Navbar bg="dark" variant="dark">
            <Link to={"/"}>
                <Navbar.Brand>Super Shop</Navbar.Brand>
            </Link>
            <Navbar.Toggle/>
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
                        {/*<AuthForm />*/}
                        <AuthForm2/>
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
