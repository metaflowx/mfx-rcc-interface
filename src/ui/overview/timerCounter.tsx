"use client";

import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";

const TimerCounter = ({ targetTime }: { targetTime: number }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const now = Date.now();
    const difference = targetTime - now; // ✅ targetTime already in ms

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const renderBlock = (value: number | string, label: string) => (
    <Box
      sx={{
        fontSize: "2rem",
        color: "#fff",
        borderRadius: "12px",
        width: { lg: "100px", md: "80px", sm: "120px", xs: "60px" },
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      <Typography variant="body2">{label}</Typography>
      <Typography
        sx={{
          "@media(max-width : 600px)": {
            fontSize: "30px",
          },
        }}
        variant="h3"
        fontWeight={"bold"}
      >
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "5px",
        backgroundColor: "#557804",
        alignItems: "center",
        marginTop: "1.5rem",
        padding: "0.5rem 0rem",
      }}
    >
      {renderBlock(timeLeft.days, "Days")}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Box sx={{ backgroundColor: "#898DA3", width: "1px", height: "3rem" }} />
      </Box>
      {renderBlock(timeLeft.hours, "Hours")}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Box sx={{ backgroundColor: "#898DA3", width: "1px", height: "3rem" }} />
      </Box>
      {renderBlock(timeLeft.minutes, "Mins")}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Box sx={{ backgroundColor: "#898DA3", width: "1px", height: "3rem" }} />
      </Box>
      {renderBlock(timeLeft.seconds, "Secs")}
    </Box>
  );
};

export default TimerCounter;
