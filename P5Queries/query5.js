const { connectToClient, closeClient, getDB } = require("./mongoUtils");

// find the average unit price of each product in decreasing order

async function query5() {
  const client = connectToClient();
  try {
    const db = getDB(client);
    const aggregation = [
      {
        $unwind: "$order_details"
      },
      {
        $group: {
          _id: "$order_details.product",
          avg_unit_price: { $avg: "$order_details.unit_price" },
        },
      },
      {
        $project: {
          _id: 0,
          product: "$_id",
          avg_unit_price: 1,
        },
      },
      {
        $sort: {
          avg_unit_price: -1,
        },
      },
    ];
    const average_prices = await db
      .collection("order")
      .aggregate(aggregation)
      .toArray();
    console.log("Average unit price of each product in decreasing order:", average_prices);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    closeClient(client);
  }
}

query5();