require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Mama Diwani Safari Booking",
            },
            unit_amount: 50000, // $500.00
          },
          quantity: 1,
        },
      ],
      success_url: "https://gorgeous-chebakia-86927c.netlify.app/success",
      cancel_url: "https://gorgeous-chebakia-86927c.netlify.app/cancel",
    });

    res.json({ url: session.url }); //
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Payment initialization failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Mama Diwani Safari Booking",
            },
            unit_amount: 50000, // $500.00
          },
          quantity: 1,
        },
      ],
      success_url: "https://gorgeous-chebakia-86927c.netlify.app/success",
      cancel_url: "https://gorgeous-chebakia-86927c.netlify.app/cancel",
    });

    res.json({ url: session.url }); // ✅ This is what your frontend expects
  } catch (err) {
    console.error("Stripe error:", err); // ✅ Logs error to Render dashboard
    res.status(500).json({ error: "Payment initialization failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));