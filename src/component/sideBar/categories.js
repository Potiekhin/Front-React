import React, {useContext, useEffect} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import SubCategories from "./subCategories";
import useFetch from "../../hooks/useFetch";
import EditSubCategory from "./editSubCategory";
import {CurrentUserContext} from "../../contexts/currentUser";

export default function Categories(props) {
    const [open, setOpen] = React.useState(false);
    const apiUrl = `/categories/sub_category/${props.id}`
    const [{response}, doFetch] = useFetch(apiUrl)
    const [state, ] = useContext(CurrentUserContext)

    const handleClick = () => {
        setOpen(!open);
    };
    useEffect(() => {
        doFetch({method: 'GET'})
    }, [state.editSubCategory])
      return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={props.category}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            {
                open &&
                (response !== null && !response.code) && <EditSubCategory sub_category_list={response} category_id={props.id}/>
            }
            {(response !== null && !response.code) && response.map(sub_category => <SubCategories
                    key={sub_category.id}
                    open={open}
                    sub_category={sub_category.name}
                    id={sub_category.id}
                />)}
        </>
    )
}

