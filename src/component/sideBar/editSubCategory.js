import React, {useContext, useEffect, useState} from "react"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import useFetch from "../../hooks/useFetch"
import {CurrentUserContext} from "../../contexts/currentUser"

export default function EditSubCategory(props) {

    const [doFetchMethod, setDoFetchMethod] = useState('')
    const [state, setState] = useContext(CurrentUserContext)
    const [subCategory, setSubCategory] = useState({name: ''})
    const [categoryStatus, setCategoryStatus] = useState(false)
    const apiUrl = doFetchMethod === 'POST' ? `/categories/sub_category/${props.category_id}` :
        `/categories/edit_sub_category/${subCategory && subCategory.id}`
    const [{isLoading, response}, doFetch] = useFetch(apiUrl)

    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
        setSubCategory({...subCategory, name: ''})
    }
    const handleShow = () => setShow(true)

    const changeCategory = (e) => {
        if (e.target.value) {
            setSubCategory(props.sub_category_list.find(item => item.id === +e.target.value))
            setCategoryStatus(false)
        } else {
            setSubCategory({...subCategory, name: ''})
            setCategoryStatus(true)
        }
    }

    const onHandleInput = (event) => {
        setSubCategory({...subCategory, name: event.target.value})
        if (subCategory) {
            !subCategory.id && setCategoryStatus(true)
        }
    }

    useEffect(() => {
        doFetch({method: doFetchMethod, body: JSON.stringify({name: subCategory.name})})

    }, [doFetchMethod])

    useEffect(() => {
        response !== null && !response.code && setState(state => ({...state, editSubCategory: !state.editSubCategory}))
        response !== null && !response.code && setSubCategory({name: ''})
    }, [response])

    return (
        <>
            <button className='btn bg-dark text-light w-100' onClick={handleShow}>
                edit sub category
            </button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {subCategory && subCategory.id ? 'Edit Subcategory ': 'Add Subcategory'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Выбрать Суб Категорию</Form.Label>
                            <Form.Control as="select"
                                          onChange={(e) => changeCategory(e)}
                            >
                                <option>
                                    -----------
                                </option>
                                {(props.sub_category_list !== null && !props.sub_category_list.code) && props.sub_category_list.map(category_item =>
                                    <option key={category_item.id} value={category_item.id}>
                                        {category_item.name}
                                    </option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicLogin">
                            <Form.Label>Sub Category</Form.Label>
                            <Form.Control type="category"
                                          name="category"
                                          placeholder="Category"
                                          value={subCategory ? subCategory.name : ''}
                                          onChange={(e) => onHandleInput(e)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {subCategory && subCategory.id && <button className="btn btn-primary"
                                                        type="button"
                                                        onClick={() => setDoFetchMethod('DELETE')}
                    >
                        {
                            isLoading ?
                                <span className="spinner-border spinner-border-sm" role="status"
                                      aria-hidden="true">{}</span>
                                : ''
                        }
                        {isLoading ? 'Loading...' : 'Удалить'}
                    </button>}
                    {subCategory && subCategory.id && <button className="btn btn-primary"
                                                        type="button"
                                                        onClick={() => setDoFetchMethod('PUT')}
                    >
                        {
                            isLoading ?
                                <span className="spinner-border spinner-border-sm" role="status"
                                      aria-hidden="true">{}</span>
                                : ''
                        }
                        {isLoading ? 'Loading...' : 'Изменить'}
                    </button>}
                    {categoryStatus && <button className="btn btn-primary"
                                               type="button"
                                               onClick={() => setDoFetchMethod('POST')}
                    >
                        {
                            isLoading ?
                                <span className="spinner-border spinner-border-sm" role="status"
                                      aria-hidden="true">{}</span>
                                : ''
                        }
                        {isLoading ? 'Loading...' : 'Добавить'}

                    </button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}