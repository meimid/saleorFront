import gql from "graphql-tag";


export const MANUAL_PAYMENT_MUTATION = gql`
 mutation TransactionCreate($id: ID!, $transaction: TransactionCreateInput!) {
  transactionCreate(id: $id, transaction: $transaction) {
    transaction {
      id
      actions
    }
    errors {
      field
      message
    }
  }
}

`;