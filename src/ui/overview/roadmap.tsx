"use client";

import Heading from "@/theme/components/heading";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const roadmapData = [
  {
    phase: "Phase 1",
    title: "2025",
    points: [
      "Concept & Development",
      
    ],
  },
  {
    phase: "Phase 2",
    title: "Q1 2026",
    points: [
      "Website Launch",
      
    ],
  },
  {
    phase: "Phase 3",
    title: "Q3 2026",
    points: [
      "ICO Launch",
       
    ],
  },
  {
    phase: "Phase 4",
    title: "Q4 2026",
    points: [
      "Staking Launch",
       
    ],
  },
  {
    phase: "Phase 5",
    title: "2027",
    points: [
      "Wind Turbine Deployment",
    ],
  },
  {
    phase: "Phase 6",
    title: "2030",
    points: [
      "EV Charging Infrastructure",
    ],
  },
  {
    phase: "Phase 7",
    title: "2030",
    points: [
      "Global Expansion",
    ],
  },
];

const MotionBox = motion(Box);

export default function Roadmap() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
         
        py: 10,
        px: { xs: 2, md: 6 },
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        
        {/* Title */}
        
          
          <Box mb={2} sx={{textAlign:'center'}}>
                    <Heading heading={"ReCore Roadmap"} variantt={"h3"} />

                </Box>

        <Box sx={{ position: "relative" }}>
          
          {/* Vertical Line */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: 0,
              height: "100%",
              width: "2px",
              background:
                "linear-gradient(to bottom, #557804, #557804, #557804)",
              transform: "translateX(-50%)",
              display: { xs: "none", md: "block" },
            }}
          />

          {roadmapData.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                sx={{
                  position: "relative",
                  mb: 8,
                }}
              >
                <Grid
                  container
                  justifyContent={isLeft ? "flex-start" : "flex-end"}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      textAlign: {
                        xs: "left",
                        md: isLeft ? "right" : "left",
                      },
                      px: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize:'20px',
                        color:'#557804',
                        mb: 0.5,
                        '@media(max-width : 900px)':{
                          textAlign:'center'
                        }
                      }}
                    >
                      {item.phase}
                    </Typography>

                    {/* <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, mb: 2 }}
                    >
                      {item.title}
                    </Typography> */}

                    <Box
                      component="ul"
                      sx={{
                        listStyle: "none",
                        p: 0,
                        m: 0,
                        color: "#000",
                        '@media(max-width : 900px)':{
                          textAlign:'center'
                        }
                      }}
                    >
                      {item.points.map((point, i) => (
                        <Typography
                          component="li"
                          key={i}
                          sx={{ mb: 0.5 }}
                        >
                          {point}
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                </Grid>

                {/* Circle Node */}
                <Box
                  sx={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: 10,
                    display: { xs: "none", md: "block" },
                  }}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: "2px solid #557804",
                      background: "#fff",
                      boxShadow: "0 0 15px #557804",
                    }}
                  />
                </Box>
              </MotionBox>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}