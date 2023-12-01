# Project2

## To import the data

````bash
mongoimport -d pet_store -c customer mongodb://localhost:27017 P4DaTA/customer.json --jsonArray
mongoimport -d pet_store -c order mongodb://localhost:27017 P4DaTA/order.json --jsonArray
## To run the queries
```bash
node P5Queries/query1.js
node P5Queries/query2.js
node P5Queries/query3.js
node P5Queries/query4.js
node P5Queries/query5.js
````
