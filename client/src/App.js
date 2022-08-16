import './App.css';
import DefaultLayout from './layouts/DefaultLayout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import LoginLayout from './layouts/LoginLayout';
import React, { useEffect, useState } from 'react'

function App() {
  
  const [isLogin, setIsLogin] = useState(false)
  if (isLogin === false) {
    window.history.pushState('Login', 'Title Login', '/login')
    return (
      <Router>
          <Routes>
              {
                publicRoutes.map((route, index)=> {
                  const Page = route.component
                  let Layout=LoginLayout
                  if (localStorage.getItem('name') === "admin" && localStorage.getItem('pass') === "admin")
                  {
                    setIsLogin(true)
                    window.history.pushState('Home', 'Title Home', '/')

                  }
                  return <Route key={index} path={route.path} element={
                    <Layout>
                        <Page />
                    </Layout>} />
                })

              }
          </Routes>
      </Router>
    )
  } else 
  return (
    <Router
      className="router" 
      style={{
        // backgroundColor: "#f7f1e3"
      }}
    >
        <Routes>
        {
          privateRoutes.map((route, index)=> {
            const Page = route.component
            let Layout = DefaultLayout
            return <Route key={index} path={route.path} element={
              <Layout>
                  <Page />
              </Layout>} /> 
          })
          
        }
        </Routes>
    </Router>
  );
}

export default App;

