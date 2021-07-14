import gql from "graphql-tag";

export const GET_LAUNCHES = gql`
    query{
        queryLaunch {
            id
            isAddedToCart
            isBooked
            site
            mission {
                name
            }
            rocket {
                name
                type
            }
            imageSaved
        }
    }
`;

export const UPDATE_LAUNCH = gql`
    mutation updateLaunch($launch: [ID!],$booked: Boolean!, $addedToCart: Boolean!){
        updateLaunch(input: {filter: {id: $launch}, set: {isBooked: $booked, isAddedToCart: $addedToCart}}) {
            launch {
            id
            isAddedToCart
            isBooked
            site
            mission {
                name
            }
            rocket {
                name
                type
            }
        }
    }
}
`;

export const UPDATE_ADDTOCART = gql`
    mutation updateAddToCart($launch: [ID!],$addedToCart: Boolean!){
        updateLaunch(input: {filter: {id: $launch}, set: {isAddedToCart: $addedToCart}}) {
            launch {
            id
            isAddedToCart
            isBooked
            site
            mission {
                name
            }
            rocket {
                name
                type
            }
        }
    }
}
`;
