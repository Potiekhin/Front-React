import React, {useContext, useState} from "react";
import Button from "react-bootstrap/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Modal from "react-bootstrap/Modal";
import {useSelector, useDispatch} from "react-redux";
import {CurrentUserContext} from "../../contexts/currentUser";
import {
    addOneAction, addOneDBAction,
    deleteFromCartAction, deleteFromCartDBAction, editOneDBAction, subtractOneAction,
} from "../../redux/actions/cart-action";

function Cart() {
    const [state] = useContext(CurrentUserContext);
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const cart = useSelector(state => state.cartReducer.cart)
    const dispatch = useDispatch()
    const baseUrl = "http://127.0.0.1:8000"
    const editUrl = baseUrl + "/cart/edit/"
    const getUrl = baseUrl + "/cart/"

    let totalPrice = 0

    const deleteFromCart = (item) => {
        state.userId
            ? dispatch(deleteFromCartDBAction(editUrl + item.product.id, getUrl + state.userId))
            : dispatch(deleteFromCartAction(item.product))
    }
    const addOne = (item) => {
        state.userId
            ? dispatch(editOneDBAction(editUrl + item.product.id, getUrl + state.userId, {"quantity": item.quantity + 1}))
            : dispatch(addOneAction(item.product))
    }
    const substractOne = (item) => {
        state.userId
            ? dispatch(editOneDBAction(editUrl + item.product.id, getUrl + state.userId, {"quantity": item.quantity - 1}))
            : dispatch(subtractOneAction(item.product))
    }
    console.log(cart)
    return (
        <div className="pl-3">
            <Button className="pl-2" variant="outline-secondary" onClick={handleShow}>
                <small
                    className="text-danger">{(cart !== undefined && cart !== null) && (cart.length === 0 ? '' : cart.length)}</small>
                <ShoppingCartIcon/>
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <div>Cart</div>
                </Modal.Header>
                <Modal.Body>
                    {

                        (cart !== undefined) && (cart.length === 0 ?
                            <div className='d-flex justify-content-center'>Cart is empty</div> :
                            cart.map((item) => {
                                    totalPrice += item.product.price * item.quantity
                                    return <div className='row py-1' key={item.product.id}>
                                        <div className='col-md-7'>
                                            <img style={{height: '50px'}}
                                                 src={baseUrl + item.product.img}
                                                 alt="no img"
                                            />
                                            {`${item.product.brand.name} ${item.product.name}`}
                                        </div>
                                        <div className='col-md-5'>
                                            <button disabled={item.quantity < 2 && true}
                                                    className="btn btn-success"
                                                    onClick={() => substractOne(item)}>-
                                            </button>
                                            {item.quantity}
                                            <button className="btn btn-success"
                                                    onClick={() => addOne(item)}>+
                                            </button>
                                            {item.product.price * item.quantity}

                                            <button
                                                className="btn btn-danger"
                                                onClick={() => deleteFromCart(item)}
                                            >x
                                            </button>
                                        </div>
                                    </div>
                                }
                            ))
                    }
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        Total {totalPrice}₴ <button className='btn btn-success'>To order</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Cart