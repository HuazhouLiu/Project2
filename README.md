# Project2

Link to ERD: https://lucid.app/lucidchart/c851940a-4834-4f33-8e79-e1b667cee303/edit?viewport_loc=-961%2C-940%2C3320%2C1450%2C0_0&invitationId=inv_5b91520f-53e6-4eb1-b6e6-d10419aea24f

## To import the data

```bash
mongoimport -d pet_store -c customer mongodb://localhost:27017 P4DATA/customer.json --jsonArray
mongoimport -d pet_store -c order mongodb://localhost:27017 P4DATA/order.json --jsonArray
```

## To run the queries

```bash
npm install
node P5Queries/query1.js
node P5Queries/query2.js
node P5Queries/query3.js
node P5Queries/query4.js
node P5Queries/query5.js
```

## To run the node app

npm install
npm start
http://localhost:3000
http://localhost:3000/customer
