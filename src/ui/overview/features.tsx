"use client";

import Heading from "@/theme/components/heading";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const FeatureCard = styled(Box)(({ theme }) => ({
  border: "1px solid #6B8E23",
  borderRadius: "24px",
  padding: "24px",
  background: "transparent",
  height: "100%",
  transition: "0.3s",

  "&:hover": {
    borderColor: "#7fbf00",
    transform: "translateY(-4px)",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "18px",
  },
}));

const EcosystemBox = styled(Box)(({ theme }) => ({
  border: "1px solid #6B8E23",
  borderRadius: "16px",
  padding: "30px",
   
  height: "100%",
  display:'flex',
  alignItems:'center',
  gap:'1rem',
position:'relative',
marginLeft:'1rem',
  [theme.breakpoints.down("md")]: {
    marginTop: "20px",
    marginLeft:'0rem',
  },
}));

const VerticalLabel = styled(Box)(({ theme }) => ({
  position:'absolute',
  left:"-5rem",
   transform:'rotate(270deg)',
  background: "#557804",
  color: "#fff",
  padding: "10px 24px",
  borderRadius: "30px",
  letterSpacing: "2px",

  [theme.breakpoints.down("md")]: {
    left: "50%",
    top: "-18px",
    transform: "translateX(-50%)",
  },
}));

const features = [
  {
    title: "Decentralized Blockchain",
    description:
      "Secure and scalable blockchain technology built for long-term sustainability.",
  },
  {
    title: "Staking Rewards",
    description:
      "Earn passive income by staking ReCore tokens.",
  },
  {
    title: "Wind Turbine Energy",
    description:
      "Renewable wind energy powering decentralized infrastructure.",
  },
  {
    title: "Smart Contracts",
    description:
      "Transparent and automated blockchain operations.",
  },
  {
    title: "EV Charging Network",
    description:
      "Supporting electric vehicle infrastructure globally.",
  },
  {
    title: "ICO Investment",
    description:
      "Participate early in the ReCore Chain ecosystem.",
  },
];

const ecosystem = [
  "Wind Turbine Infrastructure",
  "EV Charging Station",
  "Staking Platform",
  "ICO Platform",
  "Token Economy",
  "Smart Contract Network",
];

const Features = () => {
  return (
    <Box py={{ xs: 6, md: 10 }}>
      <Container maxWidth="xl">
        
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          mb={5}
          gap={2}
           
        >
           <Heading heading={"Features"} variantt={"h3"}/>

          <Box flex={1} mx={3} display={{ xs: "none", md: "block" }}>
            <Divider
              sx={{
                borderColor: "#6B8E23",
              }}
            />
          </Box>

          <Button
            variant="outlined"
            sx={{
              borderColor: "#6B8E23",
              color: "#557804",
              borderRadius: "30px",
              px: 3,

              "&:hover": {
                borderColor: "#557804",
              },
            }}
          >
            View Whitepaper
          </Button>
        </Box>

        {/* Content */}
        <Grid container spacing={3}>
          
          {/* Left Features */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {features.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <FeatureCard>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      mb={1}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.description}
                    </Typography>
                  </FeatureCard>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Ecosystem */}
          <Grid item xs={12} md={4}>
            <EcosystemBox>
              
              <VerticalLabel>
                ECOSYSTEM
              </VerticalLabel>

             <Box>
             <Typography
                variant="h6"
                fontWeight={600}
                mb={2}
              >
                ReCore Chain Ecosystem Includes:
              </Typography>

              <Box>
                {ecosystem.map((item, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    mb={1.5}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#557804",
                        mr: 1.5,
                         
                      }}
                    />

                    <Typography variant="body2">
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
             </Box>

            </EcosystemBox>
          </Grid>

        </Grid>

      </Container>
    </Box>
  );
};

export default Features;