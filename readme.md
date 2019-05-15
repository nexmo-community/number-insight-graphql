# Number Insight API GraphQL Example

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Nexmo's [Number Insight API](https://developer.nexmo.com/number-insight/overview) is a great way to get more information about numbers that you have stored in your system.

This repository contains an example GraphQL server for retreiving information from the Number Insight API, it will work with the [basic, standard and advanced levels](https://developer.nexmo.com/number-insight/overview#basic-standard-and-advanced-apis) of information retrieval.

The server is written in [Node.js](https://nodejs.org) and uses the [Apollo GraphQL Server](https://www.apollographql.com/).

## Installation

Clone the repository and run the following command to install the project dependencies:

```bash
npm install
```

> Note: Dependencies are [apollo-server](https://www.npmjs.com/package/apollo-server), [graphql](https://www.npmjs.com/package/graphql), [apollo-datasource-rest](https://www.npmjs.com/package/apollo-datasource-rest) and [config](https://www.npmjs.com/package/config)

### API Key & Secret

You will need a Nexmo API Key and API Secret. If you don't have these credentials then [sign up for a Nexmo account](https://dashboard.nexmo.com/sign-up) to get them.

`config` expects credentials to be found at this path `./config/default.json` so create this file first.

Set your `default.json` file up like this:

```json
{
  "nexmo_api_key": "<your api key>",
  "nexmo_api_secret": "<your api secret>"
}
```

## Starting The Server

To start the server locally run this command:

```bash
npm start
```

The server will launch on port 4000. If you need to change this port then you can by modifying line 24 of `server.js`.

## Running Queries

You are free to run queries against this server however you like, but the best place to start is by using the interactive query editor provided by the Apollo GraphQL Server.

You can launch this with your server running by going to `http://localhost:4000` in your browser.

### Example Query - Basic

Here is a basic query to start with:

```graphql
query {
  insight(number: "<enter your number here>") {
    country_name
  }
}
```

This will return a JSON response similar to this:

```json
{
  "data": {
    "insight": {
      "country_name": "United Kingdom"
    }
  }
}
```

### Example Query - Standard

To retrieve [_standard_ level insight](https://developer.nexmo.com/number-insight/code-snippets/number-insight-standard) (which cost slightly more), run your queries with an additional `type` parameter in the request.

For example:

```graphql
query {
  insight(number: "<enter your number here>", type: "standard") {
    country_name
    current_carrier {
      name
    }
  }
}
```

This will return a JSON response similar to this:

```json
{
  "data": {
    "insight": {
      "country_name": "United Kingdom",
      "current_carrier": {
        "name": "Telefonica UK Limited"
      }
    }
  }
}
```

The full list of available parameters from the Number Insight API, and at what level you can access them, can be found in the [API Reference](https://developer.nexmo.com/api/number-insight).

## Deploying The Server

The quickest way to deploy this to a production server would be to use the one-click deploy buttons at the top of this readme.
