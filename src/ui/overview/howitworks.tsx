"use client";

import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

import Turbine from "../../icons/recorechain/Turbine.svg";
import arrow from "../../icons/recorechain/arrow.svg";
import arrow2 from "../../icons/recorechain/arrow2.svg";

const StepBox = styled(Box)(({ theme }) => ({
  border: "1px solid #6bb100",
  borderRadius: "12px",
  height: "110px",
  width: "160px",
  position: "relative",
  background: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },

  [theme.breakpoints.down("sm")]: {
    height: "90px",
    width: "100%",
  },
}));

const StepLabel = styled(Box)({
  position: "absolute",
  top: "-14px",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#557804",
  color: "#fff",
  padding: "6px 18px",
  borderRadius: "30px",
  fontSize: "14px",
  fontWeight: 500,
  whiteSpace: "nowrap",
});

const steps = [
  {
    id: 1,
    title: "Step 1",
    description: "Buy ReCore Tokens",
    image: arrow,
  },
  {
    id: 2,
    title: "Step 2",
    description: "Stake Tokens",
    image: arrow2,
  },
  {
    id: 3,
    title: "Step 3",
    description: "Network Powered by Renewable Energy",
    image: arrow,
  },
  {
    id: 4,
    title: "Step 4",
    description: "Earn Rewards",
    image: arrow2,
  },
  {
    id: 5,
    title: "Step 5",
    description: "Support Green Infrastructure",
  },
];

const Howitworks = () => {
  return (
    <Container maxWidth="xl">
      
      {/* Wind Turbine */}
      <Box mt={5} textAlign="center" mb={{ xs: 4, md: 6 }}>
        <Image
          src={Turbine}
          alt="Wind Turbine"
          style={{ maxWidth: "500px", width: "100%", height:'auto' }}
        />
      </Box>

      {/* Steps */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: { xs: 6, md: 1 },
        }}
      >
        {steps.map((step, index) => (
          <Box
            key={step.id}
            sx={{
              display: "flex",
              alignItems: "center",
              width: {
                xs: "100%",
                md: "auto",
              },
            }}
          >
            <StepBox>
              <StepLabel>{step.title}</StepLabel>

              <Typography
                textAlign="center"
                fontSize={{ xs: "13px", md: "14px" }}
              >
                {step.description}
              </Typography>
            </StepBox>

            {/* Arrow Desktop Only */}
            {index !== steps.length - 1 && (
              <Box
                sx={{
                  mx: 1,
                  display: {
                    xs: "none",
                    md: "block",
                  },
                }}
              >
                <Image
                  src={step.image}
                  alt="arrow"
                  width={70}
                  height={40}
                />
              </Box>
            )}
          </Box>
        ))}
      </Box>

    </Container>
  );
};

export default Howitworks;