"use client"
import { Box, Typography } from "@mui/material"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


const Error = () => {
    return (
        <>
            <Box sx={{ 
                backgroundColor: '#fff', 
                margin: 'auto', 
                height: '100vh',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
             }} >
                <Box
                sx={{
                    textAlign:'center'
                }}
                >
                <InfoOutlinedIcon sx={{color:"#557804"}} />
                <Typography color={'#557804'} margin={'auto'}>ERROR</Typography>
                </Box>
            </Box>
        </>
    )
}

export default Error