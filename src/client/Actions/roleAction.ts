import { GET_ROLES } from 'ActionsTypes';
import axios from 'axios';

export const getRoleList = () => {
    return async (dispatch, getState) => {
        const getAllRole = await axios.post('http://localhost:3000/searchRoles', {
            from: 0,
            size: 20,
            query: { match_all: {} }
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