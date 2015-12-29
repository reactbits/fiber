import { compose, createStore } from 'redux';
import { persistState } from 'redux-devtools';
import DevTools from './devtools';
import { reducer } from './state';

const makeStore = compose(
  DevTools.instrument(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = makeStore(reducer);

export default store;
