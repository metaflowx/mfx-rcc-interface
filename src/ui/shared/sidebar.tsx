import * as React from 'react';
import {
  Box,
  Drawer,
  styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import Navbar from './navbar';
import Image from 'next/image';
import menu from '../../icons/recorechain/menu.svg'


const StyledMenu = styled(Link)(({ theme }) => ({
  rotate:'180deg',
  background: 'linear-gradient(85deg, transparent, transparent, transparent)',
  color: '#000',
  padding: '14px',
  display: 'inline-flex',
  textDecoration: 'none',
  fontWeight: 700,
  borderRadius: 12,
  transition: '0.5s',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#000',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
  },
}));

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      )
        return;
      setOpen(open);
    };

  return (
    <Box>
      <StyledMenu href="#" onClick={toggleDrawer(true)}>
        <Image src={menu} alt={''}/>
      </StyledMenu>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#fff',
          },
        }}
      >
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box
            sx={{
              width: 200,
              textAlign: 'end',
              margin: '15px',
            }}
          >
            <Link href="#">
              <CloseIcon sx={{ color: '#557804' }} />
            </Link>
          </Box>

          {/* Mobile-only navbar */}
          <Box
            sx={{
              display: {
                xs: 'block',
                sm: 'block',
                md: 'none',
              },
            }}
          >
            <Navbar />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
