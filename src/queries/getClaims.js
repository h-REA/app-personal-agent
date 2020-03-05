import gql from 'graphql-tag'

const GetClaims = gql`
query ($id: ID, $month: Int, $year: Int) {
      agent(id: $id) {
        id
        eventsCount(month:$month, year:$year)
        eventHoursCount(month:$month, year:$year)
        eventPeopleCount(month:$month, year:$year)
        agentPlans (isFinished: false, month:$month, year:$year ) {
          planProcesses (month:$month, year:$year) {
            id
            committedInputs(action: WORK) {
              fulfilledBy(requestDistribution: true) {
                fulfilledBy {
                  id
                  inputOf {
                    id
                    processPlan {
                      id
                      name
                    }
                  }
                  provider {
                    id
                    name
                    image
                  }
                  affectedQuantity {
                    numericValue
                  }
                  validations {
                    validatedBy {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
  }
  `

export default GetClaims
