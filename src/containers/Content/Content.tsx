import React, { useEffect } from 'react';
import { RouterProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import { ICase, ICases, IState } from '../../reducers/interfaces';
import actions from '../../reducers/actions';
import './Content.css';
import { getDate } from '../../helpers/utils';

interface IContentProps extends RouterProps {
  cases: ICases;
}

const columns: {
  label: string;
  key: keyof ICase;
  content?: (item: ICase, index: number, allCases: ICases) => number | string;
}[] = [
  {
    label: 'Date',
    key: 'Date',
    content: (item) => getDate(new Date(item.Date).getTime()),
  },
  {
    label: 'Confirmed Cases',
    key: 'Confirmed',
    content: (item, index, allCases) => [...allCases]
      .splice(0, index + 1)
      .reduce((prevVal, { Confirmed, Recovered }) => prevVal + Confirmed - Recovered, 0)
  },
  {
    label: 'New Cases',
    key: 'Confirmed',
  },
  {
    label: 'Deaths',
    key: 'Deaths',
    content: (item, index, allCases) => [...allCases]
      .splice(0, index + 1)
      .reduce((prevVal, { Deaths }) => prevVal + Deaths, 0)
  },
  {
    label: 'New Deaths',
    key: 'Deaths',
  },
  {
    label: 'Active Cases',
    key: 'Active',
  },
  {
    label: 'Recovered Cases',
    key: 'Recovered',
  },
]

const Content = (props: IContentProps) => {
  useEffect(() => {
    actions.getCasesByCountry({ country: props.history.location.pathname.substr(1) });
  }, [props.history.location.pathname]);

  return (
    <Table>
      <thead>
        <tr>
          {columns.map(({ label, key }, index) => (
            <th key={key + label + index}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      {props.cases.map((item, index) => (
        <tr key={item.ID}>
          {columns.map(({ label, key, content }) => (
            <th key={key + label + index}>
              {content
                ? content(item, index, props.cases)
                : item[key]
              }
            </th>
          ))}
        </tr>
      ))}
    </Table>
  )
}

const mapStateToProps = (state: IState, props: RouterProps) => {
  const country = props.history.location.pathname.substr(1);
  const ISO2 = state.countries.find(({ Slug }) => country === Slug)?.ISO2;

  return {
    cases: state.cases
      .filter(({ CountryCode }) => CountryCode === ISO2)
      .sort((case1, case2) => case2.Date > case1.Date ? 1 : -1)
      .reverse(),
  };
}

export default withRouter(connect(mapStateToProps)(Content));
