import gql from 'graphql-tag'

export default gql`
query ($id: ID) {
      agent(id: $id) {
        id
        agentPlans {
          name
          id
          note
          due
          plannedOn
          planProcesses {
            isStarted
            isFinished
            name
          }
        }
      }
  }
`
