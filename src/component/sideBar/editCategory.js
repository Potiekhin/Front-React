import React, {useContext, useEffect, useState} from "react"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import useFetch from "../../hooks/useFetch"
import {CurrentUserContext} from "../../contexts/currentUser"

export default function EditCategory(props) {

    const [doFetchMethod, setDoFetchMethod] = useState('')
    const [, setState] = useContext(CurrentUserContext)
    const [category, setCategory] = useState({name: ''})
    const [categoryStatus, setCategoryStatus] = useState(false)
    const apiUrl = doFetchMethod === 'POST' ? '/categories/' : `/categories/edit_category/${category && category.id}`
    const [{isLoading, response}, doFetch] = useFetch(apiUrl)

    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
        setCategory({...category, name: ''})
    }
    const handleShow = () => setShow(true)

    const changeCategory = (e) => {
        if (e.target.value) {
            setCategory(props.category_list.find(item => item.id === +e.target.value))
            setCategoryStatus(false)
        } else {
            setCategory({...category, name: ''})
            setCategoryStatus(true)
        }
    }

    const onHandleInput = (event) => {
        setCategory({...category, name: event.target.value})
        if (category) {
            !category.id && setCategoryStatus(true)
        }
    }

    useEffect(() => {
        doFetch({method: doFetchMethod, body: JSON.stringify({name: category.name})})
    }, [doFetchMethod])

    useEffect(() => {
        response !== null && !response.code && setState(state => ({...state, editCategory: !state.editCategory}))
        setCategory({name: ''})
    }, [response])

    return (
        <>
            <button className='btn bg-dark text-light w-100' onClick={handleShow}>
                edit category
            </button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {category && category.id ? 'Edit Category ': 'Add Category'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Выбрать Категорию</Form.Label>
                            <Form.Control as="select"
                                          onChange={(e) => changeCategory(e)}
                            >
                                <option>
                                    -----------
                                </option>
                                {(props.category_list !== null && !props.category_list.code) && props.category_list.map(category_item =>
                                    <option key={category_item.id} value={category_item.id}>
                                        {category_item.name}
                                    </option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicLogin">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="category"
                                          name="category"
                                          placeholder="Category"
                                          value={category ? category.name : ''}
                                          onChange={(e) => onHandleInput(e)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {category && category.id && <button className="btn btn-primary"
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
                    {category && category.id && <button className="btn btn-primary"
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