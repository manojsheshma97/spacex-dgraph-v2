
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { cache } from "./cache";
import React from "react";
import ReactDOM from "react-dom";

import Pages from './Pages'


// Initialize ApolloClient
const client = new ApolloClient({
  cache,
 // uri: "https://long-cloud.ap-south-1.aws.cloud.dgraph.io/graphql"
  uri:"https://spring-voice.ap-south-1.aws.cloud.dgraph.io/graphql"
});

//injectStyles();

// Pass the ApolloClient instance to the ApolloProvider component
ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages/>
    
  </ApolloProvider>,
  document.getElementById("root")
);
