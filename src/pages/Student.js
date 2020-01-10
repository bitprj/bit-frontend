import React, { Component } from "react";
import { connect } from "react-redux";

import StudentHero from "../components/Student/StudentHero";
import StudentContent from "../components/Student/StudentContent";
import * as studentData from "../redux/actions/studentData";

class Student extends Component {
  componentDidMount() {
    this.props.onInitStudentData();
  }

  componentDidUpdate() {
    console.log("[Student Updated]");
    if (this.props.is_student_data_loaded) {
      if (!this.props.suggested_activity)
        this.props.onInitSuggestedActivity(this.props.current_activities[0].id);
      if (!this.props.current_track)
        this.props.onInitCurrentTrack(this.props.current_track_id);
      if (!this.props.current_topic)
        this.props.onInitCurrentTopic(this.props.current_topic_id);
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
    onInitStudentData: () => dispatch(studentData.initStudentData()),
    onInitSuggestedActivity: id => dispatch(studentData.initSuggestedActivity(id)),
    onInitCurrentTrack: id => dispatch(studentData.initCurrentTrack(id)),
    onInitCurrentTopic: id => dispatch(studentData.initCurrentTopic(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
 