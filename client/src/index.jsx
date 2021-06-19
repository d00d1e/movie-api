import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import moviesApp from './redux/reducers/reducers';

import MainView from './components/main-view/main-view';

import './index.scss';


const store = createStore(moviesApp);

//Main component (will eventually use all the other components)
class IFlixApplication extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainView/>
      </Provider>
    );
  }
}

//Find the root of app
const container = document.getElementsByClassName('app-container')[0];

//Tell React to render app in root DOM element
ReactDOM.render(React.createElement(IFlixApplication), container);