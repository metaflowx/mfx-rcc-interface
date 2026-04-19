'use client';

import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

// Logo and Icons
import logo from '../../icons/recorechain/logo.svg';
import dl from '../../icons/recorechain/dl.svg';
import el from '../../icons/recorechain/el.svg';
import sl from '../../icons/recorechain/sl.svg';
import rl from '../../icons/recorechain/rl.svg';
import pl from '../../icons/recorechain/pl.svg';

import dd from '../../icons/recorechain/dd.svg';
import ed from '../../icons/recorechain/ed.svg';
import sd from '../../icons/recorechain/sd.svg';
import rd from '../../icons/recorechain/rd.svg';
import pd from '../../icons/recorechain/pd.svg';
 

// Navigation Links
const navLinks = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    iconLight: dl,
    iconDark: dd,
  },
  {
    name: 'Earning',
    href: '/dashboard/earning',
    iconLight: el,
    iconDark: ed,
  },
  {
    name: 'Staking',
    href: '/dashboard/staking',
    iconLight: sl,
    iconDark: sd,
  },
  {
    name: 'Referral',
    href: '/dashboard/referral',
    iconLight: rl,
    iconDark: rd,
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    iconLight: pl,
    iconDark: pd,
  },
];

const SidebarDB = () => {
  const pathname = usePathname();

  return (
    <Box sx={{ p: 2 }}>
      {/* Logo */}
      <Box >
        <Link href="/" passHref>
          <Box component="a">
            <Image src={logo} alt="Logo" width={180} height={100} />
          </Box>
        </Link>
      </Box>

      {/* Navigation */}
      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        {navLinks.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <Box key={index} component="li" sx={{ mb: 2 }}>
              <Link style={{ textDecoration:"none"}} href={item.href} passHref>
                <Box
                  component="a"
                  sx={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.8rem',
                    padding: '10px 8px',
                    borderRadius: '12px',
                    background: isActive
                      ? 'linear-gradient(85deg, #557804, #557804, #557804)'
                      : 'transparent',
                    color: isActive ? '#fff' : '#000',
                    transition: '0.3s ease',
                  }}
                >
                  <Image
                    src={isActive ? item.iconLight : item.iconDark}
                    alt={item.name}
                    width={24}
                    height={24}
                  />
                  <Typography
                    variant="body1"
                    fontSize="16px"
                    fontWeight={500}
                    sx={{ color: isActive ? '#fff' : '#000' }}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </Link>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SidebarDB;
