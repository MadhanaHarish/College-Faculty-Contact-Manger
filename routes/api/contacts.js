// routes/api/contacts.js

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Contact = require("../../models/Contact");

const jsonParser = bodyParser.json();

const bcrypt = require("bcryptjs"); // Add bcrypt for password hashing

// @route POST api/contacts/login
// @description Authenticate user
// @access Public
//res.json({ success: true, msg: `Login successful ${contact}` });
router.post("/login", jsonParser, async (req, res) => {
    const { email, password } = req.body;
    Contact.find({ email: email })
    .then(contact => {
        if(contact.length === 0){
            res.json({ success: false, msg: `Incorrect email or password` });
        } else {
            if(contact[0].password === password){
                res.json({
                    success: true,
                    msg: `Login successful`,
                    id : contact[0]._id,
                    name: contact[0].name,
                    email: contact[0].email,
                    phoneNumber: contact[0].phoneNumber,
                    department: contact[0].department,
                    qualification: contact[0].qualification,
                    position: contact[0].position,
                    photo: contact[0].photo,
                    tableData: contact[0].tableData,
                });

            } else {
                res.json({ success: false, msg: `Incorrect email or password` });
            }
        }
    })
});


// @route GET api/contacts/test
// @description tests contacts route
// @access Public
router.get("/test", (req, res) => res.send("Contact route testing!"));

// @route GET api/contacts
// @description Get all contacts
// @access Public
router.get("/", (req, res) => {
  Contact.find()
      .then((contacts) => res.json(contacts))
      .catch((err) =>
          res.status(404).json({nocontactsfound: "No contacts found"}),
      );
});

// @route GET api/contacts/:id
// @description Get single Contact by id
// @access Public
router.get("/contact/:id", (req, res) => {
  Contact.findById(req.params.id)
      .then((Contact) => res.json(Contact))
      .catch((err) =>
          res.status(404).json({nocontactsfound: "No Contact found"}),
      );
});

// @route GET api/contacts
// @description add/save Contact
// @access Public
router.post("/", jsonParser, function (req, res) {
  Contact.create(req.body)
      .then((contact) => res.json({msg: "Contact added successfully"}))
      .catch((err) =>
          res.status(400).json({error: "Unable to add this Contact"}),
      );
});

// @route GET api/contacts/:id
// @description Update Contact
// @access Public
router.put("/:id", jsonParser, function (req, res) {
  Contact.findByIdAndUpdate(req.params.id, req.body)
      .then((contact) => {
        res.json({msg: "Updated successfully"})
      })
      .catch((err) =>
          res.status(400).json({error: "Unable to update the Database"}),
      );
});

// @route GET api/contacts/:id
// @description Delete Contact by id
// @access Public
router.delete("/:id", (req, res) => {
  Contact.findByIdAndDelete(req.params.id)
      .then((contact) => {
        if (!contact) {
          return res.status(404).json({error: "No such Contact found"});
        }
        res.json({msg: "Contact entry deleted successfully"});
      })
      .catch((err) => {
        console.error("Error while deleting contact:", err);
        res.status(500).json({error: "Server error"});
      });
});


module.exports = router;
