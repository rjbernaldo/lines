import { combineReducers } from 'redux';
import drawing from './drawing';
import mode from './mode';
import modal from './modal';

export default combineReducers({
  drawing,
  mode,
  modal,
});
