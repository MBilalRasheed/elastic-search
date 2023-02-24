import { GET_ROLES } from 'ActionsTypes';
import axios from 'axios';

export const getRoleList = () => {
    return async (dispatch) => {
        let query: any = {
            "match_phrase": {
                "entityState.itemID": { "query":  5 }
            }
        }
        const getAllRole = await axios.post('http://localhost:3000/searchRoles', {
            from: 0,
            size: 20,
            query: query
        })
        let hitsList = [];
        if (getAllRole && getAllRole.data) {
            const { hits: { hits: myHits } } = getAllRole.data
            for (let i = 0; i < myHits.length; i++) {
                hitsList.push(myHits[i]._source);
            }
            dispatch({ type: GET_ROLES, payload: hitsList })
        }

    }
}

export const filterResultsHandler = (searchItem: String) => {
    return async (dispatch) => {
        let query: any = {
            "bool": {
                "should": [
                    { "match_phrase": { "name": searchItem } },
                    { "match_phrase": { "description": searchItem } },
                ]
            }
        }
        if(searchItem === '') {
            query = { match_all: {} }
        }
        const response = await axios.post('http://localhost:3000/searchRoles', {
            from: 0,
            size: 20,
            "query": query
        });
        debugger
        if (response && response.data) {
            let hitsList = []
            const { hits: { hits: myHits } } = response.data
            for (let i = 0; i < myHits.length; i++) {
                hitsList.push(myHits[i]._source);
            }
            dispatch({ type: GET_ROLES, payload: hitsList })
        }
    }
}

export const showDeletedHandler = (deleted: Boolean) => {
    return async (dispatch) => {
        let query: any = {
            "match_phrase": {
                "entityState.itemID": { "query": deleted ? 7 : 5 }
            }
        }
        const response = await axios.post('http://localhost:3000/searchRoles', {
            from: 0,
            size: 20,
            "query": query
        });
        if (response && response.data) {
            let hitsList = []
            const { hits: { hits: myHits } } = response.data
            for (let i = 0; i < myHits.length; i++) {
                hitsList.push(myHits[i]._source);
            }
            dispatch({ type: GET_ROLES, payload: hitsList })
        }
    }
}