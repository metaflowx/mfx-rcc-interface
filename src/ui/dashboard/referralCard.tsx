'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  useMediaQuery,
  Stack,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTheme } from '@mui/material/styles';
import ShareModal from './shareModal';

// ✅ Toastify imports
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Heading from '@/theme/components/heading';
import Image from 'next/image';

import { useAccount, useBlockNumber, useReadContracts } from 'wagmi';
import { useAppKitNetwork } from '@reown/appkit/react';
import { useQueryClient } from '@tanstack/react-query';
import { contractConfig } from '@/app/constants/contract';
import { Address, formatEther } from 'viem';
import REFERRALS from '../../../src/icons/recorechain/ref.svg'
import EARNINGS from '../../../src/icons/recorechain/earn.svg'
import CLAIMED from '../../../src/icons/recorechain/claim.svg'
import { convertToAbbreviated } from '@/lib/convertToAbbreviated';
import shortenString from '@/lib/shortenString';



export default function ReferralCard({ type }: { type?: string }) {
  const { address } = useAccount();
  const { chainId } = useAppKitNetwork();
  const { data: blockNumber } = useBlockNumber({
    watch: {
      enabled: true,
      pollingInterval: 5_000,
    }
  });
  const queryClient = useQueryClient();
  const [url, setUrl] = useState('');
  const [url1, setUrl1] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(`${window.location.host}/dashboard/staking?ref=${shortenString(address || "")}`);
      setUrl1(`${window.location.host}/dashboard/staking?ref=${address}`);

    }
  }, [address]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url1);
    toast.success('Referral link copied!', {
      position: 'top-right',
      autoClose: 3000,
      theme: 'dark',
    });
  };

  const result = useReadContracts({
    contracts: [
      {
        ...contractConfig,
        functionName: "getReferralRewards",
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
      value: `${result?.data?.[0]?.result
        ? convertToAbbreviated(
          Number(formatEther(BigInt(result?.data[0]?.result)))
        )
        : 0
        } RCC`,
      logo: EARNINGS,
    },
    // {
    //   title: "YOUR REFERRALS CLAIMED",
    //   value: `${result?.data?.[0]?.result
    //     ? convertToAbbreviated(
    //       Number(formatEther(BigInt(result?.data[0]?.result?.[1])))
    //     )
    //     : 0
    //     } RCC`,
    //   logo: CLAIMED,
    // },
  ];

  useEffect(() => {
    if (!blockNumber) return;
    queryClient.invalidateQueries({
      queryKey: result.queryKey,
    });
  }, [blockNumber, queryClient, !result.queryKey]);


  return (
    <Box >

      <Card sx={{ p: 2, border: '1px solid #557804', backgroundColor: 'transparent', borderRadius: '12px' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={type === 'image' ? 6 : 12} >
            <Stack spacing={3}>
              {
                dataList1.map((item, index) => {
                  return (
                    <Grid key={index} container spacing={2} alignItems="center">
                      <Grid item>


                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "12px",
                            background: "linear-gradient(85deg, #fff, #fff)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: '1px solid #557804'
                          }}
                        >
                          <Image
                            src={item.logo}
                            style={{ width: 40, height: 40 }}
                            alt={item.title}
                          />
                        </Box>


                      </Grid>
                      <Grid item>
                        <Typography color={'#000'}>{item.title}</Typography>
                        <Typography variant='h5' color={'#000'} >{item.value}</Typography>
                      </Grid>
                    </Grid>
                  )
                })
              }
            </Stack>


            {/* Referral Link */}
            <Box sx={{ mt: 5 }}>

              <Box
                sx={{
                  padding: '0.5rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: "linear-gradient(85deg, #fff, #fff, #fff)",
                  borderRadius: '12px',
                  border: '1px solid #557804'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ color: '#000', wordBreak: 'break-all' }}>
                    {url}
                  </Typography>
                  <IconButton onClick={copyToClipboard} sx={{ color: '#000' }}>
                    <ContentCopyIcon />
                  </IconButton>
                </Box>
                <Box >
                  <ShareModal referLink1={url} referLink2={url1} />
                </Box>
              </Box>

            </Box>

          </Grid>

          {type === 'image' && (
            <Grid item xs={12} md={6} display="flex" justifyContent="center">
              <img
                src="/images/buy/aizucoin.png"
                alt="aizucoin"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Grid>
          )}
        </Grid>
      </Card>
    </Box>
  );
}
