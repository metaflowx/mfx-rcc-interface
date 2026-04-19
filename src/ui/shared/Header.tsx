"use client"
import Image from "next/image";
import { Box, Drawer, Typography, styled, useTheme, } from "@mui/material";
import Link from "next/link";
import logo from '../../icons/recorechain/logo.svg'
import { useContext, useState } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Navbar from "./navbar";
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "./sidebar";
import { makeStyles } from '@mui/styles';
import ConnectWallet from "./connectWallet";
import { useAccount, useConnect } from "wagmi";



const useStyles = makeStyles({
    logo__img: {
        width: '160px',
        height: 'auto',
        '@media(max-width : 600px)': {
            width: 'auto',
        }
    },
    menu__box: {
        display: 'none',
        '@media(max-width : 900px)': {
            display: 'block',
        }
    }
})






const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',


}));

const LoginStyled = styled(Link)(({ theme }) => ({
    backgroundColor: '#557804',
    color: '#fff !important',
    padding: '14px 22px',
    display: 'inline-flex',
    textDecoration: 'none',
    fontSize: '14px !important',
    borderRadius: '5rem',
    transition: '0.5s',
    ':hover': {
        transform: 'translateY(-5px)'
    },
    '@media(max-width : 1200px)': {
        padding: '14px',
        '@media(max-width : 600px)': {
            display: 'none'
        }
    }

}));
const StyledMenu = styled(Link)(({ theme }) => ({
    backgroundColor: '#3DC1F2 !important',
    color: '#fff',
    padding: '14px',
    display: 'inline-flex',
    textDecoration: 'none',
    fontSize: '14px !important',
    borderRadius: '5rem',
    transition: '0.5s',
    ':hover': {
        backgroundColor: '#fff !important',
        color: "#000"
    }
}));

const StyledLink = styled(Link)(({ theme }) => ({
    display:'flex',
    'img': {
        '@media(max-width : 600px)': {

            marginTop: '5px'
        }
    }
}));

const MainBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.7rem',
    backgroundColor:'#fff',
    border:'1px solid #000000',
    borderRadius:'6rem',
     
    '@media(max-width : 600px)': {
        paddingTop: '0.5rem',
    }
}));





export default function Header() {
    const classes = useStyles();



    const [openMob, setOpenMob] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenMob(newOpen);
    };



    return (
        <Box >
            <MainBox>
                <StyledBox>
                    <Box>
                        <StyledLink href={"/"}><Image className={classes.logo__img} src={logo} alt="logo" /></StyledLink>
                    </Box>
                   
                </StyledBox>

                <Box sx={{  '@media(max-width : 900px)': { display: 'none' } }}>
                        <Navbar />
                    </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >




                    <LoginStyled
                        href={"/dashboard"}>
                        <Typography fontSize={14}>Join ICO</Typography>
                    </LoginStyled>





                    <Box className={classes.menu__box}>
                        <Sidebar />
                    </Box>

                    {/* <StyledMenu
                    href={""}>
                    <MenuIcon />
                </StyledMenu> */}
                </Box>
            </MainBox>
        </Box>

    );
}
