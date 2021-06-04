import React, { useEffect } from 'react';
import { RouterProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import { ICase, ICases, IState } from '../../reducers/interfaces';
import actions from '../../reducers/actions';

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
  },
  {
    label: 'Confirmed Cases',
    key: 'Confirmed',
  },
  {
    label: 'New Cases',
    key: 'Confirmed',
  },
  {
    label: 'Deaths',
    key: 'Deaths',
  },
  {
    label: 'New Deaths',
    key: 'Confirmed',
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
  console.log(props.cases);

  useEffect(() => {
    actions.getCasesByCountry({ country: props.history.location.pathname.substr(1)});
  }, [props.history.location.pathname]);

  return (
    <Table>
      <thead>
      <tr>
        {columns.map(({ label, key}, index) => (
          <th key={key + label + index}>
            {label}
          </th>
        ))}
      </tr>
      {props.cases.map(item => (
        <tr key={item.ID}>
          {columns.map(({ label, key, content }, index) => (
            <th key={key + label + index}>
              {content
                ? content(item, index, props.cases)
                : item[key]
              }
            </th>
          ))}
        </tr>
      ))}
      </thead>
    </Table>
  )
}

const mapStateToProps = (state: IState, props: RouterProps) => {
  const country = props.history.location.pathname.substr(1);
  const ISO2 = state.countries.find(({ Slug }) => country === Slug)?.ISO2;

  return {
    cases: state.cases.filter(({ CountryCode }) => CountryCode === ISO2),
  };
}

export default withRouter(connect(mapStateToProps)(Content));
