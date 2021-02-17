import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';


class Form extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileInput = React.createRef();
    this.state = {
      name: '',
      type: ''
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData();
    fd.append('image', this.fileInput.current.files[0], this.fileInput.current.files[0].name)
    fd.append('name', this.state.name);
    fd.append('type', this.state.type)
    axios.post('/new', fd)
    .then(res => console.log(res))
    // event.preventDefault();
    // console.log(
    //   this.fileInput.current.files[0]
    // );
  }

  render() {
    return (
      <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
        <label>
          name<br></br>
          <input type="text" name="name" onChange={this.handleChange} autoComplete="off"/>
        </label>
        <label>
          type<br></br>
          <input type="text" name="type" onChange={this.handleChange} autoComplete="off"/>
        </label>
          <input type="file" name="image" ref={this.fileInput} />
        <button type="submit">Submit</button>
       </form>
    )
  }
}

export default Form;