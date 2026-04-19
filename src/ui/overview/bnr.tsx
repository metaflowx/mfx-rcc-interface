import Heading from "@/theme/components/heading";
import HeadingGred from "@/theme/components/headingGred";
import { Box, Button, Grid, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Image from "next/image";
import Link from "next/link";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useMemo } from "react";
import { useAccount, useReadContracts } from "wagmi";
import { iocConfig, tokenConfig } from "@/app/constants/contract";
import { useAppKitNetwork } from "@reown/appkit/react";
import { Address, formatEther } from "viem";
import { convertToAbbreviated } from "@/lib/convertToAbbreviated";
import TimerCounter from "./timerCounter";


const useStyles = makeStyles({
    countdownContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2rem'
    }
});



const Bnr = () => {
    const classes = useStyles();
    const { address } = useAccount();
    const { chainId } = useAppKitNetwork();
    const result = useReadContracts({
        contracts: [
            {
                ...iocConfig,
                functionName: "getSaleTokenPrice",
                args: [1],
                chainId: Number(chainId) ?? 56,
            },

            {
                ...iocConfig,
                functionName: "saleType2IcoDetail",
                args: [1],
                chainId: Number(chainId) ?? 56,
            },
            {
                ...tokenConfig,
                functionName: "totalSupply",
                chainId: Number(chainId) ?? 56,
            },
            {
                ...iocConfig,
                functionName: "user2SaleType2Contributor",
                args: [address as Address, 1],
                chainId: Number(chainId) ?? 56,
            },
            {
                ...iocConfig,
                functionName: "saleType2IcoDetail",
                args: [1],
                chainId: Number(chainId),
            },
        ],
    });

    const calculatedToken = useMemo(() => {
        if ((result && result?.data)) {
            const purchaseToken =
                result &&
                result?.data &&
                result?.data[3]?.result &&
                formatEther(BigInt(result?.data[3]?.result?.volume));
            const tokeninUSD =
                result && result?.data
                    ? Number(formatEther(BigInt(result?.data[0]?.result ?? 0)))
                    : 0;
            const totalTokenSupply =
                result &&
                result?.data &&
                result?.data[4]?.result &&
                formatEther(BigInt(result?.data[4]?.result?.saleTokenAmount));
            const totalTokenQty =
                result &&
                result?.data &&
                result?.data[4]?.result &&
                formatEther(BigInt(result?.data[4]?.result?.saleQuantity));

            const totalTokenSale =
                result &&
                result?.data &&
                result?.data[4]?.result &&
                formatEther(BigInt(result?.data[4]?.result?.saleTokenAmount));

            const purchaseTokenUSD = Number(purchaseToken) * Number(tokeninUSD);
            const totalTokenSupplyUSD = Number(totalTokenSupply) * Number(tokeninUSD);

            const totalSoldToken = Number(totalTokenSale) - Number(totalTokenQty);
            const totalSaleTokenUSD = Number(totalSoldToken) * Number(tokeninUSD);

            return {
                purchaseTokenUSD: purchaseTokenUSD.toFixed(2),
                totalTokenSupplyUSD: totalTokenSupplyUSD,
                totalSale: totalSaleTokenUSD.toFixed(2),
                purchaseToken: Number(purchaseToken).toFixed(2),
            };
        }
    }, [result]);
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });

        const handleScroll = () => AOS.refresh();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>

            <Box className='bg___bnr '
                sx={{
                    padding: '4rem 0rem',
                    marginTop: '1rem',
                    '@media(max-width : 1200px)': {
                        padding: '0rem 0rem',
                        marginTop: '0rem',
                        '@media(max-width : 600px)': {
                            padding: '2rem 0rem'
                        }
                    }
                }}>








                <Box >
                    <Grid container spacing={2} sx={{
                        alignItems: 'center',
                        '@media(max-width : 900px)': {
                            flexDirection: 'column-reverse'
                        }
                    }}>
                        <Grid item lg={7} md={6} sm={12} xs={12}
                            sx={{
                                '@media(max-width : 900px)': {
                                    textAlign: 'center'
                                }
                            }}>

                        </Grid>




                        <Grid item lg={5} md={6} sm={12} xs={12} sx={{
                            '@media(max-width : 900px)': {
                                width: '100%'
                            }
                        }}>
                            <Box data-aos="fade-up-left" sx={{
                                // background: 'linear-gradient(85deg, #FDB355, #FEE0A6, #FED250)',
                                padding: '1px',
                                borderRadius: '16px',
                                '@media(max-width : 900px)': {
                                    border: '1px solid #FDB355',
                                    padding: '0px'
                                }

                            }}>
                                <Box className={'or'} sx={{
                                    border: '1px solid #557804',
                                    backgroundColor: '#ffffffe6',
                                    borderRadius: '15px',
                                    padding: '1.5rem 0rem',

                                }}>
                                    <Box sx={{
                                        textAlign: 'center',
                                    }}>
                                        <Typography data-aos="fade-right" variant="h4"
                                            sx={{

                                                color: '#000',
                                                display: "inline",
                                                '@media(max-width : 600px)': {
                                                    fontSize: '24px'
                                                }
                                            }}
                                        >
                                            Buy $ReCore Chain Token
                                        </Typography>
                                        <Typography data-aos="fade-left" variant="h4" sx={{
                                            color: '#000',

                                            '@media(max-width : 600px)': {
                                                fontSize: '24px'
                                            }
                                        }}>
                                            In Presale Now!
                                        </Typography>
                                    </Box>
                                    {Math.floor(Date.now() / 1000) <= Number(result?.data?.[1]?.result?.startAt) ? (
                                        <TimerCounter
                                            targetTime={
                                                result?.data?.[1]?.result?.startAt
                                                    ? Number(result.data[1].result.startAt) * 1000
                                                    : 0
                                            }
                                        />
                                    ) : (
                                        <TimerCounter
                                            targetTime={
                                                result?.data?.[1]?.result?.endAt
                                                    ? Number(result.data[1].result.endAt) * 1000
                                                    : 0
                                            }
                                        />
                                    )}

                                    <Box sx={{
                                        textAlign: 'center',
                                        margin: '0rem 1.5rem'
                                    }}>
                                        <Box textAlign={'center'} mt={4} mb={2}>
                                            <Typography data-aos="zoom-in" color={'#000'}
                                                sx={{
                                                    border: '1px solid #000',
                                                    padding: '5px 10px',
                                                    display: 'inline-block',
                                                    borderRadius: '30px',
                                                }}>UNTIL PRICE INCREASE</Typography>
                                        </Box>

                                        <Typography variant="h6" sx={{

                                            display: "inline",
                                            color: '#000'
                                        }}>
                                            TOTAL USD RAISED: $ {convertToAbbreviated(Number(calculatedToken?.totalSale ?? 0) + 10000) ?? 0}
                                        </Typography>
                                        <Typography mt={1.2} fontWeight={'bold'} color={'#000'}>1 RCC = $ {result.data?.[0]?.result ? formatEther(BigInt((result.data?.[0]?.result))) : '0.0139'}</Typography>
                                        <Link href={"/dashboard"}>
                                            <Button sx={{
                                                background: "#557804",
                                                color: '#fff',
                                                padding: '10px 22px',
                                                display: 'inline-flex',
                                                textDecoration: 'none',

                                                borderRadius: '5rem',
                                                width: '100%',
                                                marginTop: '2rem',
                                                '&:hover': {
                                                    background: "#557804",
                                                }

                                            }}>Buy Now</Button></Link>
                                        <Typography mt={1} color={'#000'}>Don't have a wallet?</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>




                <Box sx={{
                    marginTop: '5rem'
                }} >
                    <Grid container spacing={2} sx={{
                        alignItems: 'center',
                        '@media(max-width : 900px)': {
                            flexDirection: 'column-reverse'
                        }
                    }}>


                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{
                            '@media(max-width : 900px)': {
                                width: '100%'
                            }
                        }}>
                            <Box data-aos="fade-up-left" sx={{
                                // background: 'linear-gradient(85deg, #FDB355, #FEE0A6, #FED250)',
                                padding: '1px',
                                borderRadius: '16px',
                                '@media(max-width : 900px)': {

                                    padding: '0px'
                                }

                            }}>

                                <Box sx={{
                                    textAlign: 'center',
                                }}>
                                    <Typography data-aos="fade-right" variant="h4"
                                        sx={{
                                            fontSize: '40px',
                                            color: '#000',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontFamily: 'Museo 700 !important',
                                            '@media(max-width : 600px)': {
                                                fontSize: '24px'
                                            }
                                        }}
                                    >
                                        ReCore Chain — Decentralized <Box component={'br'} sx={{ '@media(max-width 900px)': { display: 'none' } }} /> Green Energy Blockchain
                                    </Typography>
                                    <Typography data-aos="zoom-in" color={'#000'}
                                        sx={{
                                            fontSize: '24px',
                                            display: 'inline-block',
                                            borderRadius: '30px',
                                        }}>Powering the future with Wind Turbines, EV Charging Infrastructure, <Box component={'br'} sx={{ '@media(max-width 900px)': { display: 'none' } }} /> and Blockchain Staking</Typography>
                                </Box>

                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '1rem',
                                    marginTop: '1rem'
                                }}>
                                    <Link href={"/dashboard"}>
                                        <Button sx={{
                                            backgroundColor: '#557804',
                                            border: '1px solid transparent',
                                            color: '#fff',
                                            borderRadius: '5rem',
                                            padding: '0.5rem 1.5rem',
                                            textTransform: 'capitalize',
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                border: '1px solid #557804',
                                                color: '#557804'
                                            }
                                        }}>
                                            Join ICO
                                        </Button>
                                    </Link>

                                    <Link href={"/dashboard/staking"}>
                                        <Button sx={{
                                            backgroundColor: 'transparent',
                                            border: '1px solid #557804',
                                            color: '#557804',
                                            borderRadius: '5rem',
                                            padding: '0.5rem 1.5rem',
                                            textTransform: 'capitalize',
                                            '&:hover': {
                                                backgroundColor: '#557804',
                                                color: '#fff'
                                            }
                                        }}>
                                            Start Staking
                                        </Button>
                                    </Link>
                                </Box>



                            </Box>
                        </Grid>

                    </Grid>
                </Box>

            </Box>



        </>
    )
}

export default Bnr;


