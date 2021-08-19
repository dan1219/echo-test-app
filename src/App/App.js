import React from 'react'
import {useHistory, Link, Route, Redirect, Switch} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Authorization from '../pages/Authorization/Authorization'
import Registration from '../pages/Registration/Registration'
import PasswordRestoring from '../pages/PasswordRestoring/PasswordRestoring'
import User from '../pages/User/User'
import routes from '../routes/routes'
import { useSelector, useDispatch } from 'react-redux';
import {
  logIn,logOut
} from './appSlice';

const App = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  if (localStorage.getItem('token'))
      dispatch(logIn())
  const loggedIn = useSelector(state => state.app.loggedIn)

  const availableRoutes = loggedIn
    ? routes.authRoutes
    : routes.publicRoutes

  return (
    <div>
      <Switch>
        {
          availableRoutes.map(route => {
            return <Route key={route} path={route.path}>{route.component}</Route>
          })
        }

        <Route path="/">
          {
            loggedIn
              ? (<Redirect to='/user'/>)
              : (<Redirect to='/auth'/>)
          }
        </Route>
      </Switch>
    </div>)
}

export default App
