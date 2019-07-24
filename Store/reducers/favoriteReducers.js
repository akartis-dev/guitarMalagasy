const initialState = {favoriteChant : []}

function favoriteReducer(state = initialState, action){
    let newState

    switch (action.type) {
        case "toogleFavorite":
            let contain = state.favoriteChant.findIndex((element) => element.id === action.value.id)
            if(contain !== -1){
                //la le tableau contient deja notre favorite, alors on le supprime
                newState = {
                    ...state,
                    favoriteChant : state.favoriteChant.filter(element => element.id !== action.value.id)
                }
            }else{
                //on ajoute
                newState = {
                    ...state,
                    favoriteChant : [ action.value, ...state.favoriteChant]
                }
            }
            return newState
    
        default:
            return state
    }

    /**
     * On va verifier si notre chanson est deja dans notre favorite, si oui on l'enleve, si non, on ajoute
     * on passe uniquement l'id de notre chanson
     */
}

export default favoriteReducer