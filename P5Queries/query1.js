const { connectToClient, closeClient, getDB } = require("./mongoUtils");

//Contains an aggregation: total quantity of product pucharced by customer with id 1

async function query1() {

    const client = connectToClient();
  
    try {
      const db = getDB(client);
  
      // Find the number of products for customer_id = 1
      const aggregationPipeline = [
        {
          $match: { customer_id: 1 }
        },
        {
          $unwind: "$order_details"
        },
        {
          $group: {
            _id: "$customer_id",
            numberOfProducts: { $sum: "$order_details.quantity" }
          }
        }
      ];
  
      const result = await db.collection("order").aggregate(aggregationPipeline).toArray();
  
      console.log("Number of products for customer_id = 1:", result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      closeClient(client);
    }
  }
  
  // Call the function to execute the query
  query1();