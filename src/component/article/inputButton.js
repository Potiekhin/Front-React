import React, {useContext, useEffect, useRef, useState} from "react";
import useFetch from "../../hooks/useFetch";
import {CurrentUserContext} from "../../contexts/currentUser";

const InputButton = (props) => {
    const apiUrl = props.url
    const [{response}, doFetch] = useFetch(apiUrl)
    const [state, setState] = useContext(CurrentUserContext)
    const [valueState, setValueState] = useState(false)
    const inputRef = useRef()

    const addToBase = () => {
        props.onclick(inputRef.current.value.charAt(0).toUpperCase() + inputRef.current.value.slice(1))
    }
    useEffect(()=>{
        props.state && doFetch({method: 'POST', body: JSON.stringify({name: props.state})})
        setValueState(true)
    },[props.state])

    useEffect(()=>{
        inputRef.current.value = ''
        setState({...state, updateGetProperties: !state.updateGetProperties})
    },[response])
    return (
        <div className="input-group mb-3">
            <input className="form-control"
                   ref={inputRef}
                   type={props.type}
                   name={props.name}
                   placeholder={props.placeholder}
            >
            </input>
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={addToBase}>add</button>
            </div>
        </div>
    )
}
export default InputButton