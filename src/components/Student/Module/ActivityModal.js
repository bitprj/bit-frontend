import React from "react";
import styled from "styled-components";

import DynamicModal from "../../shared/containers/DynamicModal";
import ProgressBar from "../../shared/gadgets/ProgressBar";
import Button from "../../shared/gadgets/NewButton";
import ClampedText from "../../shared/utils/ClampedText";

const Header = styled.div`
  padding: 2em 4em 0;
  width: 69%;
`;

const Content = styled.div`
  padding: 2em 3em;
  display: flex;
`;

const LearningObjectives = styled.div`
  margin-right: 3em;
  white-space: pre-line;
  flex: 2;
`;

const Prerequisites = styled.div`
  flex: 1.4;
`;

const Card = styled.div`
  margin-bottom: 0.5em;
  padding: 1em 2em;
  box-shadow: 0px 4px 25px #0002;
  border-radius: 0.3em;
`;

const SmallText = styled.p`
  font-size: 75%;
`;
const SmallerText = styled.p`
  font-size: 60%;
`;
const SmallClampedText = styled(ClampedText)`
  font-size: 75%;
`;

const ActivityModal = props => {
  // const formatted = useRef(null);

  // const handleSetFormatted = () => {
  //   if (formatted.current)
  //     formatted.current.innerText = props.learningObjectives;
  // };

  // useEffect(() => {
  //   handleSetFormatted();
  // });

  const header = (
    <Header>
      <h2>{props.name}</h2>
      <SmallClampedText clamp="3">{props.description}</SmallClampedText>
      <ProgressBar
        style={{ margin: "2em 0", height: "0.4em" }}
        width={"69%"}
        progress={"44%"}
      />
    </Header>
  );

  const content = (
    <Content /*ref={formatted} */>
      <LearningObjectives>
        <h3>Learning Objectives</h3>
        <SmallText>{props.learningObjectives}</SmallText>
      </LearningObjectives>
      <Prerequisites>
        <h3>Prerequisites</h3>
        <Card>
          <SmallerText style={{ margin: 0 }}>Completion</SmallerText>
          <SmallText style={{ margin: 0 }}>Introduction to GitHub</SmallText>
        </Card>
        <Card>
          <SmallerText style={{ margin: 0 }}>Completion</SmallerText>
          <SmallText style={{ margin: 0 }}>Introduction to GitHub</SmallText>
        </Card>
      </Prerequisites>
    </Content>
  );

  return (
    <DynamicModal
      type="POST"
      header={header}
      content={content}
      contentRatio={1.2}
      open={props.open}
      closed={props.closed}
    >
      <Button invert sharp margin="0">
        Continue
      </Button>
    </DynamicModal>
  );
};

export default ActivityModal;
