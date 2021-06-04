import { all, takeLatest } from 'redux-saga/effects';

import actions, { IPayload } from '../reducers/actions';
import { ICases } from '../reducers/interfaces';
import { readStream } from '../helpers/utils';

function getCasesByCountry(payload: IPayload) {
  fetch(`https://api.covid19api.com/live/country/${payload.country}/status/confirmed`)
    .then(response => response.body)
    .then(body => {
      if (!body) {
        actions.getCasesByCountryFail({});
        return;
      }

      return readStream(body);
    })
    .then(stream => {
      // Respond with our stream
      return new Response(stream, { headers: { 'Content-Type': 'text/html' } }).text();
    })
    .then(result => {
      const cases = JSON.parse(result) as ICases;
      actions.getCasesByCountrySuccess({ cases });
    });
}

export default function* watchForActions() {
  yield all([
    takeLatest('GET_CASES_BY_COUNTRY', getCasesByCountry),
  ])
}
