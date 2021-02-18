import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';
import shortid from 'shortid';



class CreateCollection extends Component {
  constructor(props) {
    super(props)
    this.user = 'peter';
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: ''
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = this.state.name;
    const metaData = {
      user: this.user,
      name: name
    }
    this.setState({
      name: ''
    }, () => { this.props.addCollection(metaData) })
  }

  render() {
    return (
    <form onSubmit={this.handleSubmit}>
        <label>
        Add a new collection:
        <input type="text" name="name" onChange={this.handleChange} autoComplete="off" value={this.state.name}/>
        </label>
        <button type="submit">Submit</button>
        </form>

    )
  }
}

export default CreateCollection;