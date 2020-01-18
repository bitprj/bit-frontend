import React, { useState } from "react";
import styled from "styled-components";

import Sidebar from "../components/Explore/Sidebar";
import Content from "../components/Explore/Content";

import { sizes } from "../assets/styles/Media";

const Container = styled.div`
  display: flex;
  overflow-x: hidden;
  font-size: 80%;

  @media screen and (orientation: portrait) and (max-width: ${sizes.bigDesktop}px) {
    font-size: 100%;
  }
`;

const views = [
  {
    name: "👋 For You",
    topics: [{}, {}]
  },
  {
    name: "✏ Design",
    topics: [{}, {}]
  },
  {
    name: "📈 Statistics",
    topics: [{}, {}]
  },
  {
    name: "🐍 Python",
    topics: [{}, {}]
  },
  {
    name: "💻 Web Development ",
    topics: [{}, {}]
  },
  {
    name: "⚛️ Logic and Math",
    topics: [{}, {}]
  },
  {
    name: "📠 Machine Learning",
    topics: [{}, {}]
  }
];

const Explore = props => {
  const [activeName, setActiveName] = useState(views[0].name);

  return (
    <Container>
      <Sidebar
        views={views}
        activeName={activeName}
        setActiveName={setActiveName}
      />
      <Content views={views} activeName={activeName} />
    </Container>
  );
};

export default Explore;
