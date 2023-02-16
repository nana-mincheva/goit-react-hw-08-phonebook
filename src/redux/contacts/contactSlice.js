import { createSlice } from '@reduxjs/toolkit';

import {
  fetchContacts,
  deleteContacts,
  addContacts,
} from 'redux/contacts/contactsOperation';

export const ContactSlice = createSlice({
  name: 'contacts',
  initialState: {
    entities: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.fulfilled]: (state, action) => {
      return {
        ...state,
        entities: action.payload,
      };
    },
    [fetchContacts.pending]: state => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [fetchContacts.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    [deleteContacts.fulfilled]: (state, action) => {
      return {
        ...state,
        entities: state.entities.filter(
          contact => contact.id !== action.payload.id
        ),
      };
    },
    [deleteContacts.pending]: state => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [deleteContacts.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    [addContacts.fulfilled]: (state, action) => {
      return {
        ...state,
        entities: [action.payload, ...state.entities],
      };
    },
    [addContacts.pending]: state => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [addContacts.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});
export default ContactSlice.reducer;
