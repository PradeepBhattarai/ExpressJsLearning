const { Router } = require("express");

const router = Router();

const groceries = [
  {
    item: "apple",
    quantity: 10,
  },
  {
    item: "banana",
    quantity: 20,
  },
  {
    item: "pop-tarts",
    quantity: 24,
  },
  {
    item: "popcorn",
    quantity: 60,
  },
];

router.use((req, res, next) => {
  // console.log('Inside groceries middleware');
  // console.log(req.user);
  if (req.user) next();
  else {
    res.send(401);
  }
});

router.get(
  "/",
  (req, res, next) => {
    res.cookie("visited", true, {
      maxAge: 60000,
    });
    next();
  },
  (req, res, next) => {
    res.send(groceries);
    next();
  }
);

//Route Parameters
router.get(
  "/:item",
  (req, res, next) => {
    res.cookie("hell0", "world", {
      maxAge: 60000,
    });
    console.log(req.cookies);
    next();
  },
  (req, res) => {
    const { item } = req.params;
    const groceryItem = groceries.find((g) => g.item === item);
    res.send(groceryItem);
  }
);

router.post("/", (req, res, next) => {
  groceries.push(req.body);
  res.sendStatus(201);
  next();
});
router.get("/shopping/cart", (req, res) => {
  const { cart } = req.session;
  console.log('cart');
  if (!cart) {
    res.send("You have no cart session");
  }
  else {
    res.send(cart);
  }
});

router.post("/shopping/cart/item", (req, res) => {
  const { item, quantity } = req.body;
  const cartItem = { item, quantity };
  const { cart } = req.session;
  if (cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  res.sendStatus(201);
});

module.exports = router;