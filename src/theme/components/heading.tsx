import { Typography } from "@mui/material"

interface props {
    heading: any;
    variantt: any;
}

const Heading = ({ heading, variantt }: props) => {
    return (
        <>
            <Typography
                data-aos="fade-right"
                sx={{
                    color: '#557804 !important',
                    fontFamily: 'Museo 700',
                    fontWeight: 'bold',

                    '@media (max-width:1200px)': {
                        fontSize: '40px',
                    },
                    '@media (max-width:900px)': {
                        fontSize: '30px',
                        '@media (max-width:600px)': {
                            fontSize: '24px',
                        },
                    },
                }}
                variant={variantt}>{heading}</Typography >
        </>
    )
}

export default Heading