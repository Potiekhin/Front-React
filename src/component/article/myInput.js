import React from "react";

export default function MyInput(props){

    return (
        <input className="form-control mb-3"
               ref={props.forwardRef}
               type={props.type}
               name={props.name}
               placeholder={props.placeholder}
               defaultValue={props.defaultValue ? props.defaultValue : ''}
        >
        </input>
    )
}