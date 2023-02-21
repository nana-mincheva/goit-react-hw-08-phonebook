import { useState } from 'react';

import css from './ContactForm.module.css';

export default function ContactForm({ addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const formNameChange = e => {
    setName(e.currentTarget.value);
  };

  const formNumberChange = e => {
    setNumber(e.currentTarget.value);
  };

  const formSubmit = e => {
    e.preventDefault();
    addContact({ name, number });
    e.currentTarget.reset();
  };

  return (
    <div className={css.container}>
      <form onSubmit={formSubmit}>
        <p className={css.title}>Contact Name</p>
        <input
          className={css.input}
          placeholder="Name"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={formNameChange}
        />
        <p className={css.title}>Number</p>
        <input
          className={css.input}
          placeholder=" Phone number"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={formNumberChange}
        />
        <button type="submit" className={css.btnSubmit}>
          Add contact
        </button>
      </form>
    </div>
  );
}
