const { connectToClient, closeClient, getDB } = require("./mongoUtils");

//contain a complex search criterion (more than one expression with logical connectors)
//Customer who has one or three pets and whose first name has more than four characters

async function query2() {
  const client = connectToClient();
  try {
    const db = getDB(client);
    const aggregation = [
      {
        $match: {
          $expr: { $gt: [{ $strLenCP: "$first_name" }, 4] },
        },
      },
      {
        $match: {
          $or: [
            { $expr: { $eq: [{ $size: "$pet" }, 1] } }, // Has one pet
            { $expr: { $eq: [{ $size: "$pet" }, 3] } }, // Has three pets
          ],
        },
      },
    ];
    const result = await db.collection("customer").aggregate(aggregation).toArray();
    console.log("Customer who has one or three pets and whose first name has more than four characters:", result);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    closeClient(client);
  }
}

query2();