const contactsOperations = require("./contacts");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.getListContacts();
      console.table(contacts);
      break;

    case "get":
      const contactById = await contactsOperations.getContactById(id);
      if (!contactById) {
        throw new Error(`Contact with id=${id} doesn ton exist`);
      }
      console.table(contactById);
      break;

    case "add":
      const addedContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.table(addedContact);
      break;

    case "remove":
      const removedContact = await contactsOperations.removeContact(id);
      if (!removedContact) {
        throw new Error(`Contact with id=${id} does not exist`);
      }
      console.table(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);