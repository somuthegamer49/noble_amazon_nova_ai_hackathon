import { legacy_createStore as createStore } from 'redux'; // Use legacy_createStore
import stateReducer from './reducer';

const store = createStore(stateReducer);

export default store;
