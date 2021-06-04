import React from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

import './Sidebar.css';
import { connect } from 'react-redux';
import { ICountries, IState } from '../../reducers/interfaces';

interface ISidebarProps {
  countries: ICountries;
}

const Sidebar = (props: ISidebarProps) => {
  return (
    <>
      <Nav
        className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey="/home"
      >
        <div className="sidebar-sticky"/>
        {props.countries.map(({ Country, Slug, ISO2 }) => (
          <Link key={ISO2} to={`/${Slug}`}>
            <Nav.Item >
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
