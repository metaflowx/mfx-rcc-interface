
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
  Divider,
  Stack,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTheme } from '@mui/material/styles';


// ✅ Toastify imports
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Heading from '@/theme/components/heading';
import Image from 'next/image';
 
import ShareModal from '../dashboard/shareModal';
import profile from '../../icons/recorechain/profile.svg'
import coinwithbg from '../../icons/recorechain/coinwithbg.svg'
import { contractConfig } from '@/app/constants/contract';
import { Address, formatEther, zeroAddress } from 'viem';
import { useAccount, useBlockNumber, useReadContracts } from 'wagmi';
import { useAppKitNetwork } from '@reown/appkit/react';
import { useQueryClient } from '@tanstack/react-query';
import shortenString from '@/lib/shortenString';

import REFERRALS from '../../../src/icons/recorechain/ref.svg'
import EARNINGS from '../../../src/icons/recorechain/earn.svg'
import CLAIMED from '../../../src/icons/recorechain/claim.svg'
import { convertToAbbreviated } from '@/lib/convertToAbbreviated';


export default function Profile({ type }: { type?: string }) {
  const { address } = useAccount();
  const { chainId } = useAppKitNetwork()
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const queryClient = useQueryClient();
  const [url, setUrl] = useState('');
  const [url1, setUrl1] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(`${window.location.host}/dashboard?ref=${shortenString(address || "")}`);
      setUrl1(`${window.location.host}/dashboard?ref=${address}`);

    }
  }, [address]);


  const result = useReadContracts({
    contracts: [

      {
        ...contractConfig,
        functionName: "getTotalReferralRewards",
        args: [address as Address],
        chainId: Number(chainId) ?? 56
      },
      {
        ...contractConfig,
        functionName: 'getReferralsCount',
        args: [address as Address],
        chainId: Number(chainId) ?? 56

      },
      {
        ...contractConfig,
        functionName: 'getReferrer',
        args: [address as Address],
        chainId: Number(chainId) ?? 56
      },



    ],
  })
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: result.queryKey,
    });

  }, [blockNumber, queryClient, result]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };


  const copyToClipboard = () => {
    navigator.clipboard.writeText(url1);
    toast.success('Referral link copied!', {
      position: 'top-right',
      autoClose: 3000,
      theme: 'dark',
    });
  };

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
          Number(formatEther(BigInt(result?.data[0]?.result?.[0])))
        )
        : 0
        } RCC`,
      logo: EARNINGS,
    },
    {
      title: "YOUR REFERRALS CLAIMED",
      value: `${result?.data?.[0]?.result
        ? convertToAbbreviated(
          Number(formatEther(BigInt(result?.data[0]?.result?.[1])))
        )
        : 0
        } RCC`,
      logo: CLAIMED,
    },
  ];



  return (
    <Box >
      {/* ✅ Toast Container */}

      <Card sx={{ p: 2, border: '1px solid #557804', backgroundColor: 'transparent', borderRadius: '16px', boxShadow:'none' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={type === 'image' ? 6 : 12}>

            <Grid container spacing={4}>

              <Grid item lg={8} md={8} sm={12} xs={12}>
                <Box display="flex" alignItems="center" mb={3}>
                  <Image src={profile} alt="Profile" width={60} height={60} />
                  <Typography variant="h6" color="#000" sx={{ ml: 2 }}>
                    {shortenString(address as string)}
                    <IconButton onClick={() => handleCopy(address as string)}>
                      <ContentCopyIcon sx={{ color: '#000' }} />
                    </IconButton>
                  </Typography>
                </Box>

                <Box mb={3}>
                  <Typography variant="body1" color="white">
                    You Referred By:&nbsp;
                    {result?.data?.[2].result ? (
                      <>
                        {result?.data?.[2].result?.toString() !== zeroAddress ? (
                          <>
                            {shortenString(result?.data?.[2].result?.toString() as string)}
                            <IconButton onClick={() => handleCopy(result?.data?.[2].result?.toString() as string)}>
                              <ContentCopyIcon sx={{ color: 'white' }} />
                            </IconButton>
                          </>
                        )
                          : 'None'}

                      </>
                    ) : (
                      <strong>No referrer found</strong>
                    )}
                  </Typography>
                </Box>

                <Stack spacing={3} sx={{mb:3}}>
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
                                border:'1px solid #557804'
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
                            <Heading heading={item.value} variantt={"h5"} />
                          </Grid>
                        </Grid>
                      )
                    })
                  }
                </Stack>


              </Grid>

              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Image src={coinwithbg} alt="Token" style={{ width: '100%', height: 'auto' }} />
              </Grid>
            </Grid>

            <Box>

              <Box
                sx={{
                  padding: '0.5rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: "linear-gradient(85deg, #fff, #fff, #fff)",
                  border:'1px solid #557804',
                  borderRadius:'12px'
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
            <Grid item xs={12} md={6} >
              <img
                src={coinwithbg}
                alt="RCC"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Grid>
          )}
        </Grid>
      </Card>
    </Box>
  );
}

