// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FileLogActions from '../actions/fileLog';
import Home from '../components/Home';

class HomePage extends Component {
  render() {
    return <Home {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    ...state.fileLog
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FileLogActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
