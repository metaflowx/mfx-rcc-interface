'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  useMediaQuery,
  Button,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClaimModalConfirmation from '../referral/ClaimModalConfirmation';
import { useAccount, useBlockNumber, useReadContract } from 'wagmi';
import { useAppKitNetwork } from '@reown/appkit/react';
import { useQueryClient } from '@tanstack/react-query';
import { stakeConfig } from '@/app/constants/contract';
import { Address, formatEther } from 'viem';
import moment from "moment";
import shortenString from '@/lib/shortenString';
import { convertToAbbreviated } from '@/lib/convertToAbbreviated';
import copy from "clipboard-copy";

  export const apr = (tierId: number) => {
    if (tierId === 0) {
      return "48";/// min: $20
    }
    if (tierId === 1) {
      return "56"; /// min: $500
    }
    if (tierId === 2) {
      return "72"; /// min: $1000
    }
  }

  export const tier = (tierId: number) => {
    if (tierId === 0) {
      return "Silver";
    }
    if (tierId === 1) {
      return "Gold";
    }
    if (tierId === 2) {
      return "Diamond";
    }
  }

export default function EarningTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClaimChecking, setIsClaimChecking] = useState<
    Record<string, boolean>
  >({
    royalty: false,
    team: false,
    referral: false,
  });

  const { data: blockNumber } = useBlockNumber({ watch: {
      enabled: true,
      pollingInterval: 5_000,
    } });
  const { address } = useAccount();
  const { chainId } = useAppKitNetwork();
  const queryClient = useQueryClient();
  const totalStakeLenth = useReadContract({
    ...stakeConfig,
    functionName: "totalStakedLengthForUser",
    args: [address as Address],
    chainId: Number(chainId) ?? 56,
  });

  const result = useReadContract({
    ...stakeConfig,
    functionName: "user2StakerList",
    args: [address as Address, BigInt(0), BigInt(totalStakeLenth?.data || 0)],
    chainId: Number(chainId) ?? 56,
  });


  const isLoading = result?.isLoading;
  const data = result?.data ?? [];

  useEffect(() => {
    if(!blockNumber) return;
    queryClient.invalidateQueries({
      queryKey: totalStakeLenth.queryKey,
    });
    queryClient.invalidateQueries({
      queryKey: result.queryKey,
    });
  }, [blockNumber, queryClient, !totalStakeLenth.queryKey, !result.queryKey]);

  const handleCopy = (text: string) => {
    copy(text);
    toast.success('Address copied!', {
      position: 'top-right',
      autoClose: 3000,
      theme: 'dark',
    });
  };

  return (
    <Box mt={3}>
      <Box
        data-aos="zoom-in-up"
        sx={{
          border: '1px solid #557804',
          borderRadius: '12px',
          backgroundColor: '#0a0a1f',

        }}
      >
        <Box sx={{ width: '100%', overflowX: 'auto', borderRadius: '12px', }}>
          <Table
            sx={{
              minWidth: 900,
              backgroundColor: '#111827',

            }}
            aria-label="responsive table"
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: '#2D67FE4D' }}>
                {[
                  'USER',
                  'STAKED AMOUNT',
                  'TIER',
                  'APR',
                  'REWARD',
                  'CLAIM REWARD',
                  'START TIME',
                  'LAST CLAIMED',
                  'ACTION',
                ].map((label) => (
                  <TableCell
                    key={label}
                    sx={{
                      backgroundColor: '#557804',
                      color: '#fff',
                      whiteSpace: 'nowrap',
                      borderBottom: '1px solid #557804'
                    }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((item, index) => {
                  const startdate = new Date(Number(item?.startTime) * 1000);
                  const lastdate = new Date(Number(item?.lastClaimTime) * 1000);
                  return (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: index % 2 === 0 ? '#fff' : '#fff',
                      }}
                    >
                      <TableCell sx={{ color: '#000', borderBottom: '1px solid #557804' }}>
                        <Box display="flex" alignItems="center">
                          {address ? shortenString(address) : ""}&nbsp;
                          <ContentCopyIcon
                            fontSize="small"
                            onClick={() => handleCopy(address as string)}
                            style={{ cursor: 'pointer' }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#000', borderBottom: '1px solid #557804' }}>
                        {convertToAbbreviated(Number(formatEther(item?.volume)))} RCC

                      </TableCell>
                      <TableCell sx={{ color: '#000', borderBottom: '1px solid #557804' }}>{tier?.(Number(item?.tierId??0))}</TableCell>
                      <TableCell sx={{ color: '#000', borderBottom: '1px solid #557804' }}>{apr?.(Number(item?.tierId??0)) }%</TableCell>
                      <DailyReward index={index} address={address as Address} />
                      <TableCell sx={{ color: '#000', borderBottom: '1px solid #557804' }}>{parseFloat(formatEther(item?.claimedRewards)).toFixed(4)} RCC</TableCell>
                      <TableCell sx={{ color: '#000', borderBottom: '1px solid #557804' }}>{moment(startdate).format("lll")}</TableCell>
                      <TableCell sx={{ color: '#000', borderBottom: '1px solid #557804' }}>{moment(lastdate).format("lll")}</TableCell>
                      <TableCell sx={{ color: '#000', borderBottom: '1px solid #557804' }}>
                        <Box sx={{ display: 'flex', gap: 1.5 }}>

                          <Button
                            variant="contained"
                            sx={{
                              minWidth: 80,
                              background: "linear-gradient(85deg, #557804, #557804, #557804)",
                              color: "#fff",
                              textTransform: "capitalize",
                              fontWeight: 500,
                              borderRadius: '12px',
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
                          {isModalOpen && (
                            <ClaimModalConfirmation
                              open={isModalOpen}
                              onClose={() => setIsModalOpen(false)}
                              isClaimChecking={isClaimChecking}
                              index={index}
                            />
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ color: '#000',bgcolor:'#fff' }}>
                    No Data Found
                  </TableCell>
                </TableRow>



              )}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}


const DailyReward = ({
  index,
  address,
}: {
  index: number;
  address: Address;
}) => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const queryClient = useQueryClient();
  const { chainId } = useAppKitNetwork();
  const dailyReward = useReadContract({
    ...stakeConfig,
    functionName: "calculateRewards",
    args: [address, BigInt(index)],
    chainId: Number(chainId) ?? 56,
  });
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: dailyReward.queryKey,
    });
    
  }, [blockNumber, queryClient,dailyReward]);

  return (
    <TableCell className="text-white whitespace-pre" sx={{ color: '#fff', borderBottom: 'none' }}>
      {dailyReward?.data
        ? parseFloat(formatEther(dailyReward?.data)).toFixed(4)
        : "0.00"}{" "}
      RCC
    </TableCell>
  );
};