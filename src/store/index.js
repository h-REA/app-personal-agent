import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'

import introspectionQueryResultData from '../fragmentTypes.json'
import { defaults, resolvers } from "./resolvers"

import initGraphQLClient from '@vf-ui/graphql-client'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    const dataId = object.id ? `${object.__typename}-${object.id}` : null
    return dataId
},
  addTypename: true,
  fragmentMatcher,
})

/**
 * Inject client notification state into base GraphQL client
 */
export default async function getClient() {
  const baseClient = await initGraphQLClient()

  return new ApolloClient({
    link: ApolloLink.from([
      withClientState({
        cache,
        defaults: defaults,
        resolvers: resolvers,
      }),
      baseClient.link,
    ]),
    cache: cache.restore(window.__APOLLO_CLIENT__),
    ssrMode: true,
    ssrForceFetchDelay: 100,
    connectToDevTools: true,
    queryDeduplication: true,
  })
}
