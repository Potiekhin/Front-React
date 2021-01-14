import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { productAction } from "../../redux/actions/product-action";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ClearIcon from "@material-ui/icons/Clear";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
function ProductPage() {
  const product = useSelector((state) => state.productReducer.product);
  const baseUrl = "http://127.0.0.1:8000";
  const dispatch = useDispatch();
  const url = window.location.pathname.replace(
    "product",
    "product/get_product"
  );

  useEffect(() => {
    dispatch(productAction(url));
  }, []);
  console.log(product);
  return (
    <>
      <div className="container">
        <h2 className="py-5">{`${product.brand.name} ${product.name} ${product.color.name}`}</h2>

        <Row lg={2} md={1}>
            <div>
              <img alt='' className='w-100' src={baseUrl + product.img} />
            </div>
            <div>
              <div>
                {product.quantity > 5 && (
                    <h6 className="text-success">
                      <CheckCircleIcon /> Available
                    </h6>
                )}
                {product.quantity <= 5 && product.quantity > 0 && (
                    <h6 className="text-warning">
                      <CheckCircleIcon />
                      Ends
                    </h6>
                )}
                {product.quantity < 1 && (
                    <h6 className="text-danger">
                      <ClearIcon />
                      Not available
                    </h6>
                )}
              </div>
              <Row>
                <Col className="col-4">
                  <h2 className="text-danger">{product.price} ₴</h2>
                </Col>
                <Col className="col">
                  <button className="btn btn-success">
                    <ShoppingCartIcon /> Buy
                  </button>
                </Col>
              </Row>
              <div>
                <h4 className="py-2">Description</h4>
                {product.description}
              </div>
            </div>

        </Row>
      </div>
    </>
  );
}

export default ProductPage;
