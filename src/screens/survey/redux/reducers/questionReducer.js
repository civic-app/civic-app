import * as actionType from '../actions/ActionType';

const initialState = {}

const questionStatus = (state = initialState, action) => {
    let newState;
    switch(action.type){
      case actionType.LOAD_RESPONSE: {
        return newState = {
          ...state,
          ['question'+action.questionNum] : {
            response: action.payload
          }
        }
      }
      default:
        return state
    }
}

export default questionStatus;
