import React, {useContext, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import useFetch from "../../hooks/useFetch";
import {useForm} from "react-hook-form";
import IntlTelInput from 'react-bootstrap-intl-tel-input'
import {CurrentUserContext} from "../../contexts/currentUser";

export default function AuthForm() {

    const {handleSubmit, register, errors} = useForm();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [isLoginState, setIsLoginState] = useState(true)
    const descriptionText = isLoginState ? 'Need an account?' : 'Have an account?'
    const apiUrl = isLoginState ? '/token/' : '/signup'
    const [{isLoading, response}, doFetch] = useFetch(apiUrl)
    const [, setState] = useContext(CurrentUserContext)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFinalSubmit = () => {

        const user = isLoginState ?
            {
                "username": username,
                "password": password
            } :
            {
                "username": username,
                "password": password,
                "email": email,
                "profile": {
                    "phone": phone
                }
            };

        doFetch({method: 'POST', body: JSON.stringify(user)})

        if (isLoginState) {
            setUsername('')
            setPassword('')
        } else {
            setUsername('')
            setPassword('')
            setPasswordConfirm('')
            setEmail('')
            setPhone('')
        }
    }

    useEffect(() => {
        if (response != null) {
            if (typeof (response.access) !== 'undefined') {
                localStorage.setItem('token', response.access)
                setState(state => ({
                    ...state,
                    isLoggedIn: true
                }))
            }
            if (typeof (response.refresh) !== 'undefined') {
                localStorage.setItem('refresh', response.refresh)
            }
        }
    }, [response])

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                {isLoginState ? 'Sign In' : 'Sign Up'}
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{isLoginState ? 'Sign In' : 'Sign Up'}{' '}
                        <Button variant="link"
                                onClick={() => setIsLoginState(!isLoginState)}>
                            {descriptionText}
                        </Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicLogin">
                            <Form.Label>Логин</Form.Label>
                            <Form.Control type="login"
                                          name="login"
                                          placeholder="Логин"
                                          value={username}
                                          onChange={event => setUsername(event.target.value)}
                                          ref={register({
                                              required: 'логин не может быть пустой',
                                              minLength: 2,
                                              maxLength: 20
                                          })}
                            />
                            <Form.Text className="text-muted">
                                {errors.login && <span className="text-danger">{errors.login.message}</span>}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password"
                                          name='password'
                                          placeholder="Пароль"
                                          value={password}
                                          onChange={event => setPassword(event.target.value)}
                                          ref={register({
                                              required: 'пароль не может быть пустой',
                                              minLength: {
                                                  value: 5,
                                                  message: 'пароль не может быть меньше 5'
                                              },
                                              maxLength: {
                                                  value: 10,
                                                  message: 'пароль не может быть больше 10'
                                              }
                                          })}
                            />
                            <Form.Text className="text-muted">
                                {errors.password && <span className="text-danger">{errors.password.message}</span>}
                            </Form.Text>
                        </Form.Group>
                        {
                            !isLoginState &&
                            <Form.Group controlId="formBasicPasswordConfirm">
                                <Form.Label>Подтверждение пароля</Form.Label>
                                <Form.Control type="password"
                                              placeholder="Подтверждение пароля"
                                              value={passwordConfirm}
                                              onChange={event => setPasswordConfirm(event.target.value)}
                                />
                                {(password === passwordConfirm) ? '' :
                                    <Form.Text className="text-muted">
                                        Пароли не совпадают
                                    </Form.Text>
                                }
                            </Form.Group>
                        }
                        {
                            !isLoginState &&
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email"
                                              name='email'
                                              placeholder="Enter email"
                                              value={email}
                                              onChange={event => setEmail(event.target.value)}
                                              ref={register({
                                                  required: 'Email не может быть пустой',
                                                  pattern: {
                                                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                      message: "Invalid email address"
                                                  }
                                              })}
                                />
                                <Form.Text className="text-muted">
                                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                                </Form.Text>
                            </Form.Group>
                        }
                        {
                            !isLoginState &&
                            <Form.Group controlId="formBasicPhone">
                                <Form.Label>Номер Телефона</Form.Label>
                                <IntlTelInput
                                    preferredCountries={['UA', 'US', 'GB']}
                                    defaultValue={'+380'}
                                    paginate={0}
                                    placeholder={'Search for a calling code by country'}
                                    validMessage={'This phone number is valid'}
                                    onChange={data => setPhone(data.phoneNumber)}
                                />

                            </Form.Group>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button className="btn btn-primary"
                            type="button"
                            onClick={handleSubmit(handleFinalSubmit)}
                    >
                        {
                            isLoading ?
                                <span className="spinner-border spinner-border-sm" role="status"
                                      aria-hidden="true"> </span>
                                : ''
                        }
                        {isLoading ? 'Loading...' : 'Отправить'}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
