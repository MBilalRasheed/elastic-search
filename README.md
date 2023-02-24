# React Take Home Assignment
This assignment is to further assess your development and critical thinking skills. At Emgage, we are working with a variety of technologies, including Elastic Search, to build a robust front-end application.

# Getting Started
We have provided you a sample front-end application and a node server application.  The node server application connects to the Elastic Search and the front-end application is a react SPA.

## Run Node JS for Elastic Search API
1. You must first export the following environment variable: export BONSAI_URL="https://pscdj5wv3i:cr9ziuto1y@role-test-6364081045.us-east-1.bonsaisearch.net:443"
2. You can run the node application as: `npm start`

## Run Front-End Application
The front-end application is setup with a table that can render `IRoleDef[]`.  At the moment, it does not do anything.  Your assignment is to implement functionality.

Run using `npm run dev`.

# Data Model of Assignment
There are a total of 18 documents in the Elastic Search Index. The Node Server application is already configured to connect with Elastic Search.  You can view the documents by running the node app and using the following JavaScript. *You must use Axios to make requests. The fetch below is just an example.*
```
fetch("http://localhost:3000/searchRoles", {
  body: "{\n  \"from\" : 0, \"size\" : 20,\n  \"query\": {\n    \"match_all\": {}\n  }\n}",
  headers: {
    "Content-Type": "application/json"
  },
  method: "GET"
})
```
*Note: Elastic Search client is already setup on node_server.js. You only need to pass the correct queries in the body, and node application will relay it to Elastic Search.*

## Fields
The documents contain many properties.  You will mostly deal with `id`, `name`, `description`, `entityState.itemID`, `entityState`, and `allowedMemberTypes`.  (Other fields are less likely to be used).

## Entity State
Each document is either `Published` or `Deleted`. You will be using these in assignment.

**Published:** In the document, if `entityState.itemID = 5`, then document is published.

**Deleted:** In the document, if `entityState.itemID = 7`, then document is published.

# Assignment
In this assignment, you will do the following:
- Query data from Elastic Search.
- Implement Redux for Data flow.
- Add `id` Column to the table.
- Prepend your name to all class names using Webpack loader.
- Review Code and make any architectural/UI changes you deem necessary.
- Additional functionality missing that you believe would be good to add.

## Query Data from Elastic Search
The provided RoleDefsContainer must do the following:
1. When page Load, show only "Published" Items.
2. When Filter Input changes, apply search filter to Elastic Search query.  You  must search both the "Name" and "Description" fields.
3. When "Show Deleted" is clicked under `...` right of the filter input, show "Deleted" items in addition to published items.

_Note: You should make Elastic Search reuqest for filtering and getting deleted. Do not frontload all data in JavaScript and filter in JavaScript._

## React Redux Store
Please use React Redux to implement API calls and storing elastic search documents.  Architecture choices will be strongly evaluated.

## Add UI Column
In the table, add an ID column and show document IDs for the data.

## Prepend your name to all class names
Update Webpack configuration to append your name to all class names generated by Webpack.
Ex: If current class name is `flexbox-wrap`, you can make it something like `John-flexbox-wrap`.

_Hint: `css-loader`._

## TLC
"TLC" means tender loving care.  In this part, use your best judgement to improve UI and architecture.  Also feel free to add any other functionality that would make the application better.

### Sample Elastic Search Query: Showing Published Items on Page Load
To help you get started, here is the query you would use to get "Published" items.
```
curl -X GET "http://localhost:3000/searchRoles" -H 'Content-Type: application/json' -d '{
  "from" : 0, "size" : 20,
  "query": {
    "bool" : {
      "must" : [
        {"term":{"entityState.itemID":5}}
      ]
    }
  }
}'
```

# Resources
## Elastic Search
Here are some resources on Elastic Search:
- https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html
- https://medium.com/elasticsearch/introduction-to-elasticsearch-queries-b5ea254bf455
## Engage-UI
We are extensively using `engage-ui` to style our library. You can view the project on GitHub for reference.
