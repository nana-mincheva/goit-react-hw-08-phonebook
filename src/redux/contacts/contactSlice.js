import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  fetchContacts,
  deleteContacts,
  addContacts,
} from 'redux/contacts/contactsOperation';

const extraActions = [fetchContacts, deleteContacts, addContacts];
const getActions = type => extraActions.map(action => action[type]);

 export const ContactSlice = createSlice({
  name: 'contacts',
  initialState: {
    entities: [],
    isLoading: false,
    error: null,
   },
  reducers: {},
   extraReducers: builder =>
     builder
       .addCase(fetchContacts.fulfilled, (state, action) => {
  state.entities = action.payload;
       })
       .addCase(deleteContacts.fulfilled, (state, action) => {
         const index = state.entities.findIndex(
           contact => contact.id === action.payload.id
         );
         state.entities.splice(index, 1);
   })
       .addCase(addContacts.fulfilled, (state, action) => {
         state.entities.push(action.payload);
   })
      .addMatcher(isAnyOf(...getActions("pending")), state => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(...getActions("rejected")), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addMatcher(isAnyOf(...getActions("fulfilled")), state => {
        state.isLoading = false;
        state.error = null;
      }),
});

export default ContactSlice.reducer;
