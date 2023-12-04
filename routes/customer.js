let express = require("express");
let router = express.Router();

const {
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  addCustomer,
} = require("../db/controller/customer_controller");

//getting all customers to display
router.get("/", async function (req, res) {
  try {
    const customers = await getCustomers();
    console.log("Customers:", customers);
    res.render("customerDisplay", { title: "Customers", customers });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).send("Internal Server Error");
  }
});

//display customer form
router.get("/:customer_id/edit", async function (req, res) {
  const customer_id = req.params.customer_id;
  const customer = await getCustomer(customer_id);
  res.render("customerForm", { title: "Customer details", customer });
});

//post the changes
router.post("/:customer_id/edit", async function (req, res) {
  const customer_id = req.params.customer_id;
  const customer = req.body;
  const result = await updateCustomer(customer_id, customer);
  res.redirect("/customer");
});

//delete route
router.get("/:customer_id/delete", async function (req, res) {
  const customer_id = req.params.customer_id;
  const result = await deleteCustomer(customer_id);
  res.redirect("/customer");
});

//display the form

router.get("/add", async function (req, res) {
  const customer = { customer_id: "", first_name: "", last_name: "", email: "", phone: "", address: "" };
  res.render("customerForm", { title: "Add a customer", customer });
});

//add the new customer
router.post("/add", async function (req, res) {
  const customer = req.body;
  const result = await addCustomer(customer);
  res.redirect("/customer");
});

module.exports = router;
