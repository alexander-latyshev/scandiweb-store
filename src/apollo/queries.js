import { gql } from "@apollo/client";

export const GET_CATEGORY_NAMES = gql`
  query {
    categories {
      name
    }
  }
`;
