import React, { ChangeEvent, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter, Link, RouterProps } from 'react-router-dom';

import './Sidebar.css';
import { connect } from 'react-redux';
import { ICountries, IState } from '../../reducers/interfaces';

interface ISidebarProps extends RouterProps {
  countries: ICountries;
}

const Sidebar = (props: ISidebarProps) => {
  const [filter, setFilter] = useState<string>('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value.toLowerCase());
  }

  return (
    <Nav
      className="sidebar"
      activeKey="/home"
    >
      <div className="sidebar__filter">
        <input
          className="sidebar__filter-input"
          onChange={onChange}
          value={filter}
        />
        <button
          className="sidebar__filter-button"
          onClick={() => setFilter('')}
        >
          X
        </button>
      </div>
      {/* TODO Make 'loading' placeholder, while countries are loading */}
      {props.countries.map(({ Country, Slug, ISO2 }) => Country.toLowerCase().includes(filter) && (
        <Link key={ISO2} to={`/${Slug}`}>
          <Nav.Item className={('/' + Slug) === props.history.location.pathname ? 'nav-item--selected' : ''}>
            {Country}
          </Nav.Item>
        </Link>
      ))}
    </Nav>
  );
};

const mapStateToProps = (state: IState) => ({ countries: state.countries });

export default withRouter(connect(mapStateToProps)(Sidebar));
