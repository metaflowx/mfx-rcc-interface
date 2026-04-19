import { Box, CircularProgress, Typography } from "@mui/material"

const Loading = () => {
    return (
        <>
            <Box sx={{
                backgroundColor: '#fff',
                margin: 'auto',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }} >
                <Box
                    sx={{
                        textAlign: 'center'
                    }}
                >
                    <CircularProgress sx={{ color: "#557804" }} />
                    <Typography color={'#557804'} margin={'auto'}>LOADING...</Typography>
                </Box>
            </Box>

        </>
    )
}

export default Loading