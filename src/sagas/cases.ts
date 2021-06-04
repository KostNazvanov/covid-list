import { all, takeLatest } from 'redux-saga/effects';

import actions, { IPayload } from '../reducers/actions';
import { ICases } from '../reducers/interfaces';
import { readStream } from '../helpers/utils';

function getCasesByCountry(payload: IPayload) {
  // FIXME Fetched data is not complete. Some info is missing. But it's present on Premium endpoint
  // https://api.covid19api.com/premium/country/${payload.country}
  // TODO make better approach, so data can be fetched from starting date
  // TODO code is mostly copied from countries.ts file. Create function for this fetch
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
