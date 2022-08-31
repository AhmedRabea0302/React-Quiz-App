import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { handleScoreChange } from "../redux/actions";
import { Button, Typography, CircularProgress, LinearProgress } from "@mui/material";
import { CheckCircleOutlineOutlined, Dangerous } from "@mui/icons-material";
import { Box } from "@mui/system";
import useAxios from "../hooks/useAxios";

export default function Questions() {
    // The Buttons Options
    const buttonsOptions = [
        {id: 1, answer: "Noun"},
        {id: 2, answer: "Verb"},
        {id: 3, answer: "Adverb"},
        {id: 4, answer: "Adjective"},
    ]
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [answerValidity, setAnswerValidity] = useState(false);
    const [buttonDisabled, setbuttonDisabled] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [randomWords, setRandomWords] = useState([]);
    
    const {score} = useSelector((state) => state);

    // Call the axios hook to call end point get-random-words
    // To get the words array
    let apiUrl = 'api/get-random-words'
    const { response, error, loading } = useAxios( {url: apiUrl} );

    // Set randomWords with the api response
    useEffect(() => {
        response? setRandomWords(response) : '';
    }, [response]);

    // if still fetching data from server
    // Show circular loader
    if(loading) {
        return (
            <Box mt={20}>
                <CircularProgress />
            </Box>
        )
    }

    // if fetching data failed
    if(error) {
        return (
            <Box mt={20}>
                <Typography variant="h3" color="#e51d74">
                    Something Went Wrong :(
                </Typography>
            </Box>
        )
    }

    // When the user answer a question
    // This function will evaluate the answers and
    // calculate the rank
    const handleClickAnswer = (event) => {

        // Once he click an answer
        // the buttons will be disabled 
        // to show him the answer correctness
        setbuttonDisabled(true);

        // if the answer is right will update the score
        // and set AnswerValidity state to true so we can show 
        // The correct answer icon
        if(event.target.textContent.toLowerCase() == randomWords[questionIndex].pos) {
            dispatch(handleScoreChange(score+10));
            setAnswerValidity(true);
        } else {
            setAnswerValidity(false);
        }

        // To chech if we reached the last question 
        // if reached we will navigate to the final screen
        // and fetch the calculate rank according to final score
        if(questionIndex + 1 < 10) {
            
            setTimeout(() => {
                setQuestionIndex(questionIndex + 1)
                setbuttonDisabled(false)
            }, 1500);
            
        } else {
            setTimeout(() => {
                setQuestionIndex(questionIndex + 1)
            }, 1500)
            setTimeout(() => {
                navigate('/final');
            }, 3800)
        }
    }

    return(
        <Box className="questions--container">
            
            {/* The ProgressBar and progress amount */}   
            <Box mt={4}>
                <LinearProgress variant="determinate" value={(questionIndex) * randomWords.length} />
                <Typography variant="h6">{(questionIndex) * randomWords.length}%</Typography>
            </Box>

            {/**  
              * The Question word that will be showed according to question index
              * and when the buttonDisabled state not equal true
            */} 
            <Box>
                {
                    !buttonDisabled &&
                    <Typography variant="h4" mt={3}>
                        Which Part of Speech is the word: 
                        <strong className="question--word"> {randomWords[questionIndex]?.word} </strong>
                    </Typography>
                }
            </Box>

            {/**  
              * This Box shows two icons according to answerValidity state
              * if it's true will show CheckCircleOutlineOutlined icon and circular progress
              * if not will show Dangerous icon and circular progress
            */} 
            <Box mt={4}>
                { 
                    !answerValidity && buttonDisabled && 
                    <Box className="icon--box">
                        <Dangerous mt={4} className="error--icon"/>
                        <CircularProgress />
                    </Box>
                }

                { 
                    answerValidity && buttonDisabled && 
                    <Box className="icon--box">
                        <CheckCircleOutlineOutlined className="success--icon"/>
                        <CircularProgress />
                    </Box>
                }
            </Box>
            
            {/* Shows When the user answers last question */}
            <Box>
                {
                    questionIndex + 1 > 10 &&
                    <Typography mt={3} variant="subtitle1">
                        Calculating Your final Rank
                    </Typography>
                }
            </Box>

            {/* Buttons Container gets disabled when buttonDisabled state is true */}
            <Box mt={6} className="boxes--container">
                {buttonsOptions.map( ({ id, answer }) => (
                    <Button key={id} onClick={ handleClickAnswer } disabled={buttonDisabled} variant="contained" ml={5}>{ answer }</Button>
                ))}
            </Box>

            {/* Questions Counter */}
            <Box mt={5}>
                Question {questionIndex + 1}/{10}
            </Box>
                 
        </Box>
    );
}