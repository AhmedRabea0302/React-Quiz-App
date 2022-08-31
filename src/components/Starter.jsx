import { useNavigate } from 'react-router-dom';
import { Button, Typography } from "@mui/material";
import { Box } from '@mui/system'

export default function Settings() {

    const navigate = useNavigate();

    const handlesubmit = (event) => {
        event.preventDefault();
        navigate('/questions');
    }

    return(
        <form onSubmit={handlesubmit}>   
        
            <Box mt={2} width="100%" className="starter--container">
                <Typography variant='h4' mt={3} mb={2}>When Ready Hit Get Started :)</Typography>
                <Typography variant='subtitle1' mb={2} className="starter--intro">
                    In traditional grammar, a part of speech or part-of-speech 
                    is a category of words (or, more generally, of lexical items) 
                    that have similar grammatical properties, 
                    Mainly most of the words in English is
                    one of four Types: Noun, Verb, Adjective, Adverb 
                </Typography>

                <Button fullWidth variant="contained" type="submit" mt={3}>
                    Get Started
                </Button>

            </Box>
        </form>
    );
}