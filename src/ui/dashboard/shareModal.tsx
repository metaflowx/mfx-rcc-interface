'use client';

import React from 'react';
import {
    Box,
    Dialog,
    DialogContent,
    DialogProps,
    Typography,
    IconButton,
    useMediaQuery,
    useTheme,
    Button,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ShareIcon from '@mui/icons-material/Share';
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    XIcon,
} from 'react-share';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeadingGred from '@/theme/components/headingGred';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Heading from '@/theme/components/heading';

const socialButtonStyle = {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '2rem',
    padding: '0 1rem',
};

export default function ShareModal({ referLink1,referLink2 }: { referLink1: string,referLink2:string }) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(referLink2);
            toast.success('Referral link copied!', {
                position: 'top-right',
                autoClose: 3000,
                theme: 'dark',
            });
        } catch (error) {
            toast.error('Failed to copy!', {
                position: 'bottom-center',
                autoClose: 1500,
                theme: 'dark',
            });
        }
    };

    return (
        <>
            <Box onClick={handleClickOpen('paper')} sx={{ cursor: 'pointer', width: 40 }}>
                <ShareIcon sx={{ color: '#557804' }} />
            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                slotProps={{
                    backdrop: {
                        sx: {
                            backdropFilter: 'blur(6px)',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        },
                    },
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: '#fff',
                        border: '1px solid #557804',
                        padding: '1rem',
                        borderRadius: '16px',
                        width: isMobile ? '90%' : '500px',
                        maxWidth: '100%',
                    },
                }}
            >
                <Box textAlign="right">
                    <IconButton onClick={handleClose}>
                        <ClearIcon sx={{ color: '#557804' }} />
                    </IconButton>
                </Box>

                <DialogContent dividers={scroll === 'paper'}>
                    <Box textAlign="center">
                        <Heading heading={"Earn RCC Coin by referring your friends and community!"} variantt={"h4"} />

                        <Typography mt={2} color="#000">
                            Share your unique link below and receive{' '}
                            <Typography component="span" color="#557804" fontWeight="bold">
                                5%
                            </Typography>{' '}
                            of all transactions realized with your link{' '}
                            <Typography component="span" color="#557804" fontWeight="bold">
                                instantly
                            </Typography>
                            !
                        </Typography>
                    </Box>
                </DialogContent>

                <Box textAlign="center" mt={2}>
                    <Box
                        sx={{
                            background: 'linear-gradient(85deg, #557804, #557804, #557804)',
                            padding: '10px 20px',
                            borderRadius: '30px',
                            display: 'inline-flex',
                            justifyContent: 'space-between',
                            gap: '10px',
                            color: '#fff',
                            fontSize: '14px',
                            maxWidth: '90%',
                            cursor: 'pointer',
                        }}
                        onClick={handleCopy}
                    >
                        <Typography>{referLink1}</Typography>
                        <ContentCopyIcon />
                    </Box>
                </Box>

                <Box sx={socialButtonStyle}>
                    <TwitterShareButton url={referLink2}>
                        <XIcon size={32} round />
                    </TwitterShareButton>

                    <WhatsappShareButton url={referLink2}>
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>

                    <FacebookShareButton url={referLink2}>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>

                    <LinkedinShareButton url={referLink2}>
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>

                    <TelegramShareButton url={referLink2}>
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>
                </Box>
            </Dialog>
        </>
    );
}
