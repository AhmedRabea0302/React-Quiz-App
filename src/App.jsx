import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Header from './components/Header'
import Starter from './components/Starter'
import Questions from './components/Questions'
import FinalScreen from './components/FinalScreen'
import { Container } from '@mui/material'
import { Box } from '@mui/system'
import './App.css'
function App() {

  return (

    <Router>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          
          <Header />

          <Routes>
            
            <Route 
              path='/' 
              element={<Starter />} 
              exact 
            >

            </Route>

            <Route 
              path='/questions' 
              element={<Questions />} 
            >

            </Route>

            <Route 
              path='/final' 
              element={<FinalScreen />}
            >

            </Route>

          </Routes>
        </Box>
      </Container>
      
    </Router>
  )
}

export default App
