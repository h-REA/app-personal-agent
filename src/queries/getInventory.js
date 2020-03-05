import gql from "graphql-tag"

export default gql`
  query($id: ID!) {
      agent(id: $id) {
        id
        ownedEconomicResources(category: INVENTORY) {
            id
            resourceClassifiedAs {
              name
              category
              processCategory
            }
            trackingIdentifier
            currentQuantity {
              numericValue
              unit {
                name
              }
            }
            image
            note
          }
      }
  }
`
