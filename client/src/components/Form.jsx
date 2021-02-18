import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Input from './Input.jsx';
import shortid from "shortid";


const Container = styled.div`
  width: 90%;
  margin: 1em auto;
`;

const Title = styled.div`
  width: 20%;
  margin: 1em auto;
  text-align:center;
`;

const AddLabelForm = styled.form`
  margin-top: 4em;
`;

const Button = styled.button`
  width: 100%;
`;

class Form extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addLabel = this.addLabel.bind(this);
    this.handleMoreChange = this.handleMoreChange.bind(this);
    this.fileInput = React.createRef();
    this.state = {
      currentLabel: '',
      labels: [{name: ''}]
    }
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleMoreChange(event) {
    console.log('chenge')
    const currentLabels = this.state.labels;
    currentLabels[event.target.name] = event.target.value
    this.setState({
      labels: currentLabels
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target[0].value)
    const formData = new FormData();
    formData.append('image', this.fileInput.current.files[0], this.fileInput.current.files[0].name)
    this.state.labels.forEach(label => {
      let i = Object.keys(label)[0]
      formData.append(String(i), document.getElementById(String(i)).value);
    })
    axios.put(`/${this.props.user}/${this.props.selectedGallery}`, formData)
    .then(res => console.log(res))
  }

  addLabel(event) {
    event.preventDefault();
    let labels = this.state.labels;
    let obj = {};
    let name = this.state.currentLabel
    obj[name] = '';
    labels.push(obj);
    this.setState({
      labels: labels,
      currentLabel: ''
    }, () => { console.log(labels) });
  }

  submitLabel() {

  }

  render() {
    return (
      <div>
        <Title>Add item to {this.props.selectedGallery}</Title>

        <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
        <input type="file" name="image" ref={this.fileInput} />
        {this.state.labels.map(label => (
          <Input label={label} handleChange={this.handleMoreChange} key={shortid.generate()} labels={this.state.labels}/>
        ))}
          <Button type="submit">Submit</Button>
        </form>

        <AddLabelForm onSubmit={this.addLabel}>
          <input type="text" name="currentLabel" onChange={this.handleChange} value={this.state.currentLabel} />
          <Button type="submit">add label</Button>
        </AddLabelForm>
      </div>
    )
  }
}

export default Form;