const fs = require("fs").promises;
const path = require("path");
require("colors");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        return console.table(JSON.parse(data));
    } catch (err) {
        return console.log(err);
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const dataParse = JSON.parse(data);
        return dataParse.map((data) => {
            if (data.id === contactId) {
                return console.table(data);
            }
        });
    } catch (err) {
        return console.log(err);
    }
}
async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath);
        const dataParse = JSON.parse(data);
        const idContact = Number(dataParse[dataParse.length - 1].id) + 1;
        const newContact = {
            id: idContact.toString(),
            name,
            email,
            phone,
        };

        await fs.writeFile(
            contactsPath,
            JSON.stringify([...dataParse, newContact])
        );
        console.log(`Contacts: ${newContact.name} was added!`.green);
        listContacts();
    } catch (err) {
        return console.log(err);
    }
}
async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const dataParse = JSON.parse(data);
        const removeContact = dataParse.filter((data) => data.id !== contactId);
        fs.writeFile(contactsPath, JSON.stringify(removeContact));
        console.log(`Contact was deleted!`.red);
        listContacts();
    } catch (err) {
        return console.log(err);
    }
}

module.exports = { listContacts, getContactById, addContact, removeContact };
