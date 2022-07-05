// import getAllAccounts from "main/graphql/getAllAccounts.grahql?raw"
import getAllAccounts from "main/graphql/getAllAccounts.graphql?raw"
import { gql } from "graphql-request"

export const getAllAccountsQuery = gql`
  ${getAllAccounts}
`
