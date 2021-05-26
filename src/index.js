import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './configStore'
import { Provider } from 'react-redux'
import './i18next';
import setAuthToken from './authentication/setAuthToken'

if(localStorage.getItem('jwtToken')){
  setAuthToken(localStorage.getItem('jwtToken'))
}

ReactDOM.render(
    <Provider store={store}>
      <Suspense fallback = {(<div>Loading~~~~~</div>)}>
        <App />
      </Suspense>,
    </Provider>,
  document.getElementById('root')
)
