import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MainView from './components/main-view/main-view';

import './index.scss';

//Main component (will eventually use all the other components)
class IFlixApplication extends Component {
  render() {
    return (
      <div className="iflix">
        <MainView />
      </div>
    );
  }
}

//Find the root of app
const container = document.getElementsByClassName('app-container')[0];

//Tell React to render app in root DOM element
ReactDOM.render(React.createElement(IFlixApplication), container);