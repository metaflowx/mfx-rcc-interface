"use client";

import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";

const roadmapData = [
  {
    phase: "Phase 1",
    title: "Foundation",
    year: "2025",
    points: [
      "Token launch",
      "Presale & staking",
      "Community building",
      "DEX listing",
    ],
  },
  {
    phase: "Phase 2",
    title: "Expansion",
    year: "2026",
    points: [
      "CEX listings",
      "CoinGecko / CoinMarketCap",
      "Wallet + DEX",
      "Own blockchain",
    ],
  },
  {
    phase: "Phase 3",
    title: "Scale",
    year: "2027",
    points: [
      "Centralized exchange",
      "Global expansion",
      "Partnerships",
    ],
  },
  {
    phase: "Phase 4",
    title: "The Green Grid",
    year: "2030",
    points: [
      "EV charging systems",
      "Smart grid alignment",
      "Energy partnerships",
    ],
  },
];

const MotionBox = motion(Box);

export default function Roadmap() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 14 },
        background: "#ffffff",
      }}
    >
      {/* Animated Background Glow */}
      <Box
        sx={{
          position: "absolute",
          top: -200,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, transparent 0%, transparent 0%)",
          filter: "blur(60px)",
          animation: "float 8s ease-in-out infinite",
          "@keyframes float": {
            "0%": {
              transform: "translateY(0px)",
            },
            "50%": {
              transform: "translateY(30px)",
            },
            "100%": {
              transform: "translateY(0px)",
            },
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: -200,
          right: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, transparent 0%, transparent 0%)",
          filter: "blur(70px)",
        }}
      />

      {/* Grid Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(85,120,4,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(85,120,4,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
        }}
      />

      <Container maxWidth="xl">
        {/* Heading */}
        <Box textAlign="center" mb={{ xs: 8, md: 12 }}>
          <Typography
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2.5,
              py: 1,
              borderRadius: "50px",
              background: "rgba(85,120,4,0.08)",
              color: "#557804",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              mb: 3,
              border: "1px solid rgba(85,120,4,0.12)",
            }}
          >
            <BoltRoundedIcon sx={{ fontSize: "18px" }} />
            Future Development
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "40px", md: "70px" },
              fontWeight: 900,
              lineHeight: 1,
              color: "#111827",
            }}
          >
            ReCore Roadmap
          </Typography>

          <Typography
            sx={{
              mt: 3,
              color: "#6b7280",
              maxWidth: "750px",
              mx: "auto",
              lineHeight: 1.9,
              fontSize: { xs: "15px", md: "17px" },
            }}
          >
            A powerful roadmap focused on blockchain innovation,
            renewable energy infrastructure and global ecosystem
            expansion for the future generation.
          </Typography>
        </Box>

        {/* Timeline Wrapper */}
        <Box
          sx={{
            position: "relative",
            maxWidth: "1250px",
            mx: "auto",
          }}
        >
          {/* Center Line */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: 0,
              transform: "translateX(-50%)",
              width: "5px",
              height: "100%",
              borderRadius: "30px",
              background:
                "linear-gradient(to bottom,#557804,#85bc22,#557804)",
              display: { xs: "none", md: "block" },
              boxShadow: "0 0 30px rgba(85,120,4,0.25)",
            }}
          />

          {roadmapData.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                sx={{
                  position: "relative",
                  mb: { xs: 5, md: 10 },
                  display: "flex",
                  justifyContent: {
                    xs: "center",
                    md: isLeft
                      ? "flex-start"
                      : "flex-end",
                  },
                }}
              >
                {/* Card */}
                <Box
                  sx={{
                    position: "relative",
                    width: { xs: "100%", md: "45%" },
                    borderRadius: "35px",
                    p: { xs: 1.5, md: 2 },
                    overflow: "hidden",
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(245,248,238,0.95))",
                    border:
                      "1px solid rgba(85,120,4,0.12)",
                    boxShadow:
                      "0 25px 60px rgba(85,120,4,0.08)",
                    backdropFilter: "blur(20px)",
                    transition: ".4s",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow:
                        "0 35px 80px rgba(85,120,4,0.16)",
                    },
                  }}
                >
                  {/* Top Glow */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -100,
                      right: -100,
                      width: 220,
                      height: 220,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, rgba(133,188,34,0.16) 0%, transparent 70%)",
                    }}
                  />

                  {/* Phase */}
                  <Box
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      display: "inline-flex",
                      px: 2.5,
                      py: 1,
                      borderRadius: "50px",
                      background:
                        "linear-gradient(90deg,#557804,#85bc22)",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "13px",
                      mb: 2,
                      boxShadow:
                        "0 10px 30px rgba(85,120,4,0.25)",
                    }}
                  >
                    {item.phase}
                  </Box>

                  {/* Year */}
                  {/* <Typography
                    sx={{
                      color: "#557804",
                      fontWeight: 800,
                      fontSize: "15px",
                      mb: 1,
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {item.year}
                  </Typography> */}

                  {/* Title */}
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "30px",
                        md: "38px",
                      },
                      fontWeight: 900,
                      lineHeight: 1.1,
                      color: "#111827",
                      mb: 1.5,
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* Points */}
                  <Box
                    sx={{
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {item.points.map((point, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          mb: 1,
                          p: 1,
                          borderRadius: "16px",
                          background:
                            "rgba(85,120,4,0.04)",
                          border:
                            "1px solid rgba(85,120,4,0.06)",
                        }}
                      >
                        <CheckCircleRoundedIcon
                          sx={{
                            color: "#557804",
                            fontSize: "22px",
                          }}
                        />

                        <Typography
                          sx={{
                            color: "#374151",
                            fontSize: "15px",
                            fontWeight: 600,
                          }}
                        >
                          {point}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Timeline Dot */}
                <Box
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform:
                      "translate(-50%, -50%)",
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg,#557804,#85bc22)",
                    border: "6px solid #fff",
                    boxShadow:
                      "0 0 30px rgba(85,120,4,0.35)",
                    zIndex: 10,
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}
                />
              </MotionBox>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}