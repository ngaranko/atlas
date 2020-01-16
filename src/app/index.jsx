import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import configureStore from '../store/store'
import routes from './routes'
import resolveRedirects from './redirects'
import './sentry'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

const store = configureStore(routes)

resolveRedirects().then(hasToRedirect => {
  if (!hasToRedirect) {
    // eslint-disable-next-line no-undef,no-console
    console.log(`CityData: version: ${VERSION}, build: ${process.env.NODE_ENV}`)

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root'),
    )
  }
})
