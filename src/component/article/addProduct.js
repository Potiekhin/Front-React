import React, {useContext, useEffect, useRef, useState} from "react"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import GetProperties from "./getProperties";
import InputButton from "./inputButton";
import MyInput from "./myInput";
import AddIMG from "./addIMG";
import useFetch from "../../hooks/useFetch";
import {CurrentUserContext} from "../../contexts/currentUser";
import MyTextArea from "./myTextArea";

export default function AddProduct(props) {
    const apiUrl = `/product/${props.subCategory_id}`
    const [{response}, doFetch] = useFetch(apiUrl)
    const [show, setShow] = useState(false)
    const [brand, setBrand] = useState('')
    const [color, setColor] = useState('')
    const [img, setImg] = useState('')
    const refBrand = useRef('')
    const refColor = useRef('')
    const refName = useRef('')
    const refPrice = useRef('')
    const refQuantity = useRef('')
    const refTitle = useRef('')
    const refDescription = useRef('')
    const [state, setState] = useContext(CurrentUserContext)

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true)

    const addProduct = () => {
        const formData = new FormData()
        formData.append('brand', refBrand.current.value)
        formData.append('color', refColor.current.value)
        formData.append('name', refName.current.value)
        formData.append('price', refPrice.current.value)
        formData.append('quantity', refQuantity.current.value)
        formData.append('title', refTitle.current.value)
        formData.append('description', refDescription.current.value)
        formData.append('img', img)
        doFetch({method: 'POST', body: formData})
        console.log('refname', refName.current.value)
    }
    useEffect(() => {
        response !== undefined && response !== null && setState(state => ({
            ...state,
            updateProductList: !state.updateProductList

        }))
        console.log(response)
    }, [response])

    return (
        <div className='m-auto d-flex justify-content-center'>

            <button className='btn bg-dark text-light w-75' onClick={handleShow}>
                add product
            </button>

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
                            <GetProperties forwardRef={refBrand} properties={'Бренд'} url={'brand/'}/>
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
                            />
                            <MyInput
                                forwardRef={refPrice}
                                type='text'
                                name='price'
                                placeholder='add Product Price'
                            />
                            <MyInput
                                forwardRef={refQuantity}
                                type='text'
                                name='quantity'
                                placeholder='add Product Quantity'
                            />
                            <MyInput
                                forwardRef={refTitle}
                                type='text'
                                name='title'
                                placeholder='add Product Title'
                            />
                            <MyTextArea
                                forwardRef={refDescription}
                                type='text'
                                name='description'
                                placeholder='add Product Description'
                            />
                            <AddIMG
                                type='file'
                                name='img'
                                placeholder='add IMG'
                                setState={setImg}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={addProduct}>add
                        Product
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}