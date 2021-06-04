import React from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter, Link, RouterProps } from 'react-router-dom';

import './Sidebar.css';
import { connect } from 'react-redux';
import { ICountries, IState } from '../../reducers/interfaces';

interface ISidebarProps extends RouterProps {
  countries: ICountries;
}

const Sidebar = (props: ISidebarProps) => {
  return (
    <>
      <Nav
        className="sidebar"
        activeKey="/home"
      >
        <div className="sidebar-sticky"/>
        {props.countries.map(({ Country, Slug, ISO2 }) => (
          <Link key={ISO2} to={`/${Slug}`}>
            <Nav.Item className={('/' + Slug) === props.history.location.pathname ? 'nav-item--selected' : ''}>
              {Country}
            </Nav.Item>
          </Link>
        ))}
      </Nav>
    </>
  );
};

const mapStateToProps = (state: IState) => ({ countries: state.countries });

export default withRouter(connect(mapStateToProps)(Sidebar));
