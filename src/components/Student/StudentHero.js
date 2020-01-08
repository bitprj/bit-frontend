import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
// import { Box, Grid } from 'grommet';
import Grid from "@material-ui/core/Grid";

import GreetingSection from "./GreetingSection";
import ActivityCard from "./Progress/ActivityCard";

const Hero = styled.div`
  background-color: #0b1330;
  color: white;
  margin: 0 -8px;
  padding: 40px;
`;

const StudentHero = props => {
  return (
    <Hero>
      <Grid container spacing={0}>
        <Grid item xs>
          <GreetingSection
            title={`Hello ${props.studentName} `}
            subtitle="Welcome Back!"
          />
        </Grid>

        <Grid item xs={5}>
          <ActivityCard
            type="CURRENT"
            buttonState="Resume"
            buttonClass="button invert"
            buttonClicked={() => props.resumeClicked}
          />
        </Grid>
      </Grid>
    </Hero>
  );
};

const mapStateToProps = state => {
  const studentData = state.studentData;
  if (!studentData.is_student_data_loaded) {
    return {
      studentName: ""
    };
  }
  return {
    studentName: studentData.name
  };
};

export default connect(mapStateToProps)(StudentHero);
