import React, { useContext, useEffect, useState } from "react";
import CardList from "./cardList";
import { CurrentUserContext } from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";
import { Row } from "react-bootstrap";
import AddProduct from "./addProduct";

export default function Article(props) {
  // const [show, setShow] = useState(false)
  const [state, setState] = useContext(CurrentUserContext);
  const apiUrl =
    state.subCategoryId !== undefined && `/product/${state.subCategoryId}`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  // const handleShow = () => setShow(true)
  useEffect(() => {
    if (state.subCategoryId) {
      doFetch({ method: "GET" });
    }
  }, [state.subCategoryId, state.updateProductList]);

  return (
    <Row lg={4} md={2} sm={1} className="p-1">
      {response !== null && <AddProduct subCategory_id={state.subCategoryId} />}
      {response !== null &&
        response.map((product) => (
          <CardList
            key={product.id}
            product_id={product.id}
            specifications={product}
          />
        ))}
    </Row>
  );
}
