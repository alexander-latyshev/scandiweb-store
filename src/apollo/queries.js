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

export const FETCH_CATEGORY = gql`
  query ($categoryName: String!) {
    category(input: { title: $categoryName }) {
      products {
        name
        brand
        id
        inStock
        description
        category
        gallery
        attributes {
          id
          name
          type
          items {
            displayValue
            id
            value
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const FETCH_PRODUCT = gql`
  query ($productID: String!) {
    product(id: $productID) {
      name
      brand
      id
      description
      inStock
      gallery
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      attributes {
        name
        type
        id
        items {
          value
          displayValue
          id
        }
      }
    }
  }
`;
