import { combineReducers } from "redux";

const formReducer = (state={}, action) => {
    if (action.type=='setform') {
        return action.form;
    }
    return state;
}


const dayCheckListReducer = (state={}, action) => {
    if (action.type=='setAnsweredForTheDay') {
        return action.dates;
    }
    return state;
}

const REHYDRATE_COMPLETE = 'setup/REHYDRATE_COMPLETE';
const persistReducer = (state = false, action) => {
  switch (action.type) {
    case REHYDRATE_COMPLETE:
      return true;

    default:
      return state;
  }
};


export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        form: formReducer,
        dates: dayCheckListReducer,
        persist: persistReducer
    });
}
