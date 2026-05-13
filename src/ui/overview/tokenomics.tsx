"use client";

import { Box, Grid, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import tokenomicsicon from '../../icons/recorechain/tokenomicsicon.svg'
import Image from "next/image";
import Heading from "@/theme/components/heading";

const DistributeItem = [
  {
    id: 1,
    title: "Staking & Mining",
    circleColor: "linear-gradient(91deg, #557804, #55780400)",
    percentage: "30%",
    Color: "#557804",
  },
  {
    id: 2,
    title: "Liquidity & Exchange",
    circleColor: "linear-gradient(91deg, #90B40D, #90b40d00)",
    percentage: "15%%",
    Color: "#90B40D",
  },
  {
    id: 3,
    title: "Presale / Public",
    circleColor: "linear-gradient(91deg, #64764D, #64764d00)",
    percentage: "15%",
    Color: "#64764D",
  },
  {
    id: 4,
    title: "Ecosystem & DAO",
    circleColor: "linear-gradient(91deg, #3EA618, #3ea61800)",
    percentage: "15%",
    Color: "#3EA618",
  },
  {
    id: 5,
    title: "Team & Advisors",
    circleColor: "linear-gradient(91deg, #3EA35E, #3ea35e00)",
    percentage: "10%",
    Color: "#3EA35E",
  },
  {
    id: 6,
    title: "Marketing",
    circleColor: "linear-gradient(91deg, #5CB132, #5cb13200)",
    percentage: "10%",
    Color: "#5CB132",
  },
  {
    id: 7,
    title: "Emergency Reserve",
    circleColor: "linear-gradient(91deg, #329E54, #329e5400)",
    percentage: "5%",
    Color: "#329E54",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const Tokenomics = () => {
  return (
    <Container maxWidth="xl">

      {/* Title Section */}

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Box textAlign="center" py={{ xs: 6, md: 10 }}>

        <Box mb={2} sx={{textAlign:'center'}}>
                    <Heading heading={"Tokenomics"} variantt={"h3"} />

                </Box>

          <Box
            display="flex"
            justifyContent="center"
            gap={3}
            flexWrap="wrap"
          >
            <Typography color="black">
              Total Supply: 210,000 RCC
            </Typography>

            <Typography color="black">
              Circulating Supply: 5,000 RCC
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            gap={3}
            flexWrap="wrap"
            mt={1}
          >
            <Typography color="black">
              Blockchain: ReCore Chain Blockchain
            </Typography>

            <Typography color="black">
              Utility: Staking, Mining, Rewards, Ecosystem Usage
            </Typography>
          </Box>

        </Box>
      </motion.div>

      {/* Center Graphic */}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Grid container spacing={3} alignItems="center">

          <Grid item xs={12} lg={4} textAlign="center">
            
          </Grid>

          <Grid item xs={12} lg={4} textAlign="center">
            <Image src={tokenomicsicon} alt="" style={{width:'100%', height:'auto'}}/>
          </Grid>

          <Grid item xs={12} lg={4} textAlign="center">
             
          </Grid>

        </Grid>
      </motion.div>

      {/* Distribution */}

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent={{ xs: "left", lg: "space-between" }}
        gap={1}
        mt={8}
      >
        {DistributeItem.map((item, index) => (
          <motion.div
            key={item.id}
            custom={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >

            <Box minWidth="140px">

              <Box display="flex" alignItems="center" gap={1}>

                <Box
                  sx={{
                    height: 24,
                    width: 24,
                    borderRadius: "50%",
                    background: item.circleColor,
                  }}
                />

                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ color: item.Color }}
                >
                  {item.percentage}
                </Typography>

              </Box>

              <Typography
                fontWeight={600}
                fontSize="18px"
                color="black"
              >
                {item.title}
              </Typography>

            </Box>

          </motion.div>
        ))}
      </Box>

    </Container>
  );
};

export default Tokenomics;