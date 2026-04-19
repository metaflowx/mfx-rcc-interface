"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Typography,
  Grid,
  Card,
  CardContent,
  TableContainer,
  Paper,
} from "@mui/material";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useQueryClient } from "@tanstack/react-query";
import { Address, formatEther } from "viem";
import { useAccount, useBlockNumber, useReadContracts } from "wagmi";

import { contractConfig } from "@/app/constants/contract";
import { convertToAbbreviated } from "@/lib/convertToAbbreviated";
import ClaimModalConfirmation from "./ClaimModalConfirmation";
import REFERRALS from '../../../src/icons/recorechain/ref.svg'
import EARNINGS from '../../../src/icons/recorechain/earn.svg'
import CLAIMED from '../../../src/icons/recorechain/claim.svg'
import Image from "next/image";


export default function ReferralDashboard() {
  const { address } = useAccount();
  const { chainId } = useAppKitNetwork();
  const { data: blockNumber } = useBlockNumber({ watch: {
      enabled: true,
      pollingInterval: 5_000,
    } });
  const queryClient = useQueryClient();

  const result = useReadContracts({
    contracts: [
      {
        ...contractConfig,
        functionName: "getTotalReferralRewards",
        args: [address as Address],
        chainId: Number(chainId) ?? 56,
      },
      {
        ...contractConfig,
        functionName: "getReferralsCount",
        args: [address as Address],
        chainId: Number(chainId) ?? 56,
      },
      {
        ...contractConfig,
        functionName: "getReferrer",
        args: [address as Address],
        chainId: Number(chainId) ?? 56,
      },
    ],
  });

  const dataList1 = [
    {
      title: "YOUR REFERRALS",
      value: result?.data?.[1]?.result ? Number(result?.data[1]?.result) : 0,
      logo: REFERRALS,
    },
    {
      title: "YOUR REFERRAL EARNINGS",
      value: `${
        result?.data?.[0]?.result
          ? convertToAbbreviated(
              Number(formatEther(BigInt(result?.data[0]?.result?.[0])))
            )
          : 0
      } RCC`,
      logo: EARNINGS,
    },
    {
      title: "YOUR REFERRALS CLAIMED",
      value: `${
        result?.data?.[0]?.result
          ? convertToAbbreviated(
              Number(formatEther(BigInt(result?.data[0]?.result?.[1])))
            )
          : 0
      } RCC`,
      logo: CLAIMED,
    },
  ];

  useEffect(() => {
    if(!blockNumber) return;
    queryClient.invalidateQueries({
      queryKey: result.queryKey,
    });
  }, [blockNumber, queryClient, !result.queryKey]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Cards Section */}
      <Grid container spacing={3}>
        {dataList1.map((item, index) => (
          <Grid key={index} item xs={12} sm={4}>
            <Card
              sx={{
                height: "100%",
                border: "1px solid #557804",
                borderRadius: "16px",
                bgcolor: "transparent",
                boxShadow: "none",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "12px",
                      background: "linear-gradient(85deg, #fff, #fff)",
                      border:'1px solid #557804',
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={item.logo}
                      style={{ width: 40, height: 40 }}
                      alt={item.title}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#999999", fontWeight: 500 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        background: "linear-gradient(85deg, #000, #000)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Table Section */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card
            sx={{
              border: "1px solid #557804",
              borderRadius: "16px",
              bgcolor: "#fff",
              
            }}
          >
            <CardContent>
              <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: "linear-gradient(85deg, #557804, #557804)" }}>
                      <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                        Level
                      </TableCell>
                      <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                        Referral Earning
                      </TableCell>
                      <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                        Referral Claimed
                      </TableCell>
                      <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                        Last Claimed Date
                      </TableCell>
                      <TableCell sx={{ color: "#fff", fontWeight: 600 }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[1, 2, 3].map((level) => (
                      <TableBodyData
                        key={level}
                        index={level}
                        address={address as Address}
                        chainId={Number(chainId)}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

const TableBodyData = ({
  index,
  address,
  chainId,
}: {
  index: number;
  address: Address | undefined;
  chainId: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClaimChecking, setIsClaimChecking] = useState<
    Record<string, boolean>
  >({
    royalty: false,
    team: false,
    referral: false,
  });

  const { data: getReferralRewardsResult } = useReadContracts({
    contracts: [
      {
        ...contractConfig,
        functionName: "getReferralRewards",
        args: [address as Address, BigInt(index)],
        chainId: Number(chainId) ?? 56,
      },
    ],
  });

  return (
    <TableRow>
      <TableCell sx={{bgcolor:"#fff", color:'#000', borderBottom:"1px solid #557804"}}>{index}</TableCell>
      <TableCell sx={{bgcolor:"#fff", color:'#000', borderBottom:"1px solid #557804"}}>
        {getReferralRewardsResult?.[0]?.result
          ? convertToAbbreviated(
              Number(
                formatEther(BigInt(getReferralRewardsResult?.[0].result?.amount))
              )
            )
          : 0}{" "}
        RCC
      </TableCell>
      <TableCell sx={{bgcolor:"#fff", color:'#000', borderBottom:"1px solid #557804"}}>
        {getReferralRewardsResult?.[0]?.result
          ? convertToAbbreviated(
              Number(
                formatEther(BigInt(getReferralRewardsResult?.[0].result?.claimed))
              )
            )
          : 0}{" "}
        RCC
      </TableCell>
      <TableCell sx={{bgcolor:"#fff", color:'#000', borderBottom:"1px solid #557804"}}>
        {getReferralRewardsResult?.[0]?.result &&
        getReferralRewardsResult?.[0]?.result?.lastClaimTime > 0
          ? new Date(
              Number(getReferralRewardsResult?.[0].result?.lastClaimTime) * 1000
            ).toLocaleString()
          : "-"}
      </TableCell>
      <TableCell sx={{bgcolor:"#fff", color:'#000', borderBottom:"1px solid #557804"}}>
        <Button
          variant="contained"
          sx={{
            minWidth: 80,
            background: "linear-gradient(85deg, #557804, #557804, #557804)",
            color: "#fff",
            textTransform: "capitalize",
            fontWeight: 500,
            borderRadius:'30px',
            "&:hover": {
              background: "linear-gradient(85deg, #557804, #557804, #557804)",
            },
          }}
          onClick={() => {
            setIsClaimChecking({
              ...isClaimChecking,
              ["referral"]: true,
            });
            setIsModalOpen(true);
          }}
        >
          Claim
        </Button>
      </TableCell>
      {isModalOpen && (
        <ClaimModalConfirmation
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isClaimChecking={isClaimChecking}
          level={index}
        />
      )}
    </TableRow>
  );
};
