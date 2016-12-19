import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone';
import { Link } from 'react-router';

class Item extends Component {

  handleTitleChange(event) {
    this.props.addActions.addText(event.target.value);
  }

  handleContentChange(event) {
    this.props.addActions.addContent(event.target.value);
  }

  handlePriceChange(event) {
    this.props.addActions.addPrice(event.target.value);
  }
  
  render() {
    
    const {items, addActions} = this.props;

    return (
      <div className="add-item-form">
            <div className="text-field-box">
                <div className="form-unit"><span className="label-text">title: </span><input type='text' required="required" onChange={this.handleTitleChange.bind(this)}/></div>
                <div className="form-unit"><span className="label-text">content: </span><input type='text' required="required" onChange={this.handleContentChange.bind(this)}/></div>
                <div className="form-unit"><span className="label-text">price: </span><input type='text' required="required" onChange={this.handlePriceChange.bind(this)}/></div>
            </div>
            <div className="drop-box">
                <Dropzone
                    multiple={false}
                    accept="image/*"
                    onDrop={addActions.addPics}>
                    <p>Drop an image or click to select a file to upload.</p> 
                </Dropzone>
            </div>
            <div>
                {
                    items.pics.length > 0 ?
                        items.pics.map(pic =>
                            <div  className="image-thumb" key = {pic.file.preview}>
                                <img src={pic.file.preview} />
                                <button  className="image-fav" onClick={() => addActions.deletePic(pic.payload)}></button>
                            </div>
                            // <img 
                            // key = {pic.file.preview}
                            // src = {pic.file.preview} height="42" width="42"/>
                        ) : null
                }
            </div>
            <input className="click-btn" type="submit" value="Submit" onClick={addActions.upload} required="required" />
            <button className="click-btn-back"><Link to={"/"}>back</Link></button>
      </div>
    )
  }
}


export default Item