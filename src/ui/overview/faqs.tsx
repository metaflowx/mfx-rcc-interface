import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Grid, Typography, styled, useTheme } from "@mui/material"
import SouthIcon from '@mui/icons-material/South';
import { useState } from "react";
import Heading from "@/theme/components/heading";



const Accordion_list = [
    {
        id: 1,
        title: "What is ReCore?",
        text: "ReCore is a decentralized platform offering secure spot and perpetual trading, along with advanced mining capabilities—all powered by blockchain technology."
    },
    {
        id: 2,
        title: "How is ReCore different from centralized exchanges?",
        text: "ReCore operates without intermediaries, giving users full control over their funds. Unlike centralized exchanges, it emphasizes transparency, decentralization, and privacy."
    },
    {
        id: 3,
        title: "What can I trade on ReCore?",
        text: "Users can trade a variety of cryptocurrencies on ReCore’s spot and perpetual trading markets."
    },
    {
        id: 4,
        title: "Is ReCore secure?",
        text: "Yes. ReCore leverages blockchain security, decentralized protocols, and smart contracts to ensure user funds and data remain safe."
    },
    {
        id: 5,
        title: "How does ReCore Mining work?",
        text: "ReCore Mining allows users to earn rewards by participating in network security and liquidity provisioning. More details are available in the mining section of the platform."
    },
    {
        id: 6,
        title: "Do I need to complete KYC to use ReCore?",
        text: "No, ReCore offers a permissionless experience, meaning you can trade and interact without undergoing traditional KYC processes."
    },
    {
        id: 7,
        title: "What wallets are supported?",
        text: "ReCore supports a range of decentralized wallets like MetaMask, WalletConnect, and other Web3-compatible wallets."
    },
    {
        id: 8,
        title: "Are there any fees?",
        text: "Yes, ReCore charges competitive trading and gas fees, clearly outlined on the platform for transparency."
    },
    {
        id: 9,
        title: "Is there a native token?",
        text: "Yes, ReCore has a native token that powers various functions like governance, staking, and fee discounts."
    },
    {
        id: 10,
        title: "How can I get started?",
        text: "Visit the ReCore website, connect your wallet, and start trading or mining right away. No account creation or KYC needed."
    },




]




const Faqs = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel: any | any | ((prevState: any) => any)) => (event: any, isExpanded: any) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <>
            <Box sx={{
                padding:'6rem 0rem',
                '@media(max-width : 600px)':{
                         padding: '0rem 0rem 3rem 0rem'
                    }
            }}>


                <Box mb={2}>
                    <Heading heading={"Frequently Asked Questions"} variantt={"h3"} />

                </Box>
                <Grid container spacing={2}>

                    <Grid    item lg={12} md={12} sm={12} xs={12}>

                        {Accordion_list.map((item, index) => (
                            <Accordion  
                           
                                key={index}
                                expanded={expanded === `panel${index}` as any}
                                onChange={handleChange(`panel${index}`)}
                                sx={{
                                    backgroundColor: '#1c1c2004',
                                    borderRadius: '16px',
                                    boxShadow: 'inherit',
                                    marginTop: '1rem',
                                    padding: '5px',
                                    border: '1px solid #557804',
                                    '&:first-of-type': {
                                        borderTopLeftRadius: '16px',
                                        borderTopRightRadius: '16px',
                                        
                                    },
                                    '&:last-of-type': {
                                        borderBottomLeftRadius: '16px',
                                        borderBottomRightRadius: '16px',
                                    },
                                    '&.Mui-expanded': {
                                        backgroundColor:'#557804',
                                        marginTop: '1rem',
                                        color: '#fff',
                                        border: '1px solid #557804',
                                    },
                                }}>
                                <AccordionSummary

                                    sx={{
                                        fontWeight: 700,
                                        color: expanded === `panel${index}` as any ? '#fff' : '#000',
                                        minHeight: '48px',
                                        '&.Mui-expanded': {
                                            minHeight: '40px' // or whatever height you prefer
                                        },
                                        '& .MuiAccordionSummary-content.Mui-expanded': {
                                            margin: 0
                                        }
                                    }}
                                    expandIcon={<SouthIcon sx={{ color: expanded === `panel${index}` as any ? '#fff' : '#557804' }} />}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}

                                >
                                    {item.title}
                                </AccordionSummary>
                                <AccordionDetails sx={{ padding: '4px 12px' }} >

                                    {item.text}

                                </AccordionDetails>
                            </Accordion>
                        ))}

                    </Grid>

                </Grid>

            </Box>


        </>
    )
}

export default Faqs


