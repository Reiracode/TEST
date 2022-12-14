import React from 'react';
import { Routes, Route, BrowserRouter, HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.scss';

import Login from './Components/main/Login';
import About from './Components/about/About';
import Inbox from './Components/mailbox/Inbox';
import PoForm from './Components/PoForm';
import PrForm from './Components/PrForm';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './Context';

import Header from './Header';
import PageNotFound from './Components/PageNotFound';

const App = () => {
  return (
    <div className="App">
      <div className="page">
        <BrowserRouter basename="test">
        {/* <BrowserRouter> */}
          <AuthProvider>
            <Header />
            <Routes>  
              <Route/>
                <Route path="/login" element={<Login />} />
                <Route  path='/' element={<PrivateRoute />}> 
                <Route path="/prform" element={<PrForm />} />
                <Route path="/poform" element={<PoForm />} /> 
                <Route path="/about" element={<About />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
              {/* <Route path="*" element={<PageNotFound />} /> */}
            </Routes>
          </AuthProvider>
        </BrowserRouter> 


 

      </div>
    </div>
  );
};

export default App;

//login should not be autoprovider

// Switch：用來包Route與Redirect，
// 只會render第一個與網址匹配的<Route>的component