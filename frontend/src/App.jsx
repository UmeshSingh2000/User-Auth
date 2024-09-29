import React from 'react'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/signin' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
