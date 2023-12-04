let express = require("express");
let router = express.Router();

const {
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
  addOrder,
} = require("../db/controller/order_controller");

//display edit form
router.get("/:order_id/edit", async function (req, res) {
  const order_id = req.params.order_id;
  const order = await getOrder(order_id);
  res.render("orderForm", { title: "Orders", order });
});

router.get("/", async function (req, res) {
  try {
    const orders = await getOrders();
    console.log("Orders:", orders);
    res.render("index", { title: "Orders", orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Internal Server Error");
  }
});

//post the edit result
router.post("/:order_id/edit", async function (req, res) {
  const order_id = req.params.order_id;
  const order = req.body;
  const result = await updateOrder(order_id, order);
  res.redirect("/");
});

//delete by id
router.get("/:order_id/delete", async function (req, res) {
  const order_id = req.params.order_id;
  const result = await deleteOrder(order_id);
  res.redirect("/");
});

//display add form
// router.get("/add", async function (req, res) {
//   res.render("orderForm", { title: "Add an order", order: null });
// });
router.get("/add", async function (req, res) {
  const order = { order_id: "", order_date: "", total_amount: "", customer_id: "" };
  res.render("orderForm", { title: "Add an order", order });
});

//add the new order
router.post("/add", async function (req, res) {
  const order = req.body;
  const result = await addOrder(order);
  res.redirect("/");
});

module.exports = router;
