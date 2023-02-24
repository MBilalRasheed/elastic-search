import { GET_ROLES } from "ActionsTypes";

const initialState: any = {
    data: {}
}

const getRoleListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ROLES: {
            state = { ...state, data: action.payload }
        }
            break;
    }
    return state
}

export default getRoleListReducer;