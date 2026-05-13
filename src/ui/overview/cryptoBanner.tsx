// components/CryptoBanner.tsx

"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { keyframes } from "@emotion/react";
import recorecoin from "../../icons/recorechain/recorecoin.svg";
import Link from "next/link";

// Floating Coin
const floating = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-18px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// Rotate Ring
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Glow Pulse
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: .6;
  }
  50% {
    transform: scale(1.08);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: .6;
  }
`;

// Floating Background
const move = keyframes`
  0% {
    transform: translate(0px,0px);
  }
  50% {
    transform: translate(40px,-30px);
  }
  100% {
    transform: translate(0px,0px);
  }
`;

const CryptoBanner = () => {
    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                background: "#ffffff",
                py: { xs: 8, md: 14 },
                px: 2,
            }}
        >
            {/* Background Gradient Blurs */}
            <Box
                sx={{
                    position: "absolute",
                    width: 420,
                    height: 420,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
                    top: -120,
                    left: -120,
                    animation: `${move} 8s ease-in-out infinite`,
                    filter: "blur(40px)",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    width: 350,
                    height: 350,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
                    bottom: -100,
                    right: -100,
                    animation: `${move} 10s ease-in-out infinite`,
                    filter: "blur(40px)",
                }}
            />

            {/* Grid Background */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
            linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                    maskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)",
                }}
            />

            {/* Main Container */}
            <Box
                sx={{
                    maxWidth: "1250px",
                    mx: "auto",
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    alignItems: "center",
                    gap: { xs: 8, md: 10 },
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {/* LEFT CONTENT */}
                <Box>
                    <Typography
                        data-aos="fade-right"
                        sx={{
                            color: "#557804",
                            fontSize: "14px",
                            fontWeight: 800,
                            letterSpacing: "4px",
                            textTransform: "uppercase",
                            mb: 2,
                            '@media(max-width : 900px)':{
                                textAlign:'center'
                            }
                        }}
                    >
                        Sustainable Blockchain Future
                    </Typography>

                    <Typography
                        data-aos="fade-up"
                        sx={{
                             
                            fontSize: '40px',
                            color: '#000',
                            textAlign: 'left',
                            fontWeight: 'bold',
                            fontFamily: 'Museo 700 !important',
                            '@media(max-width : 900px)':{
                                textAlign:'center',
                                '@media(max-width : 600px)': {
                                    fontSize: '24px'
                                }
                            }
                            
                        }}
                    >
                        ReCore Chain
                    </Typography>

                    <Typography
                        data-aos="fade-up"
                        sx={{
                            mt: 2,
                            color: "#475569",
                            fontSize: { xs: "15px", md: "18px" },
                             
                            maxWidth: "620px",
                            '@media(max-width : 900px)':{
                                textAlign:'center',
                                
                            }
                        }}
                    >
                        ReCore Chain combines renewable energy infrastructure with
                        blockchain technology to build a transparent, scalable and
                        eco-friendly decentralized ecosystem for the future generation.
                    </Typography>

                    {/* Stats Cards */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: 3,
                            mt: 5,
                            flexWrap: "wrap",
                            '@media(max-width : 900px)':{
                             justifyContent:'center',
                             textAlign:'center'
                                 
                            }
                        }}
                    >
                        {[
                            {
                                value: "100%",
                                label: "Renewable",
                            },
                            {
                                value: "24/7",
                                label: "Blockchain",
                            },
                            {
                                value: "AI",
                                label: "Smart Network",
                            },
                        ].map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    minWidth: "140px",
                                    p: 2.5,
                                    borderRadius: "24px",
                                    background: "rgba(255,255,255,0.7)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(15,23,42,0.08)",
                                    boxShadow: "0 10px 40px rgba(15,23,42,0.06)",
                                    '@media(max-width : 900px)':{
                                        minWidth: "300px",
                                    }
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "30px",
                                        fontWeight: 900,
                                        background:
                                            "linear-gradient(90deg,#557804,#557804)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {item.value}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#64748b",
                                        mt: 0.5,
                                        fontSize: "14px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            mt: 5,
                            flexWrap: "wrap",
                            '@media(max-width : 900px)':{
                               justifyContent:'center'
                                 
                            }
                        }}
                    >


                        <Link href={"/dashboard"}>
                            <Button sx={{
                                backgroundColor: '#557804',
                                border: '1px solid transparent',
                                color: '#fff',
                                borderRadius: '5rem',
                                padding: '0.5rem 1.5rem',
                                textTransform: 'capitalize',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    border: '1px solid #557804',
                                    color: '#557804'
                                }
                            }}>
                                Explore Ecosystem
                            </Button>
                        </Link>

                        <Link href={"/dashboard/staking"}>
                                        <Button sx={{
                                            backgroundColor: 'transparent',
                                            border: '1px solid #557804',
                                            color: '#557804',
                                            borderRadius: '5rem',
                                            padding: '0.5rem 1.5rem',
                                            textTransform: 'capitalize',
                                            '&:hover': {
                                                backgroundColor: '#557804',
                                                color: '#fff'
                                            }
                                        }}>
                                            Whitepaper
                                        </Button>
                                    </Link>
                    </Box>
                </Box>

                {/* RIGHT SIDE */}
                <Box
                    sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: { xs: "360px", md: "650px" },
                    }}
                >
                    {/* Rotating Ring */}
                    <Box
                        sx={{
                            position: "absolute",
                            width: { xs: 260, md: 520 },
                            height: { xs: 260, md: 520 },
                            borderRadius: "50%",
                            border: "2px dashed rgba(59,130,246,0.25)",
                            animation: `${rotate} 20s linear infinite`,
                        }}
                    />

                    {/* Inner Glow */}
                    <Box
                        sx={{
                            position: "absolute",
                            width: { xs: 220, md: 420 },
                            height: { xs: 220, md: 420 },
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)",
                            filter: "blur(30px)",
                            animation: `${pulse} 4s ease-in-out infinite`,
                        }}
                    />

                    {/* Coin Image */}
                    <Box
                        sx={{
                            width: { xs: 190, sm: 260, md: 340 },
                            position: "relative",
                            zIndex: 2,
                            animation: `${floating} 5s ease-in-out infinite`,
                        }}
                    >
                        <Image
                            src={recorecoin}
                            alt="ReCore Coin"
                            priority
                            style={{
                                width: "100%",
                                height: "auto",
                                filter:
                                    "drop-shadow(0px 20px 60px rgba(59,130,246,0.25))",
                            }}
                        />
                    </Box>

                    {/* Floating Dots */}
                    {[1, 2, 3, 4, 5].map((item) => (
                        <Box
                            key={item}
                            sx={{
                                position: "absolute",
                                width: item % 2 === 0 ? 16 : 10,
                                height: item % 2 === 0 ? 16 : 10,
                                borderRadius: "50%",
                                background:
                                    item % 2 === 0
                                        ? "linear-gradient(45deg,#06b6d4,#557804)"
                                        : "#557804",
                                top: `${15 + item * 14}%`,
                                left: `${8 + item * 16}%`,
                                animation: `${floating} ${3 + item}s ease-in-out infinite`,
                                filter: "blur(.5px)",
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default CryptoBanner;