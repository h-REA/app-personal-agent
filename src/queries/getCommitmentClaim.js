import gql from 'graphql-tag'

const GetCommitmentClaim = gql`
query ($id: ID!) {
      commitment(id: $id) {
        inputOf {
          name
          id
          processPlan {
            id
            name
          }
        }
        note
        id
        scope {
          id
          name
        }
        action
        resourceClassifiedAs{
          name
        }
        committedQuantity {
          unit {
            name
          }
          numericValue
        }
        fulfilledBy(requestDistribution: true) {
          fulfilledBy {
            id
            action
            validations {
              id
              validatedBy {
                name
                id
              }
            }
            start
            inputOf {
              name
            }
            affectedQuantity {
              numericValue
              unit {
                name
              }
            }
            affects {
              resourceClassifiedAs {
                name
                category
              }
              trackingIdentifier
            }
            provider {
              id
              name
              image
            }
            receiver {
              id
              name
            }
            note
          }
        }
      }
  }`

export default GetCommitmentClaim
