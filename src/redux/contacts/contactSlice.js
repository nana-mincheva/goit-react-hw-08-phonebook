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


// export const ContactSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     entities: [],
//     isLoading: false,
//     error: null,
//   },
//   extraReducers: {
//     [fetchContacts.fulfilled]: (state, action) => {
//       return {
//         ...state,
//         entities: action.payload,
//       };
//     },
//     [fetchContacts.pending]: state => {
//       return {
//         ...state,
//         isLoading: true,
//       };
//     },
//     [fetchContacts.rejected]: (state, action) => {
//       return {
//         ...state,
//         error: action.payload,
//       };
//     },
//     [deleteContacts.fulfilled]: (state, action) => {
//       return {
//         ...state,
//         entities: state.entities.filter(
//           contact => contact.id !== action.payload.id
//         ),
//       };
//     },
//     [deleteContacts.pending]: state => {
//       return {
//         ...state,
//         isLoading: true,
//       };
//     },
//     [deleteContacts.rejected]: (state, action) => {
//       return {
//         ...state,
//         error: action.payload,
//       };
//     },
//     [addContacts.fulfilled]: (state, action) => {
//       return {
//         ...state,
//         entities: [action.payload, ...state.entities],
//       };
//     },
//     [addContacts.pending]: state => {
//       return {
//         ...state,
//         isLoading: true,
//       };
//     },
//     [addContacts.rejected]: (state, action) => {
//       return {
//         ...state,
//         error: action.payload,
//       };
//     },
//   },
// });

export default ContactSlice.reducer;
