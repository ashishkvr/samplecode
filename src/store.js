import {compose, createStore, applyMiddleware } from "redux";
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist'
import { AsyncStorage } from 'react-native';

const REHYDRATE_COMPLETE = 'setup/REHYDRATE_COMPLETE';

// import thunk from "redux-thunk";
import getRootReducer from "./reducers";

export default function getStore(navReducer) {
    const store = createStore(
        getRootReducer(navReducer),
        undefined,
        compose(
               applyMiddleware(promiseMiddleware, thunkMiddleware, logger),
                autoRehydrate()
            )
    );
    // begin periodically persisting the store
    // persist
    persistStore(store,
    {
        whitelist: ['form'],
        storage: AsyncStorage
    },
  () => store.dispatch({ type: REHYDRATE_COMPLETE })
);

    return store;
}
