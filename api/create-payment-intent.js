const express = require("express");
const app = express();
const stripe = require("stripe")(
  "sk_test_51QKMqSAKOVcI10s4s0FRAWDg57rI8q27D7AuCyYcbv19zHibRcTu6s6lSpeyKisi8N4Z3RHhrra2odO6ORqlscaq00Ioqh7nWb"
);
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    // Ensure you set the payment method type to "card"
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "cad",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Payment Intent Error: ", error.message);
    res.status(500).send({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
