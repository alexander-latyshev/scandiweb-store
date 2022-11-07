import { gql } from "@apollo/client";

export const FETCH_CATEGORY_NAMES = gql`
  query {
    categories {
      name
    }
  }
`;

export const FETCH_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
