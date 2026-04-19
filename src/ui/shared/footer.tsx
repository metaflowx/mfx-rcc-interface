import { Box, Button, Grid, InputBase, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import ss1 from '../../icons/recorechain/ss1.svg'
import ss2 from '../../icons/recorechain/ss2.svg'
import ss3 from '../../icons/recorechain/ss3.svg'
import ss4 from '../../icons/recorechain/ss4.svg'
import Image from 'next/image';
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
        border: '1px solid #343952'

    },
    tele: {
        backgroundColor: '#00FFFF',
        display: 'inline-block',
        padding: '0.8rem 1rem',
        borderRadius: '12px'
    },
    line: {
        width: '70%',
        margin: 'auto',
        height: '1px',
        background: 'linear-gradient(90deg, #071616, #00FFFF, #071616)',
    },
    box__listAlign: {

        '@media(max-width : 600px)': {
            textAlign: 'center'
        }
    },
    heading__align: {
        textTransform: 'uppercase',
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
        '@media(max-width : 900px)':{
            gap: '10px',
            '@media(max-width : 600px)':{
            justifyContent:'center'
        }
        }
    },
    linkBtm: {
        color: '#000',
        textDecoration: 'none',
        '&:hover': {
            color: '#000',
        }
    }
})

const Footer = () => {
    const classes = useStyles();
    return (
        <>
            <Box>
                <Grid container spacing={2}>
                    <Grid data-aos="fade-left" item lg={3} md={2.5} sm={6} xs={12}>
                        <Box className={classes.box__listAlign}>
                            <Typography className={classes.heading__align} variant='h6' color={'#000'}>About</Typography>
                            <Box className={classes.list} component={'ul'}>
                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">About Us</Link>
                                </Box>
                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">Careers</Link>
                                </Box>
                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">Announcements</Link>
                                </Box>
                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">Blog</Link>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid data-aos="fade-up" item lg={3} md={2.5} sm={6} xs={12}>
                        <Box className={classes.box__listAlign}>
                            <Typography className={classes.heading__align} variant='h6' color={'#000'}>Services</Typography>
                            <Box className={classes.list} component={'ul'}>
                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">Referral</Link>
                                </Box>
                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">Apps Dashboard</Link>
                                </Box>

                            </Box>
                        </Box>
                    </Grid>
                    <Grid data-aos="fade-down" item lg={3} md={2.5} sm={6} xs={12}>
                        <Box className={classes.box__listAlign}>
                            <Typography className={classes.heading__align} variant='h6' color={'#000'}>Support</Typography>
                            <Box className={classes.list} component={'ul'}>
                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">Help Center</Link>
                                </Box>
                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">Whitepaper</Link>
                                </Box>
                                <Box className={classes.listBox} component={'li'}>
                                    <Link className={classes.list__item} href="">Give Us Feedback</Link>
                                </Box>

                            </Box>
                        </Box>
                    </Grid>
                    <Grid data-aos="fade-right" item lg={3} md={4.5} sm={6} xs={12}>
                        <Box className={classes.box__listAlign}>
                            <Typography className={classes.heading__align} variant='h6' color={'#000'}>Subscribe to our Newsletter</Typography>

                            <Box className={classes.input__box}>
                                <InputBase
                                    sx={{
                                        flex: 1,
                                        color: '#000',
                                        width: '100%',
                                        padding: '0.3rem 0.5rem',
                                        ':-moz-placeholder': {
                                            color: '000',
                                        }
                                    }}
                                    fullWidth
                                    placeholder={'Enter a valid email '}
                                    type={''}
                                />
                                <Box>
                                    <Button sx={{
                                       backgroundColor:'#557804',
                                        color: '#fff',
                                        padding: '10px 30px',
                                        display: 'inline-flex',
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        borderRadius: '5rem',


                                    }}>Submit</Button>
                                </Box>
                            </Box>

                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                marginTop: '1rem',
                                justifyContent:'end',
                                flexWrap: 'wrap',
                                '@media(max-width : 600px)':{
                                    justifyContent:'center'
                                }
                                 
                            }}>
                                {SOCIAL____MEDIA.map((item, index) => (
                                    <Box sx={{
                                        transition: '0.5s',
                                        '&:hover': {
                                            transform: 'translateX(-5px)'
                                        }
                                    }} key={index}>
                                        <Link style={{display:'block',backgroundColor:'#E5EBD9',border:"1px solid #557804", borderRadius:'5rem'}} href={item.href}><Image style={{display:'block'}} src={item.image} alt={''} /></Link>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    borderTop: '1px solid #BBC99B',
                    marginTop: '2rem',
                    '@media(max-width : 600px)':{
                        justifyContent:'center',
                        margin: '2rem 0rem',
                    } 

                }}>
                    <Box >
                        <Box className={classes.dis__claim}>
                            <Link className={classes.linkBtm} href={'#'}><Image src={logo} alt={''} /></Link>
                            <Link className={classes.linkBtm} href={'#'}>Contact Us</Link>
                            <Link className={classes.linkBtm} href={'#'}>Privacy</Link>
                            <Link className={classes.linkBtm} href={'#'}>Terms</Link>
                            <Link className={classes.linkBtm} href={'#'}>Token Disclaimer</Link>
                        </Box>
                    </Box>
                    <Box ><Typography color={'#000'}>2026 ReCore Chain. All rights reserved.</Typography></Box>
                </Box>
            </Box>
        </>
    )
}

export default Footer;