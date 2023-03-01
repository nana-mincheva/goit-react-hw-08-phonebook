import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import css from './ContactList.module.css';
import { deleteContacts } from 'redux/contacts/contactsOperation';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.entities);
  const filter = useSelector(state => state.filter.filter);

  const filterContact = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <ul className={css.list}>
      {filterContact.length > 0 &&
        filterContact.map(({ id, name, number }) => (
          <li className={css.item} key={id}>
            <p className={css.text}>
              {name}: {number}
            </p>
            <button
              className={css.btnDelete}
              type="button"
              onClick={() => {
                dispatch(deleteContacts(id));
              }}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
};

export default ContactList;