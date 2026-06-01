"use client"
import { Box, Typography, styled } from "@mui/material";
import Header from "../shared/Header";
import Bnr from "./bnr";
import CryptoBanner from "./cryptoBanner";
 
import Tokenomics from "./tokenomics";
 
import Faqs from "./faqs";

import Footer from "../shared/footer";
 
import Roadmap from "./roadmap";
import Howitworks from "./howitworks";
import Features from "./features";
import BitcoinNews from "./bitcoinNews";














const Homecmp = () => {
    return (

        <>
            <Box
                sx={{
                    backgroundColor: '#fff',
                    overflow: 'hidden'
                }}>
                <Box className="bnrbg" sx={{
                    padding: '0rem 3rem',
                    '@media(max-width : 900px)': {
                        padding: '0rem 1rem',
                    }
                }}>
                    <Box sx={{ paddingTop: '2rem' }}> <Header /></Box>
                   <Box component={'section'} id="home"> <Bnr /></Box>
                </Box>
                <BitcoinNews/>
                <Box
                    sx={{
                        padding: {
                            xs: '0rem 1rem',
                            sm: '0rem 1.5rem',
                            md: '0rem 2rem',
                            lg: '0rem 3rem',
                        },

                    }}>
                    
                    <Box component={'section'} id="about">    <CryptoBanner /></Box>
                    <Box component={'section'} id="howitworks">    <Howitworks /></Box>
                    {/* <Trading /> */}

                    <Box component={'section'} id="features">    <Features /></Box>

                </Box>




                <Box component={'section'} id="tokenomics">  <Tokenomics /></Box>

                <Box
                    sx={{
                        padding: {
                            xs: '0rem 1rem',
                            sm: '0rem 1.5rem',
                            md: '0rem 2rem',
                            lg: '0rem 3rem',
                        },
                    }}>
                    <Box component={'section'} id="roadmap"> <Roadmap /></Box>




                    <Box component={'section'} id="faq"><Faqs /></Box>
                    {/* <Roadmaptest/> */}
                    <Footer />
                </Box>








            </Box>
        </>

    );
}


export default Homecmp