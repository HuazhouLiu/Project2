const { connectToClient, closeClient, getDB } = require("../../mongoUtils");

async function getCustomers() {
  const client = connectToClient();
  try {
    const db = getDB(client);
    const customers = await db
      .collection("customer")
      .find({})
      .sort({ _id: -1 })
      .limit(10)
      .toArray();
    return customers;
  } catch (err) {
    console.error("Error fetching customers:", err); // Log the error
    throw err; // Throw the error to propagate it to the calling code
  } finally {
    closeClient(client);
  }
}

//get customer by id
async function getCustomer(customer_id) {
  const client = connectToClient();
  try {
    const db = getDB(client);
    //get customer by id
    const customer = await db.collection("customer").findOne({ customer_id: +customer_id });
    return customer;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  } finally {
    closeClient(client);
  }
}

//update a customer
async function updateCustomer(customer_id, customer) {
  const client = connectToClient();
  try {
    const db = getDB(client);
    const update = {
      $set: {
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
      },
    };
    //update customer by id
    const result = await db
      .collection("customer")
      .updateOne({ customer_id: +customer_id }, update);
    return result;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  } finally {
    closeClient(client);
  }
}

//delete a customer
async function deleteCustomer(customer_id) {
  const client = connectToClient();
  try {
    const db = getDB(client);
    //get customer by id
    const result = await db
      .collection("customer")
      .deleteOne({ customer_id: +customer_id });
    return result;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  } finally {
    closeClient(client);
  }
}

async function addCustomer(customer) {
  const newCustomer = {
    customer_id: +customer.customer_id, // Ensure the property names match the actual properties in the customer object
    first_name: customer.first_name,
    last_name: customer.last_name,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
  };

  const client = connectToClient();
  try {
    const db = getDB(client);
    const result = await db.collection("customer").insertOne(newCustomer);
    return result;
  } catch (err) {
    console.error("Error adding customer:", err);
    throw err;
  } finally {
    closeClient(client);
  }
}

module.exports = {
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  addCustomer,
};
