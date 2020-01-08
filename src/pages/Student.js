import React, { Component } from "react";
import { connect } from "react-redux";

import StudentHero from "../components/Student/StudentHero";
import StudentContent from "../components/Student/StudentContent";
import * as studentData from "../redux/actions/studentData";

class Student extends Component {
  componentDidMount() {
    this.props.onSetStudentData();
  }

  componentDidUpdate() {
    console.log("[Student Updated]");
    if (this.props.is_student_data_loaded) {
      if (!this.props.suggested_activity)
        this.props.onSetSuggestedActivity(this.props.current_activities[0].id);
      if (!this.props.current_track)
        this.props.onSetCurrentTrack(this.props.current_track_id);
      if (!this.props.current_topic)
        this.props.onSetCurrentTopic(this.props.current_topic_id);
    }
  }

  resumeClickedHandler() {
    // go to current lab
  }

  render() {
    return (
      <>
        <StudentHero resumeClicked={this.resumeClickedHandler} />
        <StudentContent />
      </>
    );
  }
}

const mapStateToProps = state => {
  return state.studentData;
};

const mapDispatchToProps = dispatch => {
  return {
    onSetStudentData: () => dispatch(studentData.initStudentData()),
    onSetSuggestedActivity: id => dispatch(studentData.initSuggestedActivity(id)),
    onSetCurrentTrack: id => dispatch(studentData.initCurrentTrack(id)),
    onSetCurrentTopic: id => dispatch(studentData.initCurrentTopic(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
