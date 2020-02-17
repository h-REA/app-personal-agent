import React from "react";
import styled from "styled-components";
import media from "styled-media-query";
import Header from "./header";
import Output from "./outputs";
import Actions from "./actions";
import getProcess from "../../queries/getProcess";
import { LoadingMini, ErrorMini } from "../../components/loading";
import { Query } from "react-apollo";
import moment from "moment";
const Process = props => (
  <Query
    query={getProcess}
    variables={{
      id: Number(props.id)
    }}
  >
    {({ loading, error, data, refetch, client }) => {
      if (loading) return <LoadingMini />;
      if (error)
        return (
          <ErrorMini refetch={refetch} message={`Error! ${error.message}`} />
        );
      let percentage =
        (data.process.committedInputs.filter(i => i.isFinished).length *
          100) /
        data.process.committedInputs.length;
      return (
        <Body>
          <Wrapper isopen={props.isopen}>
            <Header
              title={data.process.name}
              note={data.process.note}
              from={moment(data.process.plannedStart).format("DD MMM")}
              to={moment(data.process.plannedFinish).format("DD MMM")}
              scope={data.process.scope}
              plan={data.process.processPlan}
              agents={data.process.workingAgents}
            />

            <Output
              providerId={props.providerId}
              outputs={data.process.committedOutputs}
              percentage={percentage}
              scopeId={data.process.scope.id}
              processId={data.process.id}
            />
            <Content>
              <Actions
                providerImage={props.providerImage}
                providerId={props.providerId}
                scope={data.process.scope}
                inputs={data.process.committedInputs}
                client={client}
                events={data.process.unplannedEconomicEvents}
                processId={data.process.id}
              />
            </Content>
          </Wrapper>
        </Body>
      );
    }}
  </Query>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  flex: 1;
  background: #fff;
  padding: 8px;
  margin-left: 8px;
  ${media.lessThan("medium")`
    display: ${props => (props.isopen ? "none" : "flex")}
  `};
`;
const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;
const Content = styled.div`
  display: grid;
  margin-top: 26px;
  grid-template-columns: 1fr
  grid-column-gap: 24px;
`;

export default Process;
