import gql from "graphql-tag"

export default gql`
  query($id: ID) {
      agent(id: $id) {
        id
        agentProcesses {
          id
          name
        }
      }
  }
`
