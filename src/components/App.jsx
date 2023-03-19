import ContactForm from './ContactForm/ContactForm'
import React, { Component } from "react";
import shortid from 'shortid';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';


export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" }
    ],
    filter: ""
  };

  componentDidMount() {
 
    const state = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(state);

    if ( parsedContacts) {
      this.setState({contacts: parsedContacts})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState)
    console.log(this.state)
  if (this.state.contacts !== prevState.contacts) {
    localStorage.setItem('contacts',JSON.stringify(this.state.contacts))
  }
}

  addContact = (task) => {
    const searchSameName = this.state.contacts
      .map((cont) => cont.name)
      .includes(task.name);

    if (searchSameName) {
      alert(`${task.name} is already in contacts`);
      Event.preventDefault();
    } else if (task.name.length === 0) {
      alert("Fields must be filled!");
    } else {
      const contact = {
        ...task,
        id: shortid.generate(),
      };

      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
      
    localStorage.setItem('todos', JSON.stringify(contact))
      
    }
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>

        <ContactForm onAddContact={this.addContact} />

        <h2>Contacts</h2>
          <Filter value={filter} onChangeFilter={this.changeFilter} />
       
        
        {visibleContacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        )}
      </div>
    );
  }
}