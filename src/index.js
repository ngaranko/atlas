// For now simply import everything we need, from here
import './header/wrappers/header-search/HeaderSearchWrapper'

// All third party dependencies
import './vendor'

// Polyfill for IE11
import './polyfill'

// Styles
import './_styles.scss'

// Actual app
import './app/index'

if (module.hot) module.hot.accept()
