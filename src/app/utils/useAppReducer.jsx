import React, { createContext, useContext, useMemo, useReducer } from 'react'
import PropTypes from 'prop-types'
import { actionsCreator } from '../react-reducers'

export const AppStateContext = createContext()
export const AppStateProvider = ({ reducer, initialState, children }) => {
  const value = useReducer(reducer, initialState)

  const memoValue = useMemo(() => value, [value])
  return <AppStateContext.Provider value={memoValue}>{children}</AppStateContext.Provider>
}

AppStateProvider.propTypes = {
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
}

export const useAppReducer = (reducerKey, context) => {
  const [state, dispatch] = context || useContext(AppStateContext)

  return reducerKey ? [state[reducerKey], actionsCreator(dispatch, reducerKey)] : [state, dispatch]
}
