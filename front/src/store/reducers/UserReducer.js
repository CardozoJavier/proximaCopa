const initialState = {}
export default (state = initialState, action) => {
    switch(action.type){
        case 'LOG_A_USER':
            return Object.assign({}, state, action.user);   
        case 'LOGOUT_USER':
            return Object.assign({}, state, action.user);   
        
        default:
            return state;
    }
}


