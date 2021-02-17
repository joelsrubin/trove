import React, { Component } from 'react';
import styled from 'styled-components';
import GlobalStyle from '../theme/globalStyle.js';
import Navigation from './Navigation.jsx';
import Main from './Main.jsx';
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props)
    this.getPage = this.getPage.bind(this);
    this.updateGallery = this.updateGallery.bind(this);
    this.state = {
      currentPage: 'dashboard',
      selectedGallery: '',
      user: 'peter',
      collections: []
    }
  }

  getPage(chosenPage) {
    this.setState({
      currentPage: chosenPage
    });
  }

  updateGallery(collection) {
    this.setState({
      selectedGallery: collection
    }, this.getPage('gallery'));
  }

  componentDidMount() {
    // if (this.state.user !== '') {
      axios.get(`/${this.state.user}`)
        .then(results => (
          this.setState({
            collections: results.data
          })
        ))
    // }
}


  render() {
    return (
      <div>
        <GlobalStyle/>
        <Navigation collections={this.state.collections} getPage={this.getPage} updateGallery={this.updateGallery}/>
        {/* <Main page={this.state.currentPage} /> */}
        {this.state.currentPage}
        {this.state.selectedGallery}
      </div>
    )
  }
}

export default App;