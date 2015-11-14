import {compose, applyMiddleware, createStore} from 'redux';
import {devTools, persistState} from 'redux-devtools';
import {reducer} from './state';

const finalCreateStore = compose(
  // middlewares
  // applyMiddleware(m1, m2, m3), // any redux middleware, e.g. redux-thunk
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(reducer);

export default store;
