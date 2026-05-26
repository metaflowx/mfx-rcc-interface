import { Box, Button, Grid, InputBase, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import Image from 'next/image';

import ss1 from '../../icons/recorechain/ss1.svg'
import ss2 from '../../icons/recorechain/ss2.svg'
import ss3 from '../../icons/recorechain/ss3.svg'
import ss4 from '../../icons/recorechain/ss4.svg'
import logo from '../../icons/recorechain/logo.svg'

const SOCIAL____MEDIA = [
    {
        id: 1,
        image: ss1,
        href: "#"
    },
    {
        id: 2,
        image: ss2,
        href: "#"
    },
    {
        id: 3,
        image: ss3,
        href: "#"
    },
    {
        id: 4,
        image: ss4,
        href: "#"
    },
]

const useStyles = makeStyles({

    list__item: {
        color: '#000',
        textDecoration: 'none',
        transition: '0.5s',

        '&:hover': {
            textDecoration: 'underline',
        }
    },

    listBox: {
        marginTop: '1rem'
    },

    list: {
        margin: 0,
        padding: 0,
        listStyle: 'none'
    },

    input__box: {
        backgroundColor: '#fff',
        padding: '0px 0px 0px 10px',
        borderRadius: '5rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: '1.5rem',
        border: '1px solid #343952',

        '@media(max-width:600px)': {

            gap: '10px',
            padding: '10px'
        }
    },

    box__listAlign: {
        '@media(max-width : 600px)': {
            textAlign: 'center'
        }
    },

    heading__align: {
        textTransform: 'uppercase',
        fontWeight: 700,

        '@media(max-width : 600px)': {
            fontSize: '20px'
        }
    },

    dis__claim: {
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: '1.5rem 0rem',

        '@media(max-width : 900px)': {
            gap: '10px',
        },

        '@media(max-width : 600px)': {
            justifyContent: 'center'
        }
    },

    linkBtm: {
        color: '#000',
        textDecoration: 'none',

        '&:hover': {
            color: '#000',
        }
    },



    addressCard: {

        borderRadius: '16px',

        transition: '0.4s',


    },

    addressTitle: {
        fontWeight: 700,
        marginBottom: '8px',
        color: '#557804',
        fontSize: '16px',
        textTransform: 'uppercase'
    },

    addressText: {
        color: '#000',
        lineHeight: '28px',
        fontSize: '14px',
    }
})

const Footer = () => {

    const classes = useStyles();

    return (
        <>
            <Box>

                <Grid container spacing={4}>

                    {/* ABOUT */}
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <Box className={classes.box__listAlign}>

                            <Typography
                                className={classes.heading__align}
                                variant='h6'
                                color={'#000'}
                            >
                                About
                            </Typography>

                            <Box className={classes.list} component={'ul'}>

                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">
                                        About Us
                                    </Link>
                                </Box>

                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">
                                        Careers
                                    </Link>
                                </Box>

                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">
                                        Announcements
                                    </Link>
                                </Box>

                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">
                                        Blog
                                    </Link>
                                </Box>

                            </Box>

                        </Box>
                    </Grid>

                    {/* SERVICES */}
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <Box className={classes.box__listAlign}>

                            <Typography
                                className={classes.heading__align}
                                variant='h6'
                                color={'#000'}
                            >
                                Services
                            </Typography>

                            <Box className={classes.list} component={'ul'}>

                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">
                                        Referral
                                    </Link>
                                </Box>

                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">
                                        Apps Dashboard
                                    </Link>
                                </Box>

                            </Box>

                        </Box>
                    </Grid>

                    {/* SUPPORT */}
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <Box className={classes.box__listAlign}>

                            <Typography
                                className={classes.heading__align}
                                variant='h6'
                                color={'#000'}
                            >
                                Support
                            </Typography>

                            <Box className={classes.list} component={'ul'}>

                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">
                                        Help Center
                                    </Link>
                                </Box>

                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">
                                        Whitepaper
                                    </Link>
                                </Box>

                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">
                                        Give Us Feedback
                                    </Link>
                                </Box>

                            </Box>

                        </Box>
                    </Grid>




                    {/* NEWSLETTER */}
                    <Grid item lg={3} md={12} sm={12} xs={12}>

                        <Box className={classes.box__listAlign}>

                            <Typography
                                className={classes.heading__align}
                                variant='h6'
                                color={'#000'}
                            >
                                Subscribe to our Newsletter
                            </Typography>

                            <Box className={classes.input__box}>

                                <InputBase
                                    sx={{
                                        flex: 1,
                                        color: '#000',
                                        width: '100%',
                                        padding: '0.3rem 0.5rem',
                                    }}
                                    fullWidth
                                    placeholder={'Enter a valid email '}
                                />

                                <Button
                                    sx={{
                                        backgroundColor: '#557804',
                                        color: '#fff',
                                        padding: '12px 30px',
                                        fontWeight: 'bold',
                                        borderRadius: '5rem',
                                        minWidth: '140px',

                                        '&:hover': {
                                            backgroundColor: '#445f03',
                                        }
                                    }}
                                >
                                    Submit
                                </Button>

                            </Box>

                            {/* SOCIAL */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginTop: '1.5rem',
                                    justifyContent: 'flex-end',
                                    flexWrap: 'wrap',

                                    '@media(max-width : 600px)': {
                                        justifyContent: 'center'
                                    }
                                }}
                            >

                                {SOCIAL____MEDIA.map((item, index) => (

                                    <Box
                                        key={index}
                                        sx={{
                                            transition: '0.5s',

                                            '&:hover': {
                                                transform: 'translateY(-5px)'
                                            }
                                        }}
                                    >

                                        <Link
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#E5EBD9',
                                                border: "1px solid #557804",
                                                borderRadius: '50%',
                                                width: '48px',
                                                height: '48px',
                                            }}
                                            href={item.href}
                                        >

                                            <Image
                                                src={item.image}
                                                alt=""
                                            />

                                        </Link>

                                    </Box>

                                ))}

                            </Box>

                        </Box>

                    </Grid>

                </Grid>


                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <Box className={classes.box__listAlign}>

                            <Typography
                                className={classes.heading__align}
                                variant='h5'
                                color={'#000'}
                            >
                                Global Presense
                            </Typography>

                            {/* INNER GRID */}
                            <Grid
                                container
                                spacing={3}
                                sx={{ marginTop: '10px' }}
                            >

                                {/* UK */}
                                <Grid item lg={4} md={6} sm={6} xs={12}>

                                    <Box className={classes.addressCard}>

                                        <Typography className={classes.addressTitle}>
                                            United Kingdom
                                        </Typography>

                                        <Typography className={classes.addressText}>
                                            39 William Street
                                            <br />
                                            London, England
                                            <br />
                                            United Kingdom
                                            <br />
                                            E10 6BD
                                        </Typography>

                                    </Box>

                                </Grid>

                                {/* UAE */}
                                <Grid item lg={4} md={6} sm={6} xs={12}>

                                    <Box className={classes.addressCard}>

                                        <Typography className={classes.addressTitle}>
                                            United Arab Emirates
                                        </Typography>

                                        <Typography className={classes.addressText}>
                                            Shams Business Center
                                            <br />
                                            Sharjah Media City Free Zone
                                            <br />
                                            Al Messaned
                                            <br />
                                            Sharjah, UAE
                                        </Typography>

                                    </Box>

                                </Grid>

                                {/* USA */}
                                <Grid item lg={4} md={6} sm={6} xs={12}>

                                    <Box className={classes.addressCard}>

                                        <Typography className={classes.addressTitle}>
                                            United States
                                        </Typography>

                                        <Typography className={classes.addressText}>
                                            Recore Coin LLC
                                            <br />
                                            4520 W Pine Blvd Apt 5
                                            <br />
                                            Saint Louis
                                            <br />
                                            MO 63108-2164
                                        </Typography>

                                    </Box>

                                </Grid>

                            </Grid>

                        </Box>
                    </Grid>

                </Grid>


                {/* BOTTOM */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        borderTop: '1px solid #BBC99B',
                        marginTop: '3rem',
                        paddingTop: '1rem',

                        '@media(max-width : 600px)': {
                            justifyContent: 'center',
                            textAlign: 'center',
                            gap: '1rem'
                        }
                    }}
                >

                    <Box>

                        <Box className={classes.dis__claim}>

                            <Link
                                className={classes.linkBtm}
                                href={'#'}
                            >
                                <Image src={logo} alt={''} />
                            </Link>

                            <Link className={classes.linkBtm} href={'#'}>
                                Contact Us
                            </Link>

                            <Link className={classes.linkBtm} href={'#'}>
                                Privacy
                            </Link>

                            <Link className={classes.linkBtm} href={'#'}>
                                Terms
                            </Link>

                            <Link className={classes.linkBtm} href={'#'}>
                                Token Disclaimer
                            </Link>

                        </Box>

                    </Box>

                    <Typography color={'#000'}>
                        2026 ReCore Chain. All rights reserved.
                    </Typography>

                </Box>

            </Box>
        </>
    )
}

export default Footer;