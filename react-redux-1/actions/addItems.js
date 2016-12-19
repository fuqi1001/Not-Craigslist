import { browserHistory } from "react-router"
const xss = require('xss');
let addItemsAction = {
    addPic: (file) => ({
        //console.log(file);
        type: 'ADD_PICTURE',
        file: file
    }),

    addText: (text) => ({
        //console.log(text);
        type: 'ADD_TEXT',
        text: text
    }),

    deleteAll: () => ({
        type: 'CLEAN_ALL'
    }),


    deletePic: (payload) => ({
        type: 'DELETE_PIC',
        payload: payload
    }),

    addPics: (file) => {
        var data = {}
        data.img = file[0];
        var form_data = new FormData();
        form_data.append('img', file[0]);
        return (dispatch, getState) => {
            dispatch(addItemsAction.addPic(file[0]));
        }
    },

    addContent: (text) => ({
        type: 'ADD_CONTENT',
        text: text
    }),

    addPrice: (text) => ({
        type: 'ADD_PRICE',
        text: text
    }),


    upload: () => (dispatch, getState) => {
        var form_data = new FormData();
        var value = getState().items;
        if (value.title == null || value.title.trim() == "" || value.content == null || value.content.trim() == "" || value.price == null || value.price.trim() == ""){
            alert("please input the required fields!");
            return;
        }
        value.pics.map(pic =>{
            form_data.append('img', pic.file);
        })
        // form_data.append('img', value.pics[0].file);
        form_data.append('title', xss(value.title));
        form_data.append('content', xss(value.content));
        form_data.append('price', xss(value.price));
        form_data.append('userId', "");
        form_data.append('creator', "");

        console.log(value)
        $.ajax({
            url: '/addPic',
            method: 'post',
            data: form_data,
            contentType: false,
            processData: false
        }).done(data => {
            console.log(data);
            dispatch(addItemsAction.deleteAll());
            //const browserHistory = require('react-router').browserHistory;
            //browserHistory.push('/');
            //window.location.href = "/";
            browserHistory.push('/');
        }).fail( xhr => {
            console.log(xhr);
        })
    }
};


export default addItemsAction;
