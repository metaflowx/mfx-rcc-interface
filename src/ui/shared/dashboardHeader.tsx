'use client'
import { Box, Typography } from "@mui/material"
import Image from "next/image";
import Link from "next/link";
import DashboardSidebar from "./dashboardSidebar";
import leftArrow from '../../icons/orlla/leftArrow.svg'
import ConnectWallet from "./connectWallet";




const DashboardHeader = () => {



    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #557804',
                padding: '1rem 1.5rem',
                height: '74px',
                position: 'sticky',
                backgroundColor: '#010727',
                zIndex: '100',
                top: '0px',
                '@media(max-width : 900px)': {
                    padding: '10px 20px',
                    flexDirection: 'row-reverse'
                }
            }}>
                <Box sx={{ display: 'none', '@media(max-width : 900px)': { display: 'block' } }}>
                    <DashboardSidebar />
                </Box>
                <Box>
                    <Link style={{
                        display: 'flex',
                        gap: '0.5rem',
                        textDecoration: 'none'

                    }} href={"/"}><Image src={leftArrow} alt={""} /><Typography color={'#fff'} sx={{ '@media(max-width : 600px)': { display: 'none' } }}>back to home</Typography></Link></Box>
                <ConnectWallet />
            </Box>
        </>
    )
}

export default DashboardHeader