import React, { Component } from "react";
import { connect } from "react-redux";

import MenuBar from "./MenuBar";
import Curriculum from "./Curriculum/Curriculum";
import Activity from "./Activity/Activity";
import Progress from "./Progress/Progress";
import Module from "./Progress/Module";
import Profile from "./Profile/Profile";

import * as viewTypes from "../../redux/utils/viewTypes";

class StudentContent extends Component {
  handleCurrentView() {
    switch (this.props.currentView) {
      case viewTypes.CURRICULUM:
        return <Curriculum />;

      case viewTypes.ACTIVITY:
        return <Activity />;

      case viewTypes.PROGRESS:
        return <Module />;
        return <Progress />;
      case viewTypes.PROGRESS_MODULE:

      case viewTypes.PROFILE:
        return <Profile />;
      default:
        return null;
    }
  }

  render() {
    return (
      <>
        <MenuBar currentView={this.props.currentView} />

        {this.handleCurrentView()}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentView: state.viewManager.current_view_student
  };
};

export default connect(mapStateToProps)(StudentContent);
