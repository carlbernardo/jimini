import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class ItemForm extends React.Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getItemnameRef = this.getItemnameRef.bind(this);
    this.getCategoryRef = this.getCategoryRef.bind(this);
    this.getMessageRef = this.getMessageRef.bind(this);
    this.getUrlRef = this.getUrlRef.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      itemname: '',
      category: '',
      message: '',
      url: ''
    }
  }

  getItemnameRef(ref){
    this.itemnameRef = ref;
  }

  getCategoryRef(ref){
    this.categoryRef = ref;
  }

  getMessageRef(ref){
    this.messageRef = ref;
  }

  getUrlRef(ref){
    this.urlRef = ref;
  }

  handleSubmit(e){
    e.preventDefault();
    let username = this.props.userInfo.username;
    let itemname = this.itemnameRef.value;
    let category = this.categoryRef.value;
    let url = this.urlRef.value;
    let message = this.messageRef.value;
    let self = this;

    $.ajax({
      url: '/wishlist',
      type: 'POST',
      contentType: 'application/json',
      dataType:'json',
      data: JSON.stringify({
        username: username,
        wishname: itemname,
        category: category,
        link: url,
        description: message
      }),
      success: function(data){
        self.props.updateWishlist(data);
      },
      error: function(err){
        console.log('error posting to wishlist: ', err);
      }
    });

    this.itemnameRef.value = '';
    this.categoryRef.value = '';
    this.urlRef.value = '';
    this.messageRef.value = '';
  }

  handleChange(e){
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(e.target.value.length);

    let urlChecker = e.target.name === 'url'
      && e.target.value[0] === 'h'
      && e.target.value[1] === 't'
      && e.target.value[2] === 't'
      && e.target.value[3] === 'p'
      && e.target.value[4] === 's'
      && e.target.value[5] === ':'
      && e.target.value[6] === '/'
      && e.target.value[7] === '/'

    console.log(urlChecker);
  }

  render(){
    return (
      <form ref='form'>
          <label>Item</label>
          <input type='text' name='itemname' className='form-control' placeholder='Item Name' ref={this.getItemnameRef} onChange={this.handleChange} />
        <div className='form-group'>
          <label>Category</label>
          <input type='text' name='category' className='form-control' placeholder='Category' ref={this.getCategoryRef} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <label>Message</label>
          <input type='text' name='message' className='form-control' placeholder='Message' ref={this.getMessageRef} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <label>Link</label>
          <input type='url' name='url' className='form-control' placeholder='Enter URL Here' ref={this.getUrlRef} onChange={this.handleChange} />
        </div>
        <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
}

export default ItemForm;
