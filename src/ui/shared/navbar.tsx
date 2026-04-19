


import Link from 'next/link'
import { Badge, Box, colors, styled, Typography } from '@mui/material'
import { usePathname } from 'next/navigation';
import { useAccount } from 'wagmi';




const LinkStyled = styled(Link)(({ theme }) => ({
    color: '#000',

    ':hover': {
        color: '#557804'
    }

}));

const LoginStyled = styled(Link)(({ theme }) => ({
  backgroundColor: '#557804',
    color: '#fff !important',
    padding: '10px 22px !important',
    display: 'inline-flex',
    fontWeight:'bold !important',
    textDecoration: 'none',
marginLeft:'10px',
    borderRadius: '5rem !important',
    transition: '0.5s',
    ':hover': {
        transform: 'translateY(-5px)'
    },

}));

const ListBox = styled('ul')(({ theme }) => ({
    padding: 0,
    listStyle: 'none',
    display: 'inline-flex',
    justifyContent:'center',
    gap: '2rem',

    borderRadius: '5rem',
    '@media(max-width : 1200px)': {
        gap: '0.5rem',
        '@media(max-width : 900px)': {
        display: 'inherit',
        backgroundColor: 'transparent',
        border: 'none'
    }
    }

}));

const ListItem = styled('li')(({ theme }) => ({
    'a': {
        padding: '0px 14px',
        display: 'inline-block',
        color: '#000',
        textDecoration: 'none',
        borderRadius: '6px',
        width: 'max-content',
        '@media(max-width : 1200px)': {
            padding: '4px 10px',
            marginTop: '1rem'
        }
    }
}));

const BoxConnect = styled(Box)(({ theme }) => ({
    display: 'none',
    '@media(max-width : 600px)': {
        display: 'block',

    }
}));

const navLinks = [
    {
        name: 'Overview',
        href: '/'
    },
    {
        name: 'Validators',
        href: '/validators'
    },
    {
        name: 'Delegator',
        href: '/delegator'
    },
    {
        name: 'My Account',
        href: '/account'
    },
    {
        name: 'History',
        href: '/history'
    },
]

const Navbar = () => {
    // const { address, isConnected } = useAccount()
    const pathname = usePathname()

    return (
        <Box>
            <ListBox>
                <ListItem>
                    <LinkStyled
                        href="/#home">
                        Home
                    </LinkStyled>
                </ListItem>
                <ListItem>
                    <LinkStyled
                        href="/#about"
                    >
                        About
                    </LinkStyled>
                </ListItem>
                <ListItem>
                    <LinkStyled
                        href="/#howitworks"
                    >
                        How it works
                    </LinkStyled>
                </ListItem>
                <ListItem>
                    <LinkStyled
                        href="/#features"
                    >
                        Features
                    </LinkStyled>
                </ListItem>
                {/* <ListItem>
                    <LinkStyled
                        href="/#faq"
                    >
                        ICO
                    </LinkStyled>
                </ListItem> */}

                <ListItem>
                     
                    <LinkStyled
                        href="/#roadmap"
                    >
                        Roadmap
                    </LinkStyled>
                    
                </ListItem>

                
                <ListItem>
                    
                    <LinkStyled
                        href="/#tokenomics"
                    >
                        Tokenomics
                    </LinkStyled>
                   
                </ListItem>

                <ListItem>
                    <LinkStyled
                        href="/#faq"
                    >
                        FAQs
                    </LinkStyled>
                </ListItem>
                 

                <ListItem>
                    <BoxConnect>

                        <LoginStyled
                            href={"/dashboard"}>
                            <Typography>Join ICO</Typography>
                        </LoginStyled>

                        <Box mt={2} />

                    </BoxConnect>
                </ListItem>

            </ListBox>

        </Box>
    )
}
export default Navbar