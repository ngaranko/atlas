import React from 'react'
import ReduxContext from '../../store/reduxContext'
import { routing } from '../routes'
import { getLocationType } from '../../store/redux-first-router/selectors'

const TITLE = 'Data en informatie | Amsterdam'

function useDocumentTitle() {
  const store = React.useContext(ReduxContext)
  const state = store.getState()

  const { title: storeTitle } = Object.values(routing).find(
    value => value.type === getLocationType(state),
  )

  const [documentTitle, setTitle] = React.useState(`${storeTitle} - ${TITLE}`)

  function setDocumentTitle(pageTitle, documentTitleData = []) {
    const newTitle = [pageTitle || storeTitle, ...documentTitleData, TITLE].join(' - ')
    setTitle(newTitle)
    document.title = newTitle

    return newTitle
  }

  return {
    documentTitle,
    setDocumentTitle,
  }
}

export default useDocumentTitle
