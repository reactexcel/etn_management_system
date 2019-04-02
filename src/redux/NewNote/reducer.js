import { handleActions } from "redux-actions";
import update from "immutability-helper";
import constants from "../constants";

const initialState = {
  listNotes: {
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  createNote: {
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  deleteNote:{
    isLoading: false,
    isSuccess: false,
    isError: false
  },
  noteDataCopy: [],
  noteData: []
};

// const handleAddNewNote = (state, action) =>
//   update(state, {
//     noteData: {
//       $push: [
//         {
//           isin: "",
//           client_details: "",
//           sales: "",
//           currency: "",
//           issue_date: "",
//           maturity_date: "",
//           denomination: "",
//           number_of_units: 0,
//           standard_spread: 0,
//           brokerage_fees: 0,
//           sales_management_fees: 0,
//           client_management_fees: 0,
//           one_off_fee: 0,
//           issuance_cost: 0,
//           running_cost: 0
//         }
//       ]
//     }
//   });
const handleUpdateNewNote = (state, action) =>
  update(state, {
    noteDataCopy: {
      [action.payload.id]: {
        $merge: {
          [action.payload.title]: action.payload.value
        }
      }
    }
  });

const handleResetNote = (state, action) =>
  update(state, { noteDataCopy: { $set: state.noteData } });

const handleUpdateNoteRequest = (state, action) =>
  update(state, {
    listNotes: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleUpdateNoteSuccess = (state, action) =>
  update(state, {
    listNotes: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    }
  });
const handleUpdateNoteError = (state, action) =>
  update(state, {
    listNotes: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleListNotesRequest = (state, action) =>
  update(state, {
    listNotes: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleListNotesSuccess = (state, action) =>
  update(state, {
    listNotes: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    },
    noteDataCopy: {
      $set: action.payload
    },
    noteData: {
      $set: action.payload
    }
  });
const handleListNotesError = (state, action) =>
  update(state, {
    listNotes: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

const handleCreateNoteRequest = (state, action) =>
  update(state, {
    createNote: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
const handleCreateNoteSuccess = (state, action) =>
  update(state, {
    createNote: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    },
    noteDataCopy: {
      $push: [action.payload]
    },
    noteData: {
      $push: [action.payload]
    }
  });
const handleCreateNoteError = (state, action) =>
  update(state, {
    createNote: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });
  const handleDeleteNoteRequest = (state, action) =>
  update(state, {
    createNote: {
      isLoading: { $set: true },
      isSuccess: { $set: false },
      isError: { $set: false }
    }
  });
  const handleDeleteNoteSuccess = (state, action) =>
  update(state, {
    createNote: {
      isLoading: { $set: false },
      isSuccess: { $set: true },
      isError: { $set: false }
    }
  });
  const handleDeleteNoteError = (state, action) =>
  update(state, {
    createNote: {
      isLoading: { $set: false },
      isSuccess: { $set: false },
      isError: { $set: true }
    }
  });

export default handleActions(
  {
    [constants.LIST_NOTES_REQUEST]: handleListNotesRequest,
    [constants.LIST_NOTES_SUCCESS]: handleListNotesSuccess,
    [constants.LIST_NOTES_ERROR]: handleListNotesError,
    [constants.CREATE_NOTE_REQUEST]: handleCreateNoteRequest,
    [constants.CREATE_NOTE_SUCCESS]: handleCreateNoteSuccess,
    [constants.CREATE_NOTE_ERROR]: handleCreateNoteError,
    // [constants.ADD_NEW_NOTE]: handleAddNewNote,
    [constants.UPDATE_NEW_NOTE]: handleUpdateNewNote,
    [constants.RESET_NOTE]: handleResetNote,
    [constants.UPDATE_NOTE_REQUEST]: handleUpdateNoteRequest,
    [constants.UPDATE_NOTE_SUCCESS]: handleUpdateNoteSuccess,
    [constants.UPDATE_NOTE_ERROR]: handleUpdateNoteError,
    [constants.DELETE_NOTE_REQUEST]:handleDeleteNoteRequest,
    [constants.DELETE_NOTE_SUCCESS]:handleDeleteNoteSuccess,
    [constants.DELETE_NOTE_ERROR]:handleDeleteNoteError
  },
  initialState
);
