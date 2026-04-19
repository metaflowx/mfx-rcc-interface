// components/CryptoBanner.tsx

import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import { keyframes } from "@emotion/react";
import recorecoin from "../../icons/recorechain/recorecoin.svg";
import Heading from "@/theme/components/heading";
import Link from "next/link";

// Glow animation
const glow = keyframes`
  0% {
    box-shadow: 0 0 10px 2px #557804;
  }
  50% {
    box-shadow: 0 0 20px 4px rgba(240, 162, 5, 1);
  }
  100% {
    box-shadow: 0 0 10px 2px #557804;
  }
`;

// Spin animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const CryptoBanner = () => {
    return (
        <>
            <Box>
                <Box sx={{
                    marginTop: '4rem',
                    '@media(max-width : 900px)': {
                        marginTop: '0rem',
                        '@media(max-width : 600px)': {
                            // marginTop: '38rem'
                        }
                    }
                }}>
                    <Box data-aos="zoom-in" className="coinbg">


                        <Box
                            sx={{
                                py: 5,
                                display: "flex",
                                justifyContent: "center",
                                position: "relative",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    maxWidth: "1200px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: { xs: 1, sm: 2 },
                                    flexWrap: "wrap",
                                    position: "relative",
                                }}
                            >
                                {/* Animated Image Layer */}
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: { xs: 80, sm: 170, md: 220, lg: 300 },
                                            height: { xs: 80, sm: 170, md: 220, lg: 300 },
                                            animation: `${spin} 30s linear infinite`,
                                            borderRadius: "10px",
                                        }}
                                    >
                                        <Image
                                            data-aos="zoom-out"
                                            src={recorecoin}
                                            alt="Crypto Coins"
                                            priority
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                borderRadius: "10px",
                                            }}
                                        />
                                    </Box>

                                    {/* Glowing Animation Overlay on Central Coin */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            left: "50%",
                                            top: "50%",
                                            transform: "translate(-50%, -50%)",
                                            width: { xs: 80, sm: 100, md: 120, lg: 300 },
                                            height: { xs: 80, sm: 100, md: 120, lg: 300 },
                                            borderRadius: "50%",
                                            animation: `${glow} 2.5s ease-in-out infinite`,
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    textAlign: 'center',
                }}>
                    <Typography data-aos="fade-right" variant="h4"
                        sx={{
                            fontSize: '40px',
                            color: '#000',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontFamily: 'Museo 700 !important',
                            '@media(max-width : 600px)': {
                                fontSize: '24px'
                            }
                        }}
                    >
                        About ReCore Chain
                    </Typography>
                    <Typography data-aos="zoom-in" color={'#000'}
                        sx={{

                            display: 'inline-block',
                            borderRadius: '30px',
                        }}>ReCore Chain is a next-generation decentralized platform focused on renewable energy <Box component={'br'} sx={{ '@media(max-width 900px)': { display: 'none' } }} /> infrastructure and blockchain innovation. We aim to create a sustainable ecosystem powered by <Box component={'br'} sx={{ '@media(max-width 900px)': { display: 'none' } }} /> wind energy and EV charging networks.  </Typography>

                    <Typography data-aos="zoom-in" color={'#000'}
                        sx={{
                            mt: 2,
                            display: 'inline-block',
                            borderRadius: '30px',
                        }}>Our blockchain integrates real-world energy infrastructure with digital assets, allowing investors  <Box component={'br'} sx={{ '@media(max-width 900px)': { display: 'none' } }} /> and users to participate in a transparent and eco-friendly economy.</Typography>
                </Box>
            </Box>
        </>
    );
};

export default CryptoBanner;
