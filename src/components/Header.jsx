import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export default function Header() {
    return (
        <Box>
            <img src='./src/images/logo.svg' width="60%"/>
            <Typography 
                variant='h3' 
                fontWeight="bold" 
                mt={4} 
                className="app--header"
            >Part of speech Quiz</Typography>
        </Box>
    );
};