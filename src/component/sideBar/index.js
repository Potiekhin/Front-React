import React, {useContext, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import useFetch from "../../hooks/useFetch";
import Categories from "./categories";
import EditCategory from "./editCategory";
import {CurrentUserContext} from "../../contexts/currentUser";

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

export default function NestedList() {
    const [state, ] = useContext(CurrentUserContext)
    const classes = useStyles();
    const apiUrl = '/categories/'
    const [{response}, doFetch] = useFetch(apiUrl)


    useEffect(() => {
        doFetch({method: 'GET'})
    }, [state.editCategory])

    return (

        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            {(response !== null && !response.code) && <EditCategory category_list={response}/>}
            {(response !== null && !response.code) && response.map(category => <Categories
                key={category.id}
                category={category.name}
                id={category.id}
            />)}
        </List>

    )
}
