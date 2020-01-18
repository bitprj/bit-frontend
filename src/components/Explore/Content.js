import React from "react";
import styled from "styled-components";

import FeaturedDisplay from "./FeaturedDisplay";
import TopicDisplay from "./TopicDisplay";

const Container = styled.div`
  padding-top: 2em;
  width: calc(100% - 20em);
`;

const HorzScroll = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  > div {
    flex: 0 0 auto;
    margin-right: 2em;
  }

  > div:last-child::before {
    content: "";
    margin-right: 3em;
    display: block;
    // width: 40em;
    height: 0.1px;
  }

  // /* added */
  // overflow-x: auto;
  // transform: rotate(-90deg) translateY(-10em);
  // transform-origin: 20em 10em;

  // > div {
  //   transform: rotate(90deg) translateX(10em);
  // }
`;

const Content = props => {
  return (
    <Container>
      <h1>{props.activeName}</h1>
      <HorzScroll>
        <FeaturedDisplay
          name="Simulating Nature with Algorithms"
          category="Algorithms"
          imgURL="https://i.imgur.com/I7DFnzE.png"
        />
        <FeaturedDisplay />
        <FeaturedDisplay bgColor="#333" />
      </HorzScroll>

      <HorzScroll>
        <TopicDisplay name="💻 DevOps" />
        <TopicDisplay name="🌎 Earth Day" />
      </HorzScroll>
    </Container>
  );
};

export default Content;
