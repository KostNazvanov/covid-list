import { all } from 'redux-saga/effects';

import actions from '../reducers/actions';

import countries from './countries';
import cases from './cases';

export default function* watchAll() {
  try {
    yield all([
      countries(),
      cases(),
    ]);
  } catch(error) {
    console.error(error);
    actions.setError({ error });
  }
}
