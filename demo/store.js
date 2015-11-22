import {compose, createStore} from 'redux';
import {devTools, persistState} from 'redux-devtools';
import {reducer} from './state';

const makeStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = makeStore(reducer);

export default store;
