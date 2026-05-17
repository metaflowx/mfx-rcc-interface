'use client';

import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Skeleton,
  Paper,
  Dialog,
} from "@mui/material";
import AmountDialog from "./amountDialog";
import HeadingGred from "@/theme/components/headingGred";
import HeadingYellow from "@/theme/components/headingYellow";
import Heading from "@/theme/components/heading";
import { useReadContract } from "wagmi";
import { stakeConfig } from "@/app/constants/contract";
import { useAppKitNetwork } from "@reown/appkit/react";
import { tier } from "../earning/earningTable";
import { formatEther } from "viem";


const dummyData = [
  {
    returnInPercent: 20000, // 2x
    minStaked: "100.00",
    lockPeriod: 6,
  },
  {
    returnInPercent: 30000,
    minStaked: "200.00",
    lockPeriod: 12,
  },
  {
    returnInPercent: 50000,
    minStaked: "500.00",
    lockPeriod: 18,
  },
  {
    returnInPercent: 100000,
    minStaked: "1000.00",
    lockPeriod: 24,
  },
];

export default function Stake() {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { chainId } = useAppKitNetwork();

  const handleOpen = (item: any, index: number) => {
    setOpen(true);
    setSelectedData(item);
    setSelectedId(index);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedData(null);
    setSelectedId(null);
  };

  const totalTierLenth = useReadContract({
    ...stakeConfig,
    functionName: "totalTierLenth",
    chainId: Number(chainId) ?? 56,
  });

  const result = useReadContract({
    ...stakeConfig,
    functionName: "getTierList",
    args: [BigInt(0), BigInt(totalTierLenth?.data || 2)],
    chainId: Number(chainId) ?? 56,
  });


  const isLoading = result.isLoading || totalTierLenth.isLoading;

  return (
    <>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Heading heading={" Staking Rules"} variantt={"h4"} />
      </Box>

      <Grid container spacing={3} mb={4}>
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
            <Grid item xs={12} md={6} lg={3} key={i}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: "transparent",
                  height: 250,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Skeleton variant="rounded" height={50} />
                <Box>
                  <Skeleton height={24} width="50%" sx={{ mx: "auto", my: 1 }} />
                  <Skeleton height={24} width="75%" sx={{ mx: "auto", my: 1 }} />
                  <Skeleton height={20} width="66%" sx={{ mx: "auto", my: 1 }} />
                  <Skeleton
                    variant="rounded"
                    height={50}
                    sx={{ borderRadius: "40px" }}
                  />
                </Box>
              </Paper>
            </Grid>
          ))
          : result?.data && result?.data?.map((item, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Paper
                sx={{
                  p: 1,
                  borderRadius: 4,
                  backgroundColor: "transparent",
                  border: "1px solid transparent",
                  transition: "border 0.3s",
                  borderColor: "#55780457",
                  boxShadow: 'none',
                  "&:hover": {
                    borderColor: "#557804",
                    backgroundColor: '#EBEEE1'
                  },
                }}
              >

                <Box
                  sx={{
                    background: "linear-gradient(85deg, #557804, #557804)",
                    borderRadius: 12,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                  }}
                >
                  <Typography
                    variant="subtitle2"
                    fontSize={16}
                    color={'#fff'}
                    textAlign="center"
                  >
                    {`${item?.lockPeriod} Months Plan`}
                  </Typography>
                </Box>


                <Box
                  mt={4}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={2}
                >
                  <Typography variant="h6" fontWeight={400} color="#000">
                    {/* {(Number(item.returnInPercent) / 1e2) / 2}% APR */}
                    {
                      index === 0 ? '2.5%~6% Monthly' :
                        index === 1 ? '3%~6.5% Monthly' :
                          '5%~7% Monthly'

                    }
                  </Typography>
                  <Heading heading={`Min. Stake $${formatEther(BigInt(item?.minStaked))}`} variantt={"h5"} />
                  {/* <Heading heading={`Withdrawal: ${Number(item?.withdrawnPeriod) / (60 * 60 * 24)} Days`} variantt={"h6"} /> */}
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleOpen(item, index)}
                    sx={{
                      background: 'linear-gradient(85deg, #fff, #fff, #fff)',
                      borderRadius: '30px',
                      padding: '8px 20px',
                      color: '#000',
                      boxShadow: 'none',
                      border: '1px solid #557804'
                    }}
                  >
                    Stake
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        {!isLoading && result?.data?.length === 0 && (
          <Grid item xs={12}>
            <Typography
              variant="h6"
              color="white"
              align="center"
              fontWeight={500}
            >
              No data found.
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Dialog Component */}
      {open && (
        <AmountDialog
          selectedData={selectedData}
          open={open}
          onClose={handleClose}
          selectedId={selectedId}
        />
      )}
    </>
  );
}
