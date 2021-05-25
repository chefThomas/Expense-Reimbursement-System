import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs';
import getUserFromCookie from './utils/getUserFromCookie'
import deleteCookies from './utils/deleteCookie'

import '../src/styles/custom.css'


// import './App.css';
import LoginPage from './components/pages/LoginPage'
import Main from './components/pages/Main'
import AppNav from './components/AppNav'
import { BrowserRouter as Router, Route } from 'react-router-dom';


const formHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
};

// MAIN APP -- BEGIN
function App() {
  const [ user, setUser ] = useState( null );
  const [ reimReqs, setReimReqs ] = useState( [] );

  useEffect( () => {
    if ( document.cookie ) {
      loadUser();
    } else {
      <Redirect to='login' />
    }
    return () => {
      setUser( null )
      setReimReqs( [] )
    }
  }, [] )


  function loadUser() {
    setUser( getUserFromCookie() )
  }

  // API CALLS
  async function login( formData ) {

    console.log( 'check form data login' )
    console.log( formData )
    const result = await axios.post( 'login', formData, formHeaders );
    console.log( result.data )
    if ( result.data ) {
      const { data: { id, roleId, username } } = result;
      setUser( { id, roleId, username } )
    }
  }

  async function logout() {
    const result = await axios.get( 'logout' )
    console.log( result )
    deleteCookies()
    setUser( null )
  }

  async function addRequest( { amount, desc, typeId } ) {

    //  add employee id rename vars to match params in the back and format as path params because Servlets
    const reqParams = qs.stringify( {
      amount,
      description: desc,
      type: typeId,
      empId: user.id
    } )

    const result = await axios.post( 'emp-reimbursement', reqParams, formHeaders );
    console.log( result )
    // add to state
    setReimReqs( [ ...reimReqs, result ] )
  }

  async function getReqs() {
    console.log( 'get one emp\'s reqs' )
    let { data } = await axios.get( 'emp-reimbursement' )
    return data
  }

  async function getOneEmpsReqs() {

    console.log( 'get one emp\'s reqs' )
    let { data } = await axios.get( 'emp-reimbursement' )
    if ( data ) {
      return data.filter( e => e.statusId == 1 );
    }
  }

  async function getAllReqs() {
    let { data } = await axios.get( 'reimbursements' )
    if ( data ) {
      console.log( data )
      return data
    }
    // filter results for 
  }

  async function approveReq( id ) {
    const reqParams = qs.stringify( { id, manId: user.id } )
    return await axios.post( 'approve-request', reqParams, formHeaders );
  }

  async function rejectReq( id ) {
    const reqParams = qs.stringify( { id, manId: user.id } )
    return await axios.post( 'deny-request', reqParams, formHeaders );
  }

  function getEmployees() {
    console.log( "App: getEmployees() called" )
  }

  return (
    <Router>
      <AppNav user={user} logout={logout} />
      <Route path="/login" exact render={props => ( <LoginPage {...props} login={login} user={user} /> )} />
      <Route path="/" exact render={props => ( <LoginPage {...props} login={login} user={user} /> )} />
      <Route path="/main" render={props => (
        <Main {...props}
          user={user}
          addReq={addRequest}
          getOneEmpsReqs={getOneEmpsReqs}
          getAllReqs={getAllReqs}
          getEmployees={getEmployees}
          approveReq={approveReq}
          rejectReq={rejectReq}
          getReqs={getReqs}
        />
      )
      }
      />
    </Router>
  );
}

export default App;