import { Typography } from "@mui/material"

interface props {
    heading: any;
    variantt:any;
}

const HeadingYellow = ({ heading,variantt }: props) => {
    return (
        <>
            <Typography data-aos="zoom-in-up"
                sx={{
                    background: "linear-gradient(85deg, #FDB355, #FEE0A6, #7737DB)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline",
                    fontFamily:'Quantify !important',
                    
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

export default HeadingYellow