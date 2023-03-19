import React from 'react'
import styles from "../ContactList/ContactList.module.css";

export default function ContactListItem({ contact, onRemoveContact }) {
  return (
    <div>
      {contact.name + ":" + contact.number}
        {
          <button
            className={styles.TaskList_button}
            type="button"
            name="delte"
            onClick={() => onRemoveContact(contact.id)}
          >
            delete
          </button>
        }
    </div>
  )
}
