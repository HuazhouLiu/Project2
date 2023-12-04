let express = require("express");
let router = express.Router();

const { getOrders } = require("../db/controller/order_controller");

router.get("/", async function (req, res) {

  try {
    const orders = await getOrders();
    console.log("Orders:", orders);
    res.render("index", { title: "Customers", orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
