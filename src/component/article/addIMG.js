import React from "react";

export default function AddIMG(props) {
    const onImageChange = event => {
        props.setState(event.currentTarget.files[0])
    }
    return (
        <div>
            <input
                type="file"
                accept="image/*"
                multiple={false}
                onChange={onImageChange}
            />
            {/*<div>{`http://localhost:8000${props.defaultValue}`}</div>*/}
        </div>
    )
}