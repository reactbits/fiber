import {compose, createStore} from 'redux';
import {devTools, persistState} from 'redux-devtools';
import {reducer} from './state';

const finalCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(reducer);

export default store;
