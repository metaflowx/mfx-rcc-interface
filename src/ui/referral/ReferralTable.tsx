"use client";
import React, { useState } from "react";
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Paper,
  TableContainer,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "clipboard-copy";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useAccount, useReadContract } from "wagmi";
import { Address, formatEther, zeroAddress } from "viem";

import { convertToAbbreviated } from "@/lib/convertToAbbreviated";
import { contractConfig, stakeConfig, iocConfig } from "@/app/constants/contract";
import { toast } from "react-toastify";
import shortenString from "@/lib/shortenString";



export default function ReferralTable() {
  const tabList = [
    { title: "Direct Referral", value: "direct" },
    // { title: "Upline Referral", value: "upline" },
  ];
  const [activeTab, setActiveTab] = useState("direct");
  const [selectedLevel, setSelectedLevel] = useState(1);
  const { chainId } = useAppKitNetwork();
  const { address } = useAccount();

  return (
    <Card sx={{
      marginTop: '1.5rem',

      border: "1px solid #557804",
      borderRadius: "16px",
      bgcolor: "transparent",
      boxShadow: "none",
    }}>
      <CardContent>
        {/* Tabs */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            textColor="inherit"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#557804", // golden orange indicator
                height: "0px",
                borderRadius: "2px",
              },
            }}
            sx={{
              "& .MuiTab-root": {
                color: "#000", // default text color
                textTransform: "none",
                fontWeight: "500",
                border: "1px solid transparent",
                borderRadius: "30px",
                px: 2,
                mx: 1,
                minHeight: "40px",
                "&.Mui-selected": {
                  color: "#557804", // selected text color
                  border: "1px solid #557804", // match card border
                  backgroundColor: "#fff", // light golden bg
                },
                "&:hover": {
                  backgroundColor: "#fff", // hover effect
                  border: "1px solid #557804",
                },
              },
            }}
          >
            {tabList.map((tab) => (
              <Tab key={tab.value} label={tab.title} value={tab.value} />
            ))}
          </Tabs>

        </Box>

        {/* Header with Level Select */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="#000">
            {activeTab === "direct" ? "My Team" : "Upline Referral"}
          </Typography>

          {/* {activeTab === "direct" && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body2" color="white">
                Your Current Active level:{" "}
                {getUserActiveLevel?.data?.toString() ?? "-"}
              </Typography>
              <FormControl size="small" sx={{ minWidth: 140 }}>
                <Select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(Number(e.target.value))}
                  sx={{
                    color: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#FDB355",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#FDB355",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#FDB355",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#557804", // dropdown arrow color
                    },
                    borderRadius: "12px",
                    bgcolor: "transparent",
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: "#1e1e1e", // dropdown background
                        color: "white", // text color
                        "& .MuiMenuItem-root": {
                          "&.Mui-selected": {
                            backgroundColor: "#fff",
                            color: "#557804",
                          },
                          "&:hover": {
                            backgroundColor: "rgba(253, 179, 85, 0.15)",
                          },
                        },
                      },
                    },
                  }}
                >
                  {[1, 2, 3].map((level) => (
                    <MenuItem key={level} value={level}>
                      Level {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>


            </Box>
          )} */}
        </Box>

        {/* Table Section */}
        {activeTab === "direct" ? (
          <DirectReferralTable />
        ) : (
          <UplineReferralTable />
        )}
      </CardContent>
    </Card>
  );
}

const DirectReferralTable = () => {
  const { address } = useAccount();
  const { chainId } = useAppKitNetwork();

  const getRef = useReadContract({
    ...contractConfig,
    functionName: "getReferralsCount",
    args: [address as Address],
    chainId: Number(chainId),
  });

  const dataRef =
    Number(getRef?.data) > 0 ? BigInt(Number(getRef.data)) : BigInt(0);

  const getLevelResult = useReadContract({
    ...contractConfig,
    functionName: "getDirectReferrals",
    args: [address as Address, BigInt(0), BigInt(dataRef)],
    chainId: Number(chainId),
  });

  return (
    <TableContainer component={Paper} sx={{ bgcolor: "transparent", borderRadius: '12px' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ background: "linear-gradient(85deg, #557804, #557804)", color: '#fff', borderBottom: "1px solid #557804" }}>
            <TableCell sx={{ color: '#fff', borderBottom: "1px solid #557804" }}>S.NO</TableCell>
            <TableCell align="center" sx={{ color: '#fff', borderBottom: "1px solid #557804" }}>Address</TableCell>
            <TableCell align="right" sx={{ color: '#fff', borderBottom: "1px solid #557804" }}>Purchase Amount</TableCell>
            <TableCell align="right" sx={{ color: '#fff', borderBottom: "1px solid #557804" }}>Staking Amount</TableCell>
            <TableCell align="right" sx={{ color: '#fff', borderBottom: "1px solid #557804" }}>Staking Bonus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getLevelResult.isLoading ? (
            [...Array(4)].map((_, index) => (
              <TableRow key={index}>
                {[...Array(4)].map((_, i) => (
                  <TableCell sx={{ bgcolor: "#fff", color: '#000', borderBottom: "1px solid #557804" }} key={i}>
                    <Skeleton variant="text" width={100} height={20} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : getLevelResult?.data && getLevelResult?.data?.length > 0 ? (
            getLevelResult.data.map((item: any, index: number) => (
              <TableBodyData
                key={index}
                index={index}
                item={item}
                chainId={Number(chainId)}
              />
            ))
          ) : (
            <TableRow>
              <TableCell sx={{ bgcolor: "#fff", color: '#000', borderBottom: "1px solid #557804" }} colSpan={8} align="center">
                No Data Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const UplineReferralTable = () => {
  const { address } = useAccount();
  const { chainId } = useAppKitNetwork();
  const bonus = [5, 2.5, 1.25];

  // const result = useReadContract({
  //   ...contractConfig,
  //   functionName: "getReferralUplineTree",
  //   args: [address as Address],
  //   chainId: Number(chainId) ?? 56,
  // });



  return (
    <TableContainer component={Paper} elevation={0}
      sx={{
        boxShadow: "none",
        backgroundColor: "transparent",
        border: "none",
        borderRadius
          : '12px'
      }}>
      <Table>
        <TableHead>
          <TableRow sx={{ background: "linear-gradient(85deg, #557804, #557804)", color: '#fff', borderBottom: "1px solid #557804" }}>
            <TableCell sx={{ bgcolor: "#fff", color: '#000', borderBottom: "1px solid #557804" }}>Level</TableCell>
            <TableCell align="center" sx={{ bgcolor: "#fff", color: '#000', borderBottom: "1px solid #557804" }}>Address</TableCell>
            <TableCell align="right" sx={{ bgcolor: "#fff", color: '#000', borderBottom: "1px solid #557804" }}>Bonus</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {result?.data &&
            result?.data.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell sx={{ bgcolor: "#fff", color: '#000', borderBottom: "1px solid #557804" }}>{index + 1}</TableCell>
                <TableCell align="center" sx={{ bgcolor: "#fff", color: '#000', borderBottom: "1px solid #557804" }}>
                  {item !== zeroAddress ? (
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                      {shortenString(item)}
                      <IconButton
                        sx={{ color: '#fff' }}
                        size="small"
                        onClick={() => {
                          copy(item);
                          toast.success("Address copied to clipboard!");
                        }}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell align="right" sx={{ bgcolor: "#fff", color: '#000', borderBottom: "1px solid #557804" }}>{bonus[index]}%</TableCell>
              </TableRow>
            ))}
        </TableBody> */}
      </Table>
    </TableContainer>
  );
};

const TableBodyData = ({
  index,
  item,
  chainId,
}: {
  index: number;
  item: any;
  chainId: number;
}) => {
  const stakeDetail = useReadContract({
    ...stakeConfig,
    functionName: "user2Staker",
    args: [item],
    chainId,
  });

  const { data: saleType2Contribution } = useReadContract({
    ...iocConfig,
    functionName: "user2SaleType2Contributor",
    args: [item, 1],
    chainId,
  });


  return (
    <TableRow key={index}>
      <TableCell sx={{ bgcolor: "#fff", color: '#000', borderBottom: "1px solid #557804" }}>{index + 1}</TableCell>
      <TableCell align="center" sx={{ bgcolor: "#fff", color: '#557804', borderBottom: "1px solid #557804" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
          {shortenString(item)}
          <IconButton sx={{ color: '#000' }} size="small" onClick={() => {
            copy(item);
            toast.success("Address copied to clipboard!");
          }}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell align="right" sx={{ bgcolor: "#fff", color: '#000', borderBottom: "1px solid #557804" }}>
        {saleType2Contribution?.volume
          ? `${convertToAbbreviated(formatEther(saleType2Contribution.volume))} RCC`
          : "0 RCC"}
      </TableCell >
      <TableCell align="right" sx={{ bgcolor: "#fff", color: '#000', borderBottom: "1px solid #557804" }}>
        {stakeDetail?.data
          ? `${convertToAbbreviated(formatEther(stakeDetail.data.volume))} RCC`
          : "0 RCC"}
      </TableCell >
      <TableCell align="right" sx={{ bgcolor: "#fff", color: '#000', borderBottom: "1px solid #557804" }}>10%</TableCell>
    </TableRow>
  );
};
