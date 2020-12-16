import React, {useContext} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import {makeStyles} from "@material-ui/core/styles";
import {CurrentUserContext} from "../../contexts/currentUser";


export default function SubCategories(props) {
    const [, setState] = useContext(CurrentUserContext)
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }));
    const classes = useStyles()

    const setSubCategoryId = () => {
        if (props.id) {
            setState(state => ({...state, subCategoryId: props.id}))
        }
    }
    return (

        <Collapse in={props.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                    <ListItemText onClick={setSubCategoryId} primary={props.sub_category}/>
                </ListItem>
            </List>
        </Collapse>
    )
}
