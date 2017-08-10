import { combineReducers } from 'redux';
import drawing from './drawing';
import mode from './mode';

export default combineReducers({
  drawing,
  mode,
});
