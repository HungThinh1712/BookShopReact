import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './configStore'
import { Provider } from 'react-redux'
import setAuthToken from './authentication/setAuthToken'

if(localStorage.getItem('jwtToken')){
  setAuthToken(localStorage.getItem('jwtToken'))
}

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
)
