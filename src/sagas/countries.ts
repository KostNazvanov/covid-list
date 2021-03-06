import { all, takeLatest } from 'redux-saga/effects';

import actions, { IPayload } from '../reducers/actions';
import { ICountries } from '../reducers/interfaces';
import { readStream } from '../helpers/utils';

function getCountries(payload: IPayload) {
  fetch('https://api.covid19api.com/countries')
    .then(response => response.body)
    .then(body => {
      if (!body) {
        actions.getCountriesFail({});
        return;
      }

      return readStream(body);
    })
    .then(stream => {
      // Respond with our stream
      return new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text();
    })
    .then(result => {
      const countries = JSON.parse(result) as ICountries;
      actions.getCountriesSuccess({ countries });
    });
}

export default function* watchForActions() {
  yield all([
    takeLatest('GET_COUNTRIES', getCountries),
  ])
}
