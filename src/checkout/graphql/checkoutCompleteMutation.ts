import gql from "graphql-tag";

export const CHECKOUT_COMPLETE_MUTATION = gql`
mutation checkoutComplete($checkoutId: ID!, $phone: String, $note: String) {
  checkoutComplete(id: $checkoutId, phone: $phone, note: $note) {
    order {
      id
      status
      phone
      note
    }
    errors {
      field
      message
    }
  }
}


`;