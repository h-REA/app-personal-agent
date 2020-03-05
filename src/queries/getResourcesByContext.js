import gql from "graphql-tag"

export default gql`
  query($id: ID) {
      agent(id: $id) {
        id
        agentDefinedResourceClassifications {
          name
          category
          processCategory
          id
          unit {
            id
            name
          }
        }
      }
  }
`

export const getResourcesByContextByAction = gql`
  query($action: String, $id: Int) {
      agent(id: $id) {
        id
        agentDefinedResourceClassifications(action: $action) {
          name
          category
          processCategory
          id
          unit {
            id
            name
          }
        }
      }
  }
`
