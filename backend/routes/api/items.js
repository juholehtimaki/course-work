const express = require("express");
const router = express.Router();
const Item = require("../../models/item.js").Item;
const User = require("../../models/user.js").User;
const path = "http://localhost:5000/api/items/";
const requireRole = require("../../utils/accessControl/jwtAuth").requireRole;

router.get("/", async (req, res) => {
  //pending items
  if (
    req.query.status == "pending" &&
    (req.token &&
      (req.token.role === "admin" || req.token.role === "shopkeeper"))
  ) {
    console.log("Fetching pending items");
    Item.find({ status: "pending" })
      .then(results => {
        res.status(200);
        res.location(path);
        res.json({ items: results });
      })
      .catch(() => res.sendStatus(500));
  }
  //items which have a reference to the user accessing the route
  else if (req.query.status && req.token && req.query.status == "me") {
    console.log("Fetching user's items");
    let tempBoughtItems = [];
    let tempListedItems = [];
    let tempAcceptedItems = [];

    await Item.find({ buyer: req.token.id }).then(results => {
      for (let result of results) {
        tempBoughtItems.push(result);
      }
    });
    await Item.find({ seller: req.token.id }).then(results => {
      for (let result of results) {
        tempListedItems.push(result);
      }
    });
    await Item.find({ shopkeeper: req.token.id }).then(results => {
      for (let result of results) {
        tempAcceptedItems.push(result);
      }
    });
    res.json({
      boughtItems: tempBoughtItems,
      listedItems: tempListedItems,
      acceptedItems: tempAcceptedItems
    });
  }
  //otherwise just returning a list of item's that have status: listed
  else {
    console.log("Fetching all listed items");
    Item.find({ status: "listed" })
      .then(results => {
        res.status(200);
        res.location(path);
        res.json({ items: results });
      })
      .catch(() => res.sendStatus(500));
  }
});

router.get("/:id", requireRole(["admin", "user", "shopkeeper"]), (req, res) => {
  console.log("Fetching single item from backend");
  Item.findOne({ _id: req.params.id }, (err, item) => {
    if (err) {
      res.sendStatus(404);
      return console.error(err);
    }
    if (!item) {
      res.sendStatus(404);
    } else {
      res.status(200);
      res.location(path + item._id);
      res.json({ item: item });
    }
  });
});

router.post("/", requireRole(["admin", "user", "shopkeeper"]), (req, res) => {
  User.findOne({ _id: req.token.id })
    .then(user => {
      let newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        seller: user
      });
      newItem.save(err => {
        if (err) {
          res.sendStatus(500);
          return console.error(err);
        }
        console.log("Inserted a new item to collection");
        res.status(201);
        res.location(path + newItem._id);
        res.json(newItem);
      });
    })
    .catch(e => res.sendStatus(500));
});

router.put("/:id", requireRole(["admin", "shopkeeper", "user"]), (req, res) => {
  if (
    (req.token.role === "shopkeeper" || req.token.role === "admin") &&
    req.body.margin &&
    req.body.status
  ) {
    User.findOne({ _id: req.token.id })
      .then(user => {
        Item.findOneAndUpdate(
          { _id: req.params.id },
          { status: req.body.status, margin: req.body.margin, shopkeeper: user }
        ).exec(err => {
          if (err) {
            res.sendStatus(500);
            return console.error(err);
          }
          console.log("Changing item's status to listed");
          res.sendStatus(201);
          return;
        });
      })
      .catch(e => {
        res.sendStatus(500);
        return;
      });
  }
  if (
    (req.token.role === "user" ||
      req.token.role === "admin" ||
      req.token.role === "shopkeeper") &&
    req.body.status === "sold"
  ) {
    User.findOne({ _id: req.token.id })
      .then(user => {
        Item.findOneAndUpdate(
          { _id: req.params.id },
          { status: req.body.status, margin: req.body.margin, buyer: user }
        ).exec(err => {
          if (err) {
            res.sendStatus(500);
            return console.error(err);
          }
          console.log("Changing item's status to sold");
          res.sendStatus(201);
          return;
        });
      })
      .catch(e => {
        res.sendStatus(500);
        return;
      });
  }
});

router.delete("/", requireRole(["admin"]), (req, res) => {
  console.log("Deleting all items from db");
  Item.remove()
    .then(() => res.sendStatus(201))
    .catch(() => res.status(500));
});

router.delete("/:id", requireRole(["admin"]), (req, res) => {
  console.log("Deleting a single item from db");
  Item.deleteOne({ _id: req.params.id })
    .then(() => res.sendStatus(201))
    .catch(e => res.status(500));
});

module.exports = router;
