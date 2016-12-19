
//reducer其实也是个方法而已,参数是state和action,返回值是新的state
export default (state = {
                title: '',
                content: '',
                price: '',
                payload : -1,
                pics: [

                ]
            }, action) => {
    let newState ;
    switch (action.type) {
        case 'ADD_PICTURE':
            //console.log(action.file);
            newState = Object.assign({}, state, {
                payload : state.payload + 1,
                pics: [
                    ...state.pics,
                    {   
                        payload : state.payload + 1,
                        file: action.file
                    }
                ]
            });
            return newState;
        
        case 'ADD_TEXT':
            
            newState = Object.assign({}, state, {
                title: action.text
            });
            return newState;
        

        case 'ADD_CONTENT':
            
            newState = Object.assign({}, state, {
                content: action.text
            });
            return newState;

        case 'ADD_PRICE':
        
            newState = Object.assign({}, state, {
                price: action.text
            });
            return newState;

        case 'DELETE_PIC':
            newState = Object.assign({}, state, {
                payload : state.payload - 1,
                pics : [
                    ...state.pics.filter((value) => {
                        return value.payload != action.payload;
                    })
                    //splice(0, action.payload),
                ]
            });
            return newState;
        case 'CLEAN_ALL':
            newState = {
                title: '',
                content: '',
                price: '',
                payload : -1,
                pics: [

                ]
            }
            return newState;
        default:
            //console.log(1);
            return state;
    }
};