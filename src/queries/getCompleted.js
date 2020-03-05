import gql from "graphql-tag"
import { event } from "../fragments/economicEvents"

export default gql`
  query($id: ID) {
      agent(id: $id) {
        id
        agentCommitments(latestNumberOfDays: 30) {
          id
          isFinished
          fulfilledBy {
            fulfilledBy {
              ...BasicEvent
            }
          }
          provider {
            id
            image
            name
          }
          inputOf {
            id
            name
          }
          outputOf {
            id
            name
          }
          note
          action
          committedQuantity {
            numericValue
            unit {
              id
              name
            }
          }
          due
          resourceClassifiedAs {
            name
            id
          }
        }
      }
  }
  ${event}
`
