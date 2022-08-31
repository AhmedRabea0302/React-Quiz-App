import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleScoreChange } from "../redux/actions";
import useAxios from "../hooks/useAxios";

export default function FinalScreen() {

    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const { score, counter } = useSelector((state) => state);
    
    // Call the axios hook to call end point calculate-rank
    // To get the final rank according to score
    let apiUrl = `api/calculate-rank/${score}`
    const { response, error, loading } = useAxios( {url: apiUrl} );

    // Resets The score to start again
    // Redirects to starter page 
    const handleStartAgain = () => {
        dispatch(handleScoreChange(0));
        navigate('/');
    }

    return(
        
        <Box mt={3}>
            <Typography variant="h3" fontWeight="bold" mb={3} color="#fff">
                Your Rank Is: { response }%
            </Typography>

            <Button variant="contained" onClick={handleStartAgain}>Start Again</Button>
        </Box>
    );
}