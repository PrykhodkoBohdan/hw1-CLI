const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function getListContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await getListContacts();
  const contactById = contacts.find((item) => item.id === contactId.toString());
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await getListContacts();
  const idx = contacts.findIndex((item) => item.id === contactId.toString());
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter(
    (item) => item.id !== contactId.toString()
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contacts[idx];
}

async function addContact(name, email, phone) {
  const contacts = await getListContacts();
  const addedContact = {
    name,
    email,
    phone,
    id: uuidv4(),
  };
  contacts.push(addedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return addedContact;
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
};
