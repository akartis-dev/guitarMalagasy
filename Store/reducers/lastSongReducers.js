const init = {lastSong : []}

export default function lastSongReducers(state = init, action){

    let nextState
    //state.lastSong.length = 5
    switch (action.type) {
        case "LAST_SONG":
            const isLast = state.lastSong.findIndex(element => element.id === action.value.id)
            if(isLast === -1){
                //si on l'a pas encore dans notre tableau on ajoute, si il est deja dans le tableau on ne fais rien
                //notre tableau doit contenir que 5 element
                if(state.lastSong.length > 7){
                    state.lastSong.length = 7
                }
                nextState = {
                    ...state,
                    lastSong : [action.value, ...state.lastSong]
                }
                if(nextState.lastSong.length > 7){
                    nextState.lastSong.length = 7
                }
            }
            return nextState || state
    
        default:
            return state
    }
}