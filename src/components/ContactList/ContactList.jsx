import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";
import ContactListItem from "components/ContactListItem/ContactListItem";

const ContactList = ({ contacts, onRemoveContact }) => (
  <ul className={styles.TaskList}>
    {contacts.map((contact) => (
      <li className = {styles.TaskList_item}key={contact.id}>
        <ContactListItem contact={contact} onRemoveContact={onRemoveContact}/>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  onRemoveContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
  })),
}
export default ContactList;