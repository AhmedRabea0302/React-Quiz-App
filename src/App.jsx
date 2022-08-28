import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Settings from './components/Settings'
import Questions from './components/Questions'
import FinalScreen from './components/FinalScreen'
import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'

function App() {

  return (

    <Router>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Typography variant='h1' fontWeight="bold">Quiz App</Typography>

          <Routes>
            
            <Route 
              path='/' 
              element={<Settings />} 
              exact 
            >

            </Route>

            <Route 
              path='/questions' 
              element={<Questions />} 
            >

            </Route>

            <Route 
              path='/score' 
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
