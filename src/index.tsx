import * as React from "react";
import * as ReactDOM from "react-dom";
import './css/style.scss';
import App from "./js/components/app/app";
import {createStore, applyMiddleware} from "redux";
import reducer from "./js/reducer/reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware()
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  ,
  document.querySelector(`#root`)
);
