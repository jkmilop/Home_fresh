import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from 'react-redux'
import { clientesReducer } from './reducers/clientesReducer'
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    //clientes: clientesReducer,
  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});


export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 