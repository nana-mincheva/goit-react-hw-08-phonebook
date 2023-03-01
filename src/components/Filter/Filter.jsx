import React from 'react';
import { useDispatch } from 'react-redux';
import { contactFilter } from 'redux/filter/filterSlice';

import css from './Filter.module.css';

const Filter = () => {
const dispatch = useDispatch();

  const onChange = e => {
  dispatch(contactFilter(e.target.value));
  };
  return (
    <>
      <p className={css.title}>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        onChange={onChange}
      />
    </>
  );
};


export default Filter;

