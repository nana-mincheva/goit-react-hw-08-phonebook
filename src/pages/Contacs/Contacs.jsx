import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import shortid from 'shortid';

import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { contactFilter } from 'redux/filter/filterSlice';
import * as contactsOperations from '../../redux/contacts/contactsOperation';

import css from './Contacs.module.css';

const Contacs = () => {
  const contacts = useSelector(state => state.contacts.entities);
  const filter = useSelector(state => state.filter.filter);
  const dispatch = useDispatch();
  const addContact = ({ name, number }) => {
    if (
      contacts.find(contact => {
        return contact.name === name;
      })
    ) {
      return alert(`${name} is already in contacts`);
    }
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    dispatch(contactsOperations.addContacts(contact));
  };
  const filterChange = e => {
    dispatch(contactFilter(e.currentTarget.value));
  };
  const filterContact = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });
  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);
  return (
    <main className={css.container}>
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />
        <h2>Contacts</h2>
        <Filter filter={filterChange} />
        <ContactList filter={filterContact} />
      </div>
      <Outlet />
    </main>
  );
};
export default Contacs;
