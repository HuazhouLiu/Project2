const { connectToClient, closeClient, getDB } = require("./mongoUtils");

//updating a document based on a query parameter
//incrementing all order id by 1

async function query4() {
    const client = connectToClient();
    try {
      const db = getDB(client);
  
      // Fetch documents before the update
      const oldOrders = await db.collection("order").find({}).toArray();
  
      // Increment all order_id values by one
      const updateResult = await db.collection("order").updateMany(
        {},
        { $inc: { order_id: 1 } }
      );
  
      if (updateResult.modifiedCount > 0) {
        // Fetch documents after the update
        const newOrders = await db.collection("order").find({}).toArray();
  
        // Log the old and new order_id values
        oldOrders.forEach((oldOrder, index) => {
          const newOrder = newOrders[index];
          console.log(`Order ${oldOrder.order_id}: Old ID - ${oldOrder.order_id}, New ID - ${newOrder.order_id}`);
        });
      } else {
        console.log("No orders found or no changes made.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      closeClient(client);
    }
  }
  
  query4();