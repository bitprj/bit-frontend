import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import StudentHero from "../../../components/Student/StudentHero";
import CurrentTopics from "../unused/CurrentTopics";

// const P

const Content = styled.div`
  padding: 3% 5%;
  margin: 0 auto;
`;

class Progress extends Component {
  render() {
    return (
      <>
        <StudentHero for={"CURRENT"} />
        <Content>
          <CurrentTopics />
        </Content>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.studentData
  };
};

export default connect(mapStateToProps)(Progress);
