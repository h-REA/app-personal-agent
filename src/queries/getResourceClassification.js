import gql from 'graphql-tag'

export default gql`
query($id: ID!) {
      resourceClassification(id:$id) {
        id
        name
        image
        category
        unit {
          id
          name
        }
      }
  }
`
