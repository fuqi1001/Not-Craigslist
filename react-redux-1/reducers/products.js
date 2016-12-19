/**
 * Created by qifu on 16/12/16.
 */
export default (state = {
    products: []
}
    , action) => {
    let newState;

    switch (action.type) {
        case 'products/INIT_PRODUCTS':
            newState = Object.assign({}, state, {
                products: action.payload
            });
            return newState;

        default:
            return state
    }
}