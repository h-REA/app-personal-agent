import gql from "graphql-tag"

export default gql`
  query($id: ID) {
      agent(id: $id) {
        id
        name
        image
        agentProcesses {
          id
          name
          scope {
              id
              name
          }
          isFinished
          note
          plannedStart
          plannedFinish
          processPlan {
            id
            name
          }
          committedInputs {
            note
            id
            action
            plannedStart
            due
            resourceClassifiedAs {
              name
              id
            }
            committedQuantity {
              unit {
                id
                name
              }
              numericValue
            }
          }

          committedOutputs {
            note
            id
            plannedStart
            action
            provider {
              id
              name
              image
            }
            due
            resourceClassifiedAs {
              name
              id
            }
            committedQuantity {
              unit {
                id
                name
              }
              numericValue
            }
          }
        }
      }
  }
`
