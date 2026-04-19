'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    ToggleButton,
    useTheme,
    Grid,
    InputAdornment,
    Tooltip,
    IconButton,
    styled,
    Badge,
} from '@mui/material';
import Image from 'next/image';

import coin from '../../icons/recorechain/recorecointoken.svg';
import usdtIcon from '../../icons/recorechain/usdt.svg';
import usdcIcon from '../../icons/recorechain/usdc.svg';
import bnbIcon from '../../icons/recorechain/bnb.svg';
import ethIcon from '../../icons/recorechain/eth.svg';
import { Address, erc20Abi, formatEther, parseEther, parseUnits, zeroAddress } from 'viem';
import { useAccount, useBalance, useBlockNumber, useReadContract, useReadContracts, useWriteContract } from 'wagmi';
import { contractConfig, ICOContractAddress, iocConfig, stakeConfig, tokenConfig } from '@/app/constants/contract';
import { toast } from 'react-toastify';
import { extractDetailsFromError } from '@/lib/extractDetailsFromError';
import { IcoABI } from '@/app/ABI/IcoABI';
import useCheckAllowance from '@/hooks/useCheckAllowance';
import { useAppKit, useAppKitNetwork } from '@reown/appkit/react';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import CoinSelector from './coinSelector';
import copy from 'clipboard-copy'
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const communityAddress = "0x8Ed17Fd552D73123466B57Ee32e00e3221e0A92D";


const paymentOptions = [
    { label: 'USDT', icon: usdtIcon },
    { label: 'USDC', icon: usdcIcon },
    { label: 'BNB', icon: bnbIcon },
    { label: 'ETH', icon: ethIcon },
];

const ProgressCard: React.FC = () => {
    const theme = useTheme();
    const [paymentMethod, setPaymentMethod] = useState<string>('USDT');

    const progress = 20;

    const selectedIcon = paymentOptions.find(opt => opt.label === paymentMethod)?.icon;

    const { open, close } = useAppKit();
    const { data: blockNumber } = useBlockNumber({
        watch: {
            enabled: true,
            pollingInterval: 5_000,
        }
    });
    const { address } = useAccount();
    const [selectedToken, setSelectedToken] = useState({
        tokenname: "BNB",
        id: "bnb",
        imgurl: bnbIcon,
        address: zeroAddress,
    });
    const { writeContractAsync, isPending, isSuccess, isError } =
        useWriteContract();
    const queryClient = useQueryClient();
    const searchparm = useSearchParams();
    const { chainId } = useAppKitNetwork();
    const [value, setValue] = useState(0);
    const [isAproveERC20, setIsApprovedERC20] = useState(true);
    const [value1, setValue1] = useState(0);
    const [amount, setAmount] = useState<string>("");

    const [referrer, setReferrer] = useState(searchparm.get("ref") || "");
    const resultOfCheckAllowance = useCheckAllowance({
        spenderAddress: ICOContractAddress,
        token: selectedToken.address,
    })


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
                chainId: Number(chainId) ?? 56,
            },

            {
                ...contractConfig,
                functionName: "getReferrer",
                args: [address as Address],
                chainId: Number(chainId) ?? 56,
            },
            {
                ...contractConfig,
                functionName: "isValidReferrer",
                args: [address as Address, referrer as Address],
                chainId: Number(chainId) ?? 56,
            },
        ],
    });

    useEffect(() => {
        if (resultOfCheckAllowance && address) {
            const price = parseFloat(amount === "" ? "0" : amount);
            const allowance = parseFloat(
                formatEther?.(resultOfCheckAllowance.data ?? BigInt(0))
            );
            if (allowance >= price) {
                setIsApprovedERC20(true);
            } else {
                setIsApprovedERC20(false);
            }
        }
    }, [resultOfCheckAllowance, address, amount]);

    useEffect(() => {
        if (!blockNumber) return;
        queryClient.invalidateQueries({
            queryKey: resultOfCheckAllowance.queryKey,
        });
        queryClient.invalidateQueries({
            queryKey: result.queryKey,
        });
    }, [blockNumber, queryClient, !result.queryKey, !resultOfCheckAllowance.queryKey]);

    const handleBuy = async () => {
        try {
            const formattedAmount = parseUnits(amount, 18);
            const tokenAddress = selectedToken?.address;
            console.log({ tokenAddress }, result?.data?.[5]?.result !== zeroAddress
                ? (result?.data?.[5]?.result as Address)
                : (referrer as Address));

            const res = await writeContractAsync({
                address: ICOContractAddress,
                abi: IcoABI,
                functionName: "buy",
                args: [
                    1,
                    BigInt(value1),
                    tokenAddress as Address,
                    formattedAmount,
                    result?.data?.[5]?.result !== zeroAddress
                        ? (result?.data?.[5]?.result as Address)
                        : ((referrer || zeroAddress) as Address),
                ],
                value:
                    selectedToken?.tokenname === "BNB" ? parseEther(amount) : BigInt(0),
            });

            if (res) {
                setAmount("");
                toast.success("Transaction completed");
            }
        } catch (error: any) {
            console.log(">>>>>>>>>>>>.error", error);
            toast.error(extractDetailsFromError(error.message as string) as string);
        }
    };

    const approveToken = async () => {
        try {
            const formattedAmount =
                Number?.(amount) > 0
                    ? parseEther?.(amount)
                    : parseEther?.(
                        BigInt((Number.MAX_SAFE_INTEGER ** 1.3)?.toString())?.toString()
                    );
            const res = await writeContractAsync({
                abi: erc20Abi,
                address: selectedToken.address,
                functionName: "approve",
                args: [ICOContractAddress, formattedAmount],
                account: address,
            });
            if (res) {
                setIsApprovedERC20(true);
                toast.success("Token approved successfully");
            }
        } catch (error: any) {
            toast.error(extractDetailsFromError(error.message as string) as string);
        }
    };

    const { data: Balance } = useBalance({
        address: address,
    });

    const { data: resultOfTokenBalance } = useReadContract({
        abi: erc20Abi,
        address: selectedToken.address,
        functionName: "balanceOf",
        args: [address as Address],
        account: address,
        query: {
            enabled: selectedToken.tokenname === "BNB" ? false : true,
        },
        chainId: Number(chainId) ?? 56,
    });

    const totalTierLenth = useReadContract({
        ...stakeConfig,
        functionName: "totalTierLenth",
        chainId: Number(chainId) ?? 56,
    });
    const [minBuy, setMinBuy] = useState(
        result?.data?.[4]?.result?.minBuy
            ? Number(formatEther(BigInt(result.data[4].result.minBuy)))
            : 0
    )

    const tokenAddress =
        selectedToken.tokenname === "BNB" ? zeroAddress : selectedToken.address;

    const calculationresult = useReadContracts({
        contracts: [
            {
                ...iocConfig,
                functionName: "calculateUSDAmount",
                args: [tokenAddress as Address, parseEther(amount)],
                chainId: Number(chainId),
            },
            {
                ...iocConfig,
                functionName: "exchangelaunchDate",
                chainId: Number(chainId),
            },

            {
                ...iocConfig,
                functionName: "totalContributor",
                args: [1],
                chainId: Number(chainId),
            },

            {
                ...iocConfig,
                functionName: "getPaymentOption",
                args: [tokenAddress as Address],
                chainId: Number(chainId),
            },
        ],
    });

    const tokensList = useReadContract({
        ...stakeConfig,
        functionName: "getTierList",
        args: [BigInt(0), BigInt(totalTierLenth?.data || 0)],
        chainId: Number(chainId) ?? 56,
    });

    const calciulatedToken = useMemo(() => {
        if ((result && result?.data) || amount || calculationresult) {
            const tokenPrice = result?.data && result?.data[0]?.result;
            const dividedVa = calculationresult?.data
                ? (Number(
                    formatEther(BigInt(calculationresult?.data[0]?.result ?? 0))
                ) > 0
                    ? Number(
                        formatEther(BigInt(calculationresult?.data[0]?.result ?? 0))
                    )
                    : Number(amount)) / Number(formatEther(BigInt(tokenPrice ?? 0)))
                : 0;
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
            const launchDate = calculationresult?.data?.[1]?.result;
            const totalContributors = calculationresult?.data?.[2]?.result;
            const tokenPriceData = Number(formatEther(BigInt(tokenPrice ?? 0)));

            return {
                getToken: dividedVa?.toFixed(2),
                purchaseTokenUSD: purchaseTokenUSD.toFixed(2),
                totalTokenSupplyUSD: totalTokenSupplyUSD,
                totalSale: totalSaleTokenUSD.toFixed(2),
                purchaseToken: Number(purchaseToken).toFixed(2),
                launchDate: launchDate,
                totalContributors: Number(totalContributors),
                tokenPriceData: tokenPriceData,
            };
        }
    }, [result, amount, calculationresult]);

    return (
        <Box
            sx={{
                mx: 'auto',
                mt: 2,
                p: { xs: 2, sm: 3, md: 4, },
                borderRadius: '16px',
                background: 'transparent',
                color: 'white',

                border: '1px solid #557804',

            }}
        >
            {/* Progress Bar */}
            <Box
                sx={{
                    height: 20,
                    background: 'linear-gradient(85deg, #fff, #fff)',
                    borderRadius: '30px',
                    overflow: 'hidden',
                    border: '1px solid #557804',
                    mb: 4,
                }}
            >
                <Box
                    sx={{
                        height: '100%',
                        width: `${progress}%`,
                        background: 'linear-gradient(85deg, #557804, #557804, #557804)',
                        transition: 'width 0.4s ease',
                    }}
                />
            </Box>

            {/* Token Price Info */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: { xs: "center", sm: "space-between", md: "space-between", },
                    alignItems: 'center',
                    mb: 4,
                    pb: 1,
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    flexWrap: 'wrap',
                    gap: 2
                }}
            >
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <Image src={coin} alt="RCC" width={30} height={30} />
                        <Typography color={'#000'}>1 RCC =</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <Typography color={'#000'}>$ {calciulatedToken?.tokenPriceData == 0
                            ? 0.1
                            : calciulatedToken?.tokenPriceData}</Typography>
                    </Box>
                </Box>
                <Typography color={'#000'}>
                    Listing price <strong>$1.35</strong>
                </Typography>
            </Box>

            {/* Step 1 */}
            <Typography color={'#000'} variant="h6" gutterBottom textAlign={'center'}>
                Step 1 - Select the Payment Method (BEP20)
            </Typography>

            <CoinSelector
                selectedToken={selectedToken}
                setSelectedToken={setSelectedToken}
            />
            {/* 
            {
                tokensList?.data && tokensList?.data.length > 0 &&
                <Typography variant="h6" gutterBottom textAlign={'center'} color={'#000'}>
                    Step 2 - Select Staking Package of Token You Would Like to Purchase
                </Typography>
            } */}

            {/* <Box
                sx={{
                    width: "100%",
                    gap: 2,
                    mb: 3,
                    mt: 3,
                }}
            >
                <Grid container spacing={2}>
                    {tokensList?.data &&
                        tokensList.data.length > 0 &&
                        tokensList.data.map((token: any, index: number) => (
                            <Grid
                                item
                                xs={12} sm={4}
                                key={index}
                            >
                                <Box
                                    onClick={() => {
                                        setValue1(index)
                                        setMinBuy(Number(formatEther(token?.minStaked)))
                                    }
                                    }
                                    sx={{
                                        border:
                                            value1 === index
                                                ? "1px solid #557804"
                                                : "1px solid #66666657",
                                        background: "#fff",
                                        borderRadius: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                        p: 2, /// padding inside the card
                                        height: "100%", /// make all cards equal height
                                    }}
                                >
                                    <TabPanel key={index} value={value} index={index}>
                                        <Box
                                            sx={{
                                                background: "#fff",
                                                borderRadius: "30px",
                                                border: "1px solid #557804",
                                                height: "40px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: "#557804",
                                                    fontWeight: 700,
                                                    fontSize: "17px",
                                                }}
                                            >
                                                {`${index === 0 ? "Silver" : index === 1 ? "Gold" : "Diamond"}`}
                                            </Typography>
                                        </Box>

                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: "#000",
                                                fontWeight: 700,
                                                fontSize: "16px",
                                                pt: 2,
                                            }}
                                        >
                                            {`${(Number(token.returnInPercent) / 1e2 / 2)}% APR`}
                                        </Typography>
                                        <Typography
                                            sx={{ color: "#000", fontWeight: 400, fontSize: "16px" }}
                                            variant="body1"
                                        >
                                            Withdraw period daily
                                        </Typography>
                                        <Typography
                                            sx={{ color: "#000", fontWeight: 400, fontSize: "16px" }}
                                            variant="body1"
                                        >
                                            {`${Number(token.lockPeriod)} Months Lockup`}
                                        </Typography>
                                        <Typography
                                            sx={{ color: "#000", fontWeight: 400, fontSize: "16px" }}
                                            variant="body1"
                                        >
                                            {`Minimum Stake $${formatEther(token?.minStaked)}`}
                                        </Typography>
                                        {token?.isMortgageEnabled &&
                                            <Box
                                                sx={{
                                                    background: "#fff",
                                                    borderRadius: "8px",
                                                    border: "1px solid #557804",
                                                    height: "40px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    mt: 2,
                                                }}
                                            >

                                                <Badge badgeContent={"Coming Soon"} color="info">
                                                    <Button
                                                        sx={{
                                                            color: "#000",
                                                            fontWeight: 500,
                                                            fontSize: "15px",
                                                            ':hover': {
                                                                color: '#557804'
                                                            }
                                                        }}
                                                        onClick={async () => { }}
                                                    >
                                                        Lending/Borrowing
                                                    </Button>
                                                </Badge>

                                            </Box>
                                        }
                                    </TabPanel>
                                </Box>
                            </Grid>
                        ))}
                </Grid>
            </Box> */}


            {/* Step 3 */}
            <Typography variant="h6" gutterBottom textAlign={'center'} color={'#000'}>
                Step 2 - Enter the Amount of Token You Would Like to Purchase
            </Typography>

            <Box sx={{
                display: 'flex',
                gap: 2,
                my: 4,
                justifyContent: 'space-between',
                flexWrap: 'wrap'
            }}>
                {/* Token Input */}
                <Box sx={{
                    flex: 'auto',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    border: '1px solid #557804'
                }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder='0.00'
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        InputProps={{
                            style: { backgroundColor: 'transparent', color: '#000' },
                        }}
                        inputProps={{
                            min: 0, /// 👈 prevents negative numbers
                        }}
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: '#141c4807',
                                color: '#000',
                                borderRadius: 2,
                                '& input': {
                                    color: '#000',
                                    padding: '0px',
                                    fontSize: '16px',
                                    MozAppearance: 'textfield',
                                },
                                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                                '&:hover': {
                                    backgroundColor: '#000',
                                },
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#141c4806',
                            },
                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'transparent',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'transparent',
                            },
                        }}
                    />
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#000'
                    }}>
                        <Image
                            src={
                                selectedToken?.tokenname === "BNB"
                                    ? bnbIcon
                                    : selectedToken?.tokenname === "USDT"
                                        ? usdtIcon
                                        : selectedToken?.tokenname === 'USDC' ?
                                            usdcIcon :
                                            ethIcon
                            }
                            alt={selectedToken?.tokenname}
                            width={30}
                            height={30} />
                        {selectedToken?.tokenname}
                    </Box>
                </Box>

                {/* RCC Output */}
                <Box sx={{
                    flex: 'auto',
                    backgroundColor: '#fff',
                    border: '1px solid #557804',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem 1rem'
                }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={calciulatedToken?.getToken || 0}
                        InputProps={{
                            readOnly: true,
                            style: { backgroundColor: 'transparent', color: '#000' },
                        }}
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: '#141c4807',
                                color: '#000',
                                borderRadius: 2,
                                '& input': {
                                    color: '#000',
                                    padding: '0px',
                                    fontSize: '16px',
                                    MozAppearance: 'textfield',
                                },
                                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0,
                                },
                                '&:hover': {
                                    backgroundColor: '#000',
                                },
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#141c4806',
                            },
                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'transparent',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'transparent',
                            },
                        }}
                    />
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#000'
                    }}>
                        <Image src={coin} alt="RCC" width={30} height={30} />
                        RCC
                    </Box>
                </Box>

            </Box>
            {
                result?.data?.[5]?.result === zeroAddress && (
                    <Box sx={{ mb: 3 }}>
                        <>
                            <Box>
                                <TextField
                                    fullWidth
                                    id="referral"
                                    type="text"

                                    value={referrer}
                                    onChange={(e) => setReferrer(e.target.value)}
                                    placeholder="Enter referrer address 0x... "
                                    variant="outlined"
                                    InputProps={{
                                        style: { color: "#000", backgroundColor: "#fff" },
                                    }}
                                    sx={{
                                        mt: 1,
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "10px",
                                            "& fieldset": { borderColor: "#557804" },
                                            '&:hover': {
                                                backgroundColor: '#000',
                                            },
                                        },
                                        "& input": {
                                            color: "#000",
                                            fontSize: "14px",
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#557804',
                                        },
                                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#557804',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#557804',
                                        },
                                    }}
                                />
                            </Box>

                            {
                                result?.data && result.data[6].result === false && (
                                    <Typography
                                        variant="body2"
                                        color="red"
                                        mt={1}
                                        sx={{ textAlign: "" }}
                                    >
                                        Invalid referrer address. Please enter a valid referrer or use the community address.
                                    </Typography>
                                )
                            }

                            <Box
                                mt={3}
                                p={2}
                                borderRadius={2}
                                sx={{
                                    backgroundColor: "#fff",
                                    border: "1px solid #557804",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                }}
                            >


                                <Typography variant="body2" color="#999">
                                    ⚠️ Note: If you don’t have a valid referrer, you can use the community referrer address:
                                </Typography>

                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                    sx={{
                                        backgroundColor: "#fff",
                                        border: "1px solid #557804",
                                        px: 2,
                                        py: 1,
                                        borderRadius: 13,
                                        mt: 1,
                                        fontFamily: "monospace",
                                        color: "#000",
                                    }}
                                >
                                    <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                                        {communityAddress}
                                    </Typography>
                                    <Tooltip title="Copy to clipboard">
                                        <IconButton
                                            onClick={() => {
                                                copy(communityAddress);
                                                toast.success("Referrer address copied!");
                                            }}
                                            size="small"
                                            sx={{ color: "#000" }}
                                        >
                                            <ContentCopyIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>

                                </Box>
                            </Box>
                        </>
                    </Box>
                )
            }

            {/* Buy Button */}
            {
                address ? (
                    <Button
                        fullWidth
                        variant="contained"
                        disabled={
                            (calculationresult?.data?.[3]?.result?.isStable &&
                                Number(amount) < Number(minBuy)) ||
                            (!calculationresult?.data?.[3]?.result?.isStable &&
                                Number(
                                    formatEther(
                                        BigInt(calculationresult?.data?.[0]?.result ?? 0)
                                    )
                                ) < Number(minBuy)) ||
                            isPending ||
                            amount === "" ||
                            Number(amount) <= 0 ||
                            (selectedToken?.tokenname === "BNB"
                                ? Number(formatEther(Balance?.value ?? BigInt(0))) < Number(amount) ||
                                Number(formatEther(Balance?.value ?? BigInt(0))) === 0
                                : Number(formatEther(BigInt(resultOfTokenBalance ?? 0))) <
                                Number(amount))
                        }
                        sx={{
                            background: Number(amount) > 0
                                ? 'linear-gradient(85deg, #557804,  #557804,  #557804)'
                                : 'linear-gradient(85deg, #557804, #557804, #557804)',
                            color: Number(amount) > 0 ? '#fff !important' : '#fff !important',
                            fontWeight: "bold",
                            borderRadius: '40px',
                            p: 1.2,
                            transition: '0.3s',
                        }}
                        onClick={() => {
                            if (selectedToken?.tokenname === "BNB") {
                                handleBuy();
                            } else {
                                !isAproveERC20 ? approveToken() : handleBuy();
                            }
                        }}
                    >
                        {isPending
                            ? selectedToken?.tokenname === "BNB" || isAproveERC20
                                ? "Buying..."
                                : "Approving..."
                            : selectedToken?.tokenname === "BNB" && amount === ""
                                ? "Please enter amount"
                                : selectedToken?.tokenname === "BNB" && Number(amount) <= 0
                                    ? "Please enter correct amount"
                                    : (
                                        (calculationresult?.data?.[3]?.result?.isStable &&
                                            Number(amount) < Number(minBuy)) ||
                                        (!calculationresult?.data?.[3]?.result?.isStable &&
                                            Number(
                                                formatEther(
                                                    BigInt(calculationresult?.data?.[0]?.result ?? 0)
                                                )
                                            ) < Number(minBuy))
                                    )
                                        ? `Min. Buy is $${minBuy}`
                                        : (
                                            selectedToken?.tokenname === "BNB"
                                                ? Number(formatEther(Balance?.value ?? BigInt(0))) < Number(amount) ||
                                                Number(formatEther(Balance?.value ?? BigInt(0))) === 0
                                                : Number(
                                                    formatEther(BigInt(resultOfTokenBalance ?? 0))
                                                ) < Number(amount)
                                        )
                                            ? "Insufficient fund"
                                            : selectedToken?.tokenname === "BNB" || isAproveERC20
                                                ? " Buy RCC Coin"
                                                : "Approve"}
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: '#557804',
                            color: '#fff',
                            fontWeight: "bold",
                            borderRadius: '5rem',
                            boxShadow: 'none',
                            p: 1.2,
                            transition: '0.3s',
                            '&:hover': {
                                backgroundColor: '#557804',
                            }
                        }}
                        onClick={async () => open()}
                    >
                        Connect Wallet
                    </Button>
                )
            }
        </Box>
    );
};

export default ProgressCard;
function writeContractAsync(arg0: { address: any; abi: any; functionName: string; args: any[]; value: bigint; }) {
    throw new Error('Function not implemented.');
}



const TabPanel = ({
    children,
    value,
    index,
}: {
    children: any;
    value: any;
    index: any;
}) => {
    return (
        <Box
            role="tabpanel"
            key={index}
            // hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            sx={{ px: 2, color: "#fff", pb: 2, borderRadius: "8px", mt: 2 }}
        >
            <Box>{children}</Box>
        </Box>
    );
};