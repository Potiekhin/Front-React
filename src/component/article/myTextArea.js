import React from "react";

export default function MyTextArea(props){
    return(
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1"></label>
            <textarea
                className="form-control"
                placeholder={props.placeholder}
                ref={props.forwardRef}
                name={props.name}
                defaultValue={props.defaultValue ? props.defaultValue : ''}
                id="exampleFormControlTextarea1"
                rows="3">

            </textarea>


        </div>

    )
}