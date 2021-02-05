import React, {useContext, useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import {ShoppingCart} from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import useFetch from "../../hooks/useFetch";
import {CurrentUserContext} from "../../contexts/currentUser";
import EditProduct from "./editProduct";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {productAction} from "../../redux/actions/product-action";
import {addToCartAction, addToCartDBAction} from "../../redux/actions/cart-action";

function CardList(props) {
    const [state, setState] = useContext(CurrentUserContext);
    const baseUrl = "http://127.0.0.1:8000";
    const apiUrl = `/product/change_product/${props.product_id}`
    const apiUrlCart = `/cart/${state.userId}`
    const [{response}, doFetch] = useFetch(apiUrl);
    const [style, setStyle] = useState(true);
    const [trashColor, setTrashColor] = useState(false);
    const [editColor, setEditColor] = useState(false);
    const [cartColor, setCartColor] = useState(false);
    const color = props.specifications.color.name;
    const brand = props.specifications.brand;
    const img = props.specifications.img;
    const name = props.specifications.name;
    const price = props.specifications.price;
    const quantity = props.specifications.quantity;
    const dispatch = useDispatch();

    const toggleStyle = () => {
        setStyle(!style);
    };
    const deleteProduct = () => {
        doFetch({method: "DELETE"});
    };

    useEffect(() => {
        response !== undefined &&
        response !== null &&
        setState((state) => ({
            ...state,
            updateProductList: !state.updateProductList,
        }));
    }, [response]);
    const toggleTrashColor = () => {
        setTrashColor(!trashColor);
    };
    const toggleEditColor = () => {
        setEditColor(!editColor);
    };
    const setToCart = () => {
        setCartColor(true);
        state.userId ? dispatch(addToCartDBAction({
            'product': props.product_id,
            'quantity': quantity
        }, baseUrl + apiUrlCart)) : dispatch(addToCartAction(props))
    };


    return (
        <div
            onMouseEnter={toggleStyle}
            onMouseLeave={toggleStyle}
            className={style ? "p-1" : ""}
        >
            <Card className="p-3">
                <div className="d-flex justify-content-between pb-2">
                    <DeleteIcon
                        onMouseEnter={toggleTrashColor}
                        onMouseLeave={toggleTrashColor}
                        onClick={deleteProduct}
                        className={trashColor ? "text-success" : ""}
                    />
                    <div>
                        <EditProduct
                            product_data={props.specifications}
                            product_id={props.product_id}
                            onMouseEnter={toggleEditColor}
                            onMouseLeave={toggleEditColor}
                            className={editColor ? "text-success" : ""}
                        />
                    </div>
                </div>
                <Link
                    className="text-decoration-none text-dark"
                    to={`/product/${props.product_id}`}
                    onClick={() =>
                        dispatch(
                            productAction(
                                `${baseUrl}/product/get_product/${props.product_id}`
                            )
                        )
                    }
                >
                    <Card.Img
                        style={{objectFit: "contain", maxHeight: "200px"}}
                        variant="top"
                        src={baseUrl + img}
                    />
                    <Card.Body>
                        <div
                            className="mb-3"
                            style={{
                                backgroundColor: color,
                                border: "1px solid black",
                                width: "20px",
                                height: "20px",
                            }}
                        />
                        <Card.Title>{brand.name + " " + name}</Card.Title>
                        <Card.Text>{`Product code ${props.product_id}`}</Card.Text>
                    </Card.Body>
                </Link>
                <Card.Footer>
                    <div className="d-flex justify-content-between">
                        <small className="text-danger d-flex">price {price} ₴ </small>
                        <button style={{border: 'none', backgroundColor: 'transparent'}} onClick={setToCart}
                                disabled={cartColor}>
                            <ShoppingCart
                                className={cartColor ? "text-success" : ""}

                            />
                        </button>

                    </div>
                    {quantity > 5 && <small className="text-success">Available</small>}
                    {quantity <= 5 && quantity > 0 && (
                        <small className="text-warning">Ends</small>
                    )}
                    {quantity < 1 && <small className="text-danger">Not available</small>}
                </Card.Footer>
            </Card>
        </div>
    );
}

export default CardList;
