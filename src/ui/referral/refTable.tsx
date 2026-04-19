'use client';

import React, { useEffect, useRef } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useMediaQuery,
  Paper,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const dummyData = [
  { user: '0xA1b2...C3d4', bonus: '5.00', profit: '35.00' },
  { user: '0xF9d2...E4b5', bonus: '15.00', profit: '115.00' },
  { user: '0xB7e9...D2f6', bonus: '8.00', profit: '58.00' },
  { user: '0xC3f4...E6a1', bonus: '20.00', profit: '140.00' },
];

export default function SimpleUserBonusProfitTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const scrollRef = useRef<HTMLDivElement>(null);

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
      <Box
        sx={{
          border: '1px solid #FDB355',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <Box
          ref={scrollRef}
          sx={{
            overflowX: 'auto',
            maxHeight: isMobile ? 'none' : 400,
            scrollBehavior: 'smooth',
            width: '100%',
          }}
        >
          <Table stickyHeader sx={{ minWidth: 500, backgroundColor: '#111827' }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#2D67FE4D' }}>
                {['USER', 'BONUS', 'PROFIT'].map((label) => (
                  <TableCell
                    key={label}
                    sx={{
                      backgroundColor: '#131c48',
                      color: '#fff',
                      whiteSpace: 'nowrap',
                      borderBottom: '1px solid transparent',
                    }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyData.length > 0 ? (
                dummyData.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? '#010727' : '#131c48',
                    }}
                  >
                    <TableCell sx={{ color: '#fff', borderBottom: '1px solid transparent' }}>
                      <Box display="flex" alignItems="center">
                        {item.user}&nbsp;
                        <ContentCopyIcon
                          fontSize="small"
                          onClick={() => handleCopy(item.user)}
                          style={{ cursor: 'pointer' }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#fff', borderBottom: '1px solid transparent' }}>
                      {item.bonus} RCC
                    </TableCell>
                    <TableCell sx={{ color: '#fff', borderBottom: '1px solid transparent' }}>
                      {item.profit} RCC
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ color: '#fff' }}>
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
