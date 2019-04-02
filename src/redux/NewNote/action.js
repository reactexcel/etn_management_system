import * as actions from "../actions";
import { call, put } from "redux-saga/effects";
import fireAjax from "../../services/fireAjax";
import { toast } from "react-toastify";

export function* createNoteRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "POST",
      "note/createNote",
      action.payload
    );
    if (response && response.status == 200) {
      toast.success("Note Added");
      yield put(actions.createNoteSuccess(response.data.data));
    } else {
      toast.error("Something went Wrong");
      yield put(actions.createNoteError());
    }
  } catch (e) {
    toast.error("Something went Wrong");
    yield put(actions.createNoteError(e));
  }
}

export function* deleteNoteRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "DELETE",
      `note/deleteNote/${action.payload}`,
      action.payload
      );
      
      if (response && response.status == 200) {
        toast.success("Note Deleted");
        yield put(actions.deleteNoteSuccess(response.data.data));
        yield put(actions.listNotesRequest())
      } else {
        toast.error("Something went Wrongdsfsdf");
        yield put(actions.deleteNoteError());
      }
    } catch (e) {
    toast.error("Something went Wrong");
    yield put(actions.deleteNoteError(e));
  }
}

export function* listNotesRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "GET",
      "note/listNotes?confirm_status=false",
      {}
    );
    if (response && response.status == 200) {
      yield put(actions.listNotesSuccess(response.data.data));
    } else {
      yield put(actions.listNotesError());
    }
  } catch (e) {
    yield put(actions.listNotesError(e));
  }
}

export function* updateNoteRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "PUT",
      "note/updateNote",
      action.payload
    );
    if (response && response.status == 200) {
      if (action.payload.confirm_status) {
        toast.success("Note Confirmed");
      } else {
        toast.success("Note Updated");
      }
      if (action.payload.confirm_status) {
        yield put(actions.getCertificatesRequest());
      }
      yield put(actions.listNotesRequest());
      yield put(actions.updateNoteSuccess());
    } else {
      toast.error("Something went wrong while updating note");
      yield put(actions.updateNoteError());
    }
  } catch (e) {
    toast.error("Something went wrong while updating note");
    yield put(actions.updateNoteError(e));
  }
}
