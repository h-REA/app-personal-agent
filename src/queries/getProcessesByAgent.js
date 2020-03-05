import gql from 'graphql-tag'

const Plan = gql`
query ($id: ID) {
      agent(id: $id) {
        id
        agentProcesses {
          id
          name
        }
      }
  }
`
export default Plan
