import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/contacts/contactsOperation';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const contacts = useSelector(state => state.contacts.entities);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const addContact = ({ name, number }) => {
    if (
      contacts.find(contact => {
        return contact.name.toLowerCase() === name.toLowerCase() || contact.number === number;
      })
    ) {
      return alert(`${name} is already in contacts`);
    }
    dispatch(addContacts({ name, number }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addContact({ name, number });
    resetForm();
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label>
       <p className={css.title}>Name</p> 
        <input type="text" value={name} name="name" onChange={handleChange} className={css.input} required />
      </label>
      <label >
        <p className={css.title}>Number</p> 
        <input type="tel" value={number} name="number" onChange={handleChange} required />
      </label>
      <button type="submit" className={css.btnSubmit}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;