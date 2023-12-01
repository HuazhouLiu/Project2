const { connectToClient, closeClient, getDB } = require("./mongoUtils");

//counting documents for an specific user
//count the orders the customer 10 have made.

async function query3() {
  const client = connectToClient();
  try {
    const db = getDB(client);
    const customerID = 10; // Replace with the desired customer_id
    const query = {
      "customer_id": customerID,
    };
    const orderCount = await db
      .collection("order")
      .countDocuments(query);
    console.log(`The customer ${customerID} order count:`, orderCount);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    closeClient(client);
  }
}

query3();
