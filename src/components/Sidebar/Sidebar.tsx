import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';
import actions from '../../reducers/actions';

import './Sidebar.css';
import { connect } from 'react-redux';
import { ICountries, IState } from '../../reducers/interfaces';

interface ISidebarProps {
  countries: ICountries;
}

const Sidebar = (props: ISidebarProps) => {
  useEffect(() => {
    actions.getCountries({});
  }, []);

  return (
    <>
      <Nav
        className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey="/home"
        onSelect={selectedKey => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky"/>
        {props.countries.map(({ Country, Slug, ISO2 }) => (
          <Nav.Item key={ISO2}>
            <Nav.Link href={`/${Slug}`}>{Country}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </>
  );
};

const mapStateToProps = (state: IState) => ({ countries: state.countries });

export default withRouter(connect(mapStateToProps)(Sidebar));
