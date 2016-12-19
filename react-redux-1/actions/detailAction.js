/**
 * Created by qifu on 16/12/15.
 */
const prefix = 'detail/';

let getItemAction = {
    getItem: () => (dispatch, getState) => {

        $.ajax({
            url: '/getItem',
            method: 'get',
        }).done(data => {
            console.log(data);

            //window.location.href = "/";
        }).fail( xhr => {
            console.log(xhr);
        })
    }
};

export default getItemAction;