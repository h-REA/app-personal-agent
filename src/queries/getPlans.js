import gql from 'graphql-tag'

export default gql`
query ($id: ID) {
      agent(id: $id) {
        id
        agentPlans (isFinished: false)  {
          name
          id
          note
          due
        }
      }
  }
`
