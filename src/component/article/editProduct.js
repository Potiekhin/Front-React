import React, {useContext, useEffect, useRef, useState} from "react"
import EditIcon from "@material-ui/icons/Edit";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import GetProperties from "./getProperties";
import InputButton from "./inputButton";
import MyInput from "./myInput";
import AddIMG from "./addIMG";
import useFetch from "../../hooks/useFetch";
import {CurrentUserContext} from "../../contexts/currentUser";

export default function EditProduct(props) {
    const apiUrl = `/product/change_product/${props.product_id}`
    const [{response}, doFetch] = useFetch(apiUrl)
    const [brand, setBrand] = useState('')
    const [color, setColor] = useState('')
    const [img, setImg] = useState('')
    const refBrand = useRef('')
    const refColor = useRef('')
    const refName = useRef('')
    const refPrice = useRef('')
    const refQuantity = useRef('')
    const [state, setState] = useContext(CurrentUserContext)
    const [editColor, setEditColor] = useState(false)
    const [show, setShow] = useState(false)

    const toggleEditColor = () => {
        setEditColor(!editColor)
    }
    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true)
    const editProduct = () => {
        const formData = new FormData()
        refBrand.current.value !== '-------' && formData.append('brand', refBrand.current.value)
        refColor.current.value !== '-------' && formData.append('color', refColor.current.value)
        formData.append('name', refName.current.value)
        formData.append('price', refPrice.current.value)
        formData.append('quantity', refQuantity.current.value)
        img && formData.append('img', img)
        doFetch({method: 'PUT', body: formData})

    }
    useEffect(() => {
        response !== undefined && response !== null && setState(state => ({
            ...state,
            updateProductList: !state.updateProductList

        }))
    }, [response])
    return (
        <div className='m-auto d-flex justify-content-center'>

            <EditIcon
                onMouseEnter={toggleEditColor}
                onMouseLeave={toggleEditColor}
                className={editColor ? 'text-success' : ''}
                onClick={handleShow}
            />

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Product
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <GetProperties  forwardRef={refBrand} properties={'Бренд'} url={'brand/'}/>
                            <InputButton
                                onclick={setBrand}
                                type='text'
                                name='brand'
                                placeholder='add Brand'
                                url='/product/brand/'
                                state={brand}
                            />
                            <GetProperties
                                forwardRef={refColor}
                                properties={'Цвет'}
                                url={'color/'}
                            />
                            <InputButton
                                onclick={setColor}
                                type='text'
                                name='color'
                                placeholder='add Color'
                                url='/product/color/'
                                state={color}
                            />
                            <MyInput
                                forwardRef={refName}
                                type='text'
                                name='name'
                                placeholder='add Product Name'
                                defaultValue={props.product_data.name}
                            />
                            <MyInput
                                forwardRef={refPrice}
                                type='text'
                                name='price'
                                placeholder='add Product Price'
                                defaultValue={props.product_data.price}
                            />
                            <MyInput
                                forwardRef={refQuantity}
                                type='text'
                                name='quantity'
                                placeholder='add Product Quantity'
                                defaultValue={props.product_data.quantity}
                            />
                            <AddIMG
                                type='file'
                                name='img'
                                placeholder='add IMG'
                                setState={setImg}
                                // defaultValue={props.action === 'edit' ? props.product_data.img : ''}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={editProduct}>edit
                        Product
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}