import React from 'react';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Homepage from './Pages/Hompage'
import ProtectRoute from './Components/ProtectedRoute';
const App = () => {
  return (
    <div>
      <GoogleOAuthProvider clientId='434335285526-t1akkhfcgg040ua6beh1nd4do699qvbt.apps.googleusercontent.com'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route
              path='/homepage'
              element={
                <ProtectRoute>
                  <Homepage />
                </ProtectRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
