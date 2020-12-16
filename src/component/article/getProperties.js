import React, {useContext, useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch"
import Form from "react-bootstrap/Form"
import {CurrentUserContext} from "../../contexts/currentUser"

export default function GetProperties(props) {
    const apiUrl = `/product/${props.url}`
    const [{response}, doFetch] = useFetch(apiUrl)
    const [state, setState] = useContext(CurrentUserContext)

    useEffect(() => {
        doFetch({method: 'GET'})
    }, [state.updateGetProperties])
    return (
        <Form.Group>
            <Form.Label>Вибрать {props.properties}</Form.Label>
            <Form.Control as='select'
                          ref={props.forwardRef}


            >
                <option>
                    -------
                </option>
                {(response !== null && !response.code) && response.map(properties_item =>
                    <option key={properties_item.id}
                            value={properties_item.id}

                    >
                        {properties_item.name}
                    </option>
                )}
            </Form.Control>
        </Form.Group>
    )
}