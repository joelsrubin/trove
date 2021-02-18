import React, { Component } from "react";
import styled from "styled-components";
// import Dropdown from './Dropdown.jsx';
import shortid from "shortid";

const Navbar = styled.div`
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 2em;
  border-bottom: #cacaca solid 1px;

  h2 {
    margin: 0;
    display: block;
    /* width: 20%; */
    text-align: center;
  }

  div {
    width: 40%;
    text-align: right;
    /* background-color: red; */
  }
`;

const Logo = styled.h2`
cursor: pointer;
`

const Drop = styled.div`
  position: relative;
`

const Dropdown = styled.ul`
  position: absolute;
  background: white;
  border: solid black 1px;
  top: 60px;

  li {
    margin: 10px;
    padding: 10px;
    text-align: center;
  }
`

const Links = styled.ul`
  display: flex;
  li {
    margin: 0 20px;
  }

  &:hover {
    cursor: pointer;
  }
`;

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.updateGallery = this.props.updateGallery;
    this.getPage = this.props.getPage;
    this.dropDown = this.dropDown.bind(this)
    this.closeDropDown = this.closeDropDown.bind(this)
    this.selectCollection = this.selectCollection.bind(this)
    this.state = {
      dropdown: false
    }
  }


  dropDown() {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }

  closeDropDown(cb) {
    this.setState({
      dropdown: false
    })
    cb()
  }

  selectCollection(item) {
    this.dropDown(false);
    this.updateGallery(item);
  }

  render(){
    return (
    <Navbar>
        <Logo onClick={() => { this.closeDropDown(() => { this.getPage('') })}}>[ trove ]</Logo>
      <div>
        <Links>
          <li onClick={() => { this.closeDropDown(()=>{this.getPage('createCollection')})}}>create new</li>
          <li><div onClick={this.dropDown}>
            your_collections
            {this.state.dropdown ? <Dropdown>{this.props.collections.map(item => <li key={shortid.generate()} onClick={() => { this.selectCollection(item)}}>{item}</li>)}</Dropdown>: ''}
            </div></li>
        </Links>
      </div>
      <div>
        <i className="fas fa-search"></i>
      </div>
    </Navbar>
  );
  }
}


export default Navigation;
