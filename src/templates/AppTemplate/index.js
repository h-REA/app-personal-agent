import * as React from "react";
import gql from "graphql-tag";
import { compose, withHandlers, withState } from "recompose";
import styled from "styled-components";
import { LoadingMini, ErrorMini } from "../../components/loading";
import Header from "./header";
import { Query } from "react-apollo";
import ValidationModal from "../../components/modalValidation";
import Home from "../../pages/home";
import { PropsRoute } from "../../helpers/router";
import Agent from "../../pages/agent/agent";
import { Switch } from "react-router-dom";

const Surface = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 1010px;
  margin: 0 auto;
  margin-top: 60px;
`;

const Whole = styled.div`

`;

const AppTemplate = props => {
  return (
    <Query query={agentRelationships}>
      {({ loading, error, data, refetch, client }) => {
        if (loading) return <LoadingMini />;
        if (error) return (<ErrorMini refetch={refetch} message={`Error! ${error.message}`} />)
        return (
          <Whole>
            { /* <Header
              history={props.history}
              providerId={data.myAgent.id}
              providerImage={data.myAgent.image}
              agents={data.myAgent.agentRelationships}
            /> */ }
          <Surface>
            <Switch>
              { /* <PropsRoute
                component={Agent}
                location={props.location}
                path="/agent/:id"
                providerImage={data.myAgent.image}
                client={client}
                providerId={data.myAgent.id}
                providerName={data.myAgent.name}
                toggleValidationModal={props.toggleValidationModal}
                handleProcess={props.handleProcess}
                processModalIsOpen={props.processModalIsOpen}
              /> */ }
              <PropsRoute
                component={Home}
                path={'/'}
                location={props.location}
                client={client}
                providerId={data.myAgent.id}
                providerImage={data.myAgent.image}
                providerName={data.myAgent.name}
                toggleValidationModal={props.toggleValidationModal}
                handleProcess={props.handleProcess}
                processModalIsOpen={props.processModalIsOpen}
              />
            </Switch>
            { /* <ValidationModal
              modalIsOpen={props.validationModalIsOpen}
              toggleModal={props.toggleValidationModal}
              contributionId={props.validationModalId}
              myId={data.myAgent.id}
            /> */ }
          </Surface>
          </Whole>
        );
      }}
    </Query>
  );
};

const agentRelationships = gql`
  query {
      myAgent {
        id
        name
        image
        agentRelationships {
          id
          object {
            id
            name
          }
        }
      }
  }
`;

export default compose(
  withState("validationModalIsOpen", "toggleValidationModalIsOpen", false),
  withState("processModalIsOpen", "toggleProcessModalIsOpen", false),
  withState("validationModalId", "selectValidationModalId", null),
  withHandlers({
    handleProcess: props => (id) => {
      if (props.processModalIsOpen) {
        props.history.goBack()
        props.toggleProcessModalIsOpen(false)
      } else {
        props.history.push('/processes/' + id)
        props.toggleProcessModalIsOpen(true)
      }
    },
    toggleValidationModal: props => contributionId => {
      props.selectValidationModalId(contributionId);
      props.toggleValidationModalIsOpen(!props.validationModalIsOpen);
    }
  })
)(AppTemplate);
