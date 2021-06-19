import React from 'react';
import { connect } from 'react-redux';

import { setFilter } from '../../redux/actions/actions';

import Form from 'react-bootstrap/Form';
import './visibility-filter-input.scss';


function VisibilityFilterInput(props) {
  return (
    <div className="filter">
      <Form.Control
        onChange={(e) => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="Search Movie Title"
      />
    </div>
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);

