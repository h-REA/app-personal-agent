import gql from "graphql-tag"
import { event } from "../fragments/economicEvents"

export default gql`
  query($id: ID!) {
      economicEvent(id: $id) {
        ...BasicEvent
        inputOf {
          name
          id
          processPlan {
            name
            id
          }
        }
        validations {
          id
          note
          validatedBy {
            name
            id
          }
        }
        scope {
          id
          name
        }
      }
  }
  ${event}
`
