let initialState = {font : 15}
export default function fontReducer(state = initialState, action){
    let nextState

    switch (action.type) {
        case "REDUCE_FONT":
            nextState = {
                ...state,
                font : (state.font - 1 )
            }
            return nextState
    
        case "INCREASE_FONT":
                nextState = {
                    ...state,
                    font : (state.font + 1 )
                }
                return nextState

        default:
            return state;
    }

}