import React, {useContext, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Modal from "react-bootstrap/Modal";
import {useSelector} from "react-redux";
import {CurrentUserContext} from "../../contexts/currentUser";


function Cart() {
    const [state, setState] = useContext(CurrentUserContext);
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const cart = useSelector(state=>state.cartReducer.cart)
    console.log(cart)
    useEffect(()=>{
        if(state.isLoggedIn){
            // get items id from cart, then get products and set it in localStorage
        }else {
            if(!localStorage.getItem('cart')){
                localStorage.setItem('cart', JSON.stringify([]))
            }
        }
    },[state.isLoggedIn])

    return (
        <div className="pl-3">
            <Button className="pl-2" variant="outline-secondary" onClick={handleShow}>
                <small className="text-danger">{cart !== null &&( cart.length === 0 ? '' : cart.length)}</small>
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
                       // cart.length > 0 && cart.map(item=><div>{item.specification.img}</div>)
                    }
                    <div className='row'>
                        <div className='col-12 col-md-8'>

                            <img style={{height: '50px'}}
                                 src="https://i.allo.ua/media/catalog/product/cache/1/image/600x415/602f0fa2c1f0d1ba5e241f914e856ff9/c/o/copy_xiaomi_jyu4191cn_5ebcfa8a65c7a_images_18229147027.jpg"
                                 alt="no img"/> title title title title title title title
                        </div>
                        <div className='col-6 col-md-4'>
                            <button className="btn btn-light">-</button>
                            {'10'}
                            <button className="btn btn-light">+</button>
                            10000
                        </div>

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <div>
                        Total 10000 ₴ <button className='btn btn-success'>To order</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Cart