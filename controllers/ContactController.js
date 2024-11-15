const asyncHandler = require("express-async-handler");
const Contact = require("../models/ContactModels");

//@desc Get Contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (request, response) => {
  const contact = await Contact.find({user_id: request.user.id});
  response.status(200).json(contact);
});

//@desc Get Single Contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (request, response) => {
  const contact = await Contact.findById(request.params.id);

  if (!contact) {
    response.status(404);
    throw new Error("Contact not found!");
  }
  response.status(200).json(contact);
});

//@desc  Create Contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (request, response) => {
  const { name, email, phone } = request.body;

  if (!name || !email || !phone) {
    throw new Error("All the fields are required.");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: request.user.id
  });
  response.status(201).json(contact);
});

//@desc  Update Contact
//@route PUT /api/contacts
//@access public
const updateContact = asyncHandler(async (request, response) => {
  const check_contact = await Contact.findById(request.params.id);

  if (!check_contact) {
    response.status(404);
    throw new Error("Contact not found!");
  }
  if(check_contact.user_id.toString() !== request.user.id){
    response.status(403);
    throw new Error("You don't have permission to update this contact!");
  }
  const contact = await Contact.findByIdAndUpdate(
    request?.params?.id,
    request?.body,
    { new: true }
  );
  response.status(201).json(contact);
});

//@desc  Delete Contact
//@route DELETE /api/contacts
//@access public
const deleteContact = asyncHandler(async (request, response) => {
  const contact = await Contact.findById(request.params.id);

  if (!contact) {
    response.status(404);
    throw new Error("Contact not found!");
  }
  if(contact.user_id.toString() !== request.user.id){
    response.status(403);
    throw new Error("You don't have permission to delete this contact!");
  }
  await Contact.deleteOne(contact);
  response.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
