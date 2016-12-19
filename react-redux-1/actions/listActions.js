/**
 * Created by qifu on 16/12/16.
 */
const prefix = 'productList/';

let actions = {
    initProducts: () => (dispatch, getState) => {
        $.ajax({
            url: '/getItem',
            method: 'get'
        }).done(data => {
            dispatch(actions.changeProductListState(data));
        }).fail( xhr => {
            dispatch({
                type: 'FAIL_INIT_PRODUCTS',
                payload: new Error(xhr.responseText) ,
                error: true
            });
        });
    },

    changeProductListState: products => ({
        type: 'products/INIT_PRODUCTS',
        payload: products
    }),
};

export default actions;