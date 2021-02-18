import React, { Component } from 'react';
import styled from 'styled-components';
import GlobalStyle from '../theme/globalStyle.js';
import Navigation from './Navigation.jsx';
import Form from "./Form.jsx";
import CreateCollection from "./CreateCollection.jsx";
import Gallery from "./Gallery.jsx";
import Dashboard from "./Dashboard.jsx";
import axios from 'axios';

const Container = styled.div`
  width: 90%;
  margin: 1em auto;
  margin-top: 2em;
`;

class App extends Component {
  constructor(props) {
    super(props)
    this.getPage = this.getPage.bind(this);
    this.updateGallery = this.updateGallery.bind(this);
    this.deleteCollection = this.deleteCollection.bind(this);
    this.getUserCollections = this.getUserCollections.bind(this);
    this.addCollection = this.addCollection.bind(this);
    this.state = {
      currentPage: '',
      selectedGallery: '',
      user: 'peter',
      collections: [],
      currentCollection: []
    }
  }

  getPage(chosenPage) {
    this.setState({
      currentPage: chosenPage
    });
  }

  updateGallery(collection) {
    axios.get(`/${this.state.user}/${collection}`)
      .then(results => {
        console.log(results)
        this.setState({
          selectedGallery: collection,
          currentCollection: results.data
        }, this.getPage('gallery'));
    })
  }


  getUserCollections() {
    axios.get(`/${this.state.user}`)
      .then(results => {
        this.setState({
          collections: results.data
        })
      })
    }

    deleteCollection() {
      axios.delete(`/${this.state.user}/${this.state.selectedGallery}`)
        .then(results =>
          this.setState({
            collections: results.data,
            currentPage: ''
          })
      )
    }

  addCollection(metaData) {
    axios.post(`/newcollection`, metaData)
      .then(results =>
        this.setState({
          collections: results.data,
        }, ()=> {this.updateGallery(metaData.name)})
      )
  }

  componentDidMount() {
    this.getUserCollections()
}


  render() {

    return (
      <div>
        <GlobalStyle/>
        <Navigation collections={this.state.collections} getPage={this.getPage} updateGallery={this.updateGallery} />
        <Container>
          {this.state.currentPage === '' ? <Dashboard user={this.state.user}/> : ''}
          {this.state.currentPage === 'createCollection' ? <CreateCollection getUserCollections={this.getUserCollections} addCollection={this.addCollection}/> : ''}
          {this.state.currentPage === 'addItem' ? <Form selectedGallery={this.state.selectedGallery} user={this.state.user} /> : ''}
          {this.state.currentPage === 'gallery' ? <Gallery collection={this.state.currentCollection} deleteCollection={this.deleteCollection} getPage={this.getPage} selectedGallery={this.state.selectedGallery}/> : ''}
          {/* {`${this.state.currentPage} ${this.state.selectedGallery}`} */}
        </Container>
      </div>
    )
  }
}

export default App;