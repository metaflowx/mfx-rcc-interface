

'use client';

import * as React from 'react';
import {
  Box,
  CssBaseline,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer as MuiDrawer,
  useMediaQuery,
  Button
} from '@mui/material';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import menu from '../../icons/recorechain/menu.svg';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Sidebardb from '@/ui/dashboard/sidebardb';
import Link from 'next/link';
import Image from 'next/image';
import bckbtn from '../../icons/recorechain/bckbtn.svg'
import ConnectWallet from '@/ui/shared/connectWallet';
 


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('md')]: {
    width: `calc(${theme.spacing(8)} + 8px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2),
  ...theme.mixins.toolbar
}));

interface AppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: '#fff',
  boxShadow: 'none',
  borderBottom: '1px solid #557804',
  justifyContent: 'space-between',
  zIndex: theme.zIndex.drawer + 1,
  width: '100%', // default for mobile

  paddingRight: '0px !important', // remove padding-right on mobile

  [theme.breakpoints.up('md')]: {
    paddingRight: theme.spacing(2), // optional: add back if needed
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`
    })
  },

  transition: theme.transitions.create(['width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  })
}));


const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => {
  const commonStyles = {
    backgroundColor: 'transparent',
    color: 'white',
    borderRight: '1px solid #557804',
  };

  return {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap', justifyContent: 'space-between',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': {
        ...openedMixin(theme),
        ...commonStyles
      }
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': {
        ...closedMixin(theme),
        ...commonStyles
      }
    })
  };
});

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [desktopOpen, setDesktopOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleMobileDrawerOpen = () => setMobileOpen(true);
  const handleMobileDrawerClose = () => setMobileOpen(false);
  const handleDesktopDrawerClose = () => setDesktopOpen(false);
  const handleDesktopDrawerOpen = () => setDesktopOpen(true);


  

  return (
    <Box className={"dashbg"} sx={{ display: 'flex',  }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" open={!isMobile && desktopOpen}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {isMobile ? (
            <Box>
              <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleMobileDrawerOpen}
              edge="start"
              sx={{ marginRight: 2 }}
            >
               <Image src={menu} alt={''}/>
            </IconButton>
             
            </Box>
            
          ) : !desktopOpen ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDesktopDrawerOpen}
              edge="start"
              sx={{ marginRight: 2 }}
            >
              <Image src={menu} alt={''}/>
            </IconButton>
          ) : <Box ><Typography color={'#000'}>Welcome to ReCore Chain Dashboard</Typography></Box>}
          <ConnectWallet />

          
         
        </Toolbar>
      </AppBar>

      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer variant="permanent" open={desktopOpen}>
          <DrawerHeader>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
              <Link
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                href={'/'}
              >
                <Image src={bckbtn} alt={''} />
              </Link>
              <IconButton
                sx={{
                  backgroundColor: '#557804',
                  borderRadius: '40px',
                  '&:hover': {
                    backgroundColor: '#557804',
                  }
                }}
                onClick={handleDesktopDrawerClose}
              >
                {theme.direction === 'rtl' ? (
                  <ChevronRightIcon sx={{ color: '#fff' }} />
                ) : (
                  <ChevronLeftIcon sx={{ color: '#fff' }} />
                )}
              </IconButton>
            </Box>
          </DrawerHeader>
          <Sidebardb />
        </Drawer>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <MuiDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleMobileDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              backgroundColor: '#fff',
              color: 'white',
              borderRight: '1px solid #557804'
            }
          }}
        >
          <DrawerHeader>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
              <Link
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                href={'/'}
              >
                <Image src={bckbtn} alt={''} />
              </Link>
              <IconButton
                sx={{
                  backgroundColor: '#131c48',
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: '#131c48',
                  }
                }}
                onClick={handleMobileDrawerClose}
              >
                <ChevronLeftIcon sx={{ color: '#fff' }} />
              </IconButton>
            </Box>
          </DrawerHeader>
          <Sidebardb />
        </MuiDrawer>
      )}

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow:'auto' }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
