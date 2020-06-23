//reducer is a fun that has 2 properties, a state object which represents the last state, then it receives the action which is the object that has string type value, it tells us what specifc action to take
import UserActionTypes from './user.types';
const INITIAL_STATE = {
    currentUser: null,
    error: null
}

const userReducer = (state = INITIAL_STATE, action) => {// state=INITIAL_STATE is the es6 feature, we set the STATE to the default parameter value, it means if the state is ever undefined or its not set it fallback to the initial state
    switch(action.type) {
        // case UserActionTypes.SET_CURRENT_USER:
        //     return {
        //         ...state, // it represents a new state of object to return
        //         currentUser: action.payload
        //     }
        case UserActionTypes.SIGN_IN_SUCCESS: //these 2 actions have to do the same action, so intead of writing that separatelan merge that together
        // case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
        case UserActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserActionTypes.SIGN_IN_FAILURE: //these 2 actions have to do the same action, so intead of writing that separatelan merge that together
        // case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }
        default:
            return state;
    }
}
export default userReducer;