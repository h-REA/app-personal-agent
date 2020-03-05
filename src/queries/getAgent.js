import gql from 'graphql-tag'

export default gql`
query ($id: ID) {
      agent(id: $id) {
        id
        name
        image
        email
        note
        type
        agentRelationships {
          object {
            id
            name
            image
          }
          subject {
            name
            image
            id
          }
        }
      }
  }
`
