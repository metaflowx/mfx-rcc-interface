'use client';

import React, { useEffect, useRef } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  useMediaQuery,
  Skeleton,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HeadingGred from '@/theme/components/headingGred';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { iocConfig } from '@/app/constants/contract';
import { useAccount, useBlockNumber, useReadContract, useReadContracts } from 'wagmi';
import { useAppKitNetwork } from '@reown/appkit/react';
import { useQueryClient } from '@tanstack/react-query';
import { Address, formatEther, formatUnits } from 'viem';
import shortenString from '@/lib/shortenString';
import Heading from '@/theme/components/heading';


export default function PurchaseHistory() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const scrollRef = useRef<HTMLDivElement>(null);
  const { address } = useAccount();
  const { chainId } = useAppKitNetwork();
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: {
     enabled: true,
     pollingInterval: 5_000,
   } });
  const result = useReadContracts({
    contracts: [
      {
        ...iocConfig,
        functionName: "totalContributorLengthForUser",
        args: [address as Address, 1],
        chainId: Number(chainId) ?? 56,
      },
    ],
  });
  useEffect(() => {
    if(!blockNumber) return;
    queryClient.invalidateQueries({
      queryKey: result.queryKey,
    });

  }, [blockNumber, queryClient, !result.queryKey]);
  const totalLength = result?.data?.[0]?.result?.toString() || "0";
  const historyTable = useReadContract({
    ...iocConfig,
    functionName: "user2SaleType2ContributorList",
    args: [address as Address, 1, BigInt(0), BigInt(totalLength)],
    chainId: Number(chainId) ?? 56,
  });
  const dateTime = (timestamp: any) => {
    const numericTimestamp = Number(timestamp);
    const date = new Date(numericTimestamp * 1000);
    return date.toLocaleString();
  };

  useEffect(() => {
    if (isMobile && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [isMobile]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Address copied!', {
      position: 'top-right',
      autoClose: 3000,
      theme: 'dark',
    });
  };

  return (
    <Box mt={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Heading heading="Contributors History" variantt="h5" />
      </Box>

      <Box
        sx={{
          border: '1px solid #557804',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Box
          ref={scrollRef}
          sx={{
            overflowX: 'auto',
            maxHeight: isMobile ? 'none' : 400,
            width: '100%',
            scrollBehavior: 'smooth',
          }}
        >
          <Table stickyHeader sx={{ minWidth: 600, backgroundColor: '#111827' }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#2D67FE4D' }}>
                {['USER', 'AMOUNT', 'COIN', 'QUANTITY', 'DATE & TIME'].map((label) => (
                  <TableCell
                    key={label}
                    sx={{
                      backgroundColor: '#557804',
                      color: '#fff',
                      whiteSpace: 'nowrap',
                      borderBottom: '1px solid #557804',
                    }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                historyTable.isLoading ? (
                  [...Array(5)].map((_, index) => (
                    <TableRow key={index} className="border-b-0">
                      {[...Array(5)].map((_, i) => (
                        <TableCell key={i} className="text-black" sx={{bgcolor:'#fff'}}>
                          <Skeleton sx={{ bgcolor: "#fff" }} variant="text" width={100} height={20} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) :
                  historyTable?.data && historyTable?.data.length > 0 ? (
                    historyTable.data.map((item: any, index: number) => (
                      <TableRow
                        key={index}
                        sx={{
                          backgroundColor: index % 2 === 0 ? '#fff' : '#fff',
                        }}
                      >
                        <TableCell sx={{ color: '#000', borderBottom: '1px solid #557804' }}>
                          <Box display="flex" alignItems="center">
                            {shortenString(item.user)}&nbsp;
                            <ContentCopyIcon
                              fontSize="small"
                              onClick={() => handleCopy(item.user)}
                              style={{ cursor: 'pointer' }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ color: '#000', borderBottom: '1px solid #557804' }}>
                          $
                          {item?.amount
                            ? Number(formatEther(BigInt(item?.amount))).toFixed(2)
                            : "-"}
                        </TableCell>
                        <TableCell sx={{ color: '#000', borderBottom: '1px solid #557804' }}>
                          {item.coin}
                        </TableCell>
                        <TableCell sx={{ color: '#000', borderBottom: '1px solid #557804' }}>
                          {Number(formatUnits(item?.volume, 18)).toFixed(2)} RCC
                        </TableCell>
                        <TableCell sx={{ color: '#000', borderBottom: '1px solid #557804' }}>
                          {dateTime(item?.at) || "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ color: '#000', bgcolor:'#fff' }}>
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
