import React, { useEffect } from 'react';
import { RouterProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ICases, IState } from '../../reducers/interfaces';
import actions from '../../reducers/actions';

interface IContentProps extends RouterProps {
  cases: ICases;
}

const Content = (props: IContentProps) => {
  console.log(props.cases);

  useEffect(() => {
    actions.getCasesByCountry({ country: props.history.location.pathname.substr(1)});
  }, [props.history.location.pathname]);

  return (
    <div>
      Content
    </div>
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
