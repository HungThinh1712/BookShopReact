import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './configStore'
import { Provider } from 'react-redux'
import setAuthToken from './authentication/setAuthToken'
import {} from 'react-redux'

if(localStorage.getItem('jwtToken')){
  setAuthToken(localStorage.getItem('jwtToken'))
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
