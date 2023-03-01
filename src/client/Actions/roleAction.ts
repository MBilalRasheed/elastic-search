import { GET_ROLES } from 'ActionsTypes';
import axios from 'axios';
import { IRoleDef,Dispatch } from '../Types/Domain/Role'
const baseUrl = process.env.REACT_APP_BASE_URL;

export const getRoleList = () => {
    return async (dispatch: Dispatch) => {
        let query: any = {
            "match_phrase": {
                "entityState.itemID": { "query": 5 }
            }
        }
        getRoleListHandler(dispatch, query);
    }
}

export const filterResultsHandler = (searchItem: String) => {
    return async (dispatch: Dispatch) => {
        let query: any = {
            "bool": {
                "should": [
                    { "match_phrase": { "name": searchItem } },
                    { "match_phrase": { "description": searchItem } },
                ]
            }
        }
        if (searchItem === '') {
            query = {
                "match_phrase": {
                    "entityState.itemID": { "query": 5 }
                }
            }
        }
        getRoleListHandler(dispatch, query);
    }
}

export const showDeletedHandler = (deleted: Boolean) => {
    return async (dispatch: Dispatch) => {
        let query: any = {
            "match_phrase": {
                "entityState.itemID": { "query": deleted ? 7 : 5 }
            }
        }
        getRoleListHandler(dispatch, query);
    }
}

const getRoleListHandler = async (dispatch, query) => {
    const response = await axios.post(`${baseUrl}/searchRoles`, {
        from: 0,
        size: 20,
        "query": query
    });
    if (response && response.data) {
        let hitsList: IRoleDef[] = [];
        const { hits: { hits: myHits } } = response.data
        for (let i = 0; i < myHits.length; i++) {
            hitsList.push(myHits[i]._source);
        }
        dispatch({ type: GET_ROLES, payload: hitsList })
    }
}