import  Reducer  from "./store/reducer";
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const store = createStore(Reducer, applyMiddleware(thunk))
export default store;