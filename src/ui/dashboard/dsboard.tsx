"use client"
import { Box } from "@mui/material"
import ProgressCard from "./progressCard"
import Statscard from "./statscard"
import ReferralCard from "./referralCard"
import PurchaseHistory from "./purchaseHistory"
import { useAppKitNetwork } from "@reown/appkit/react"
import { useAccount, useReadContract } from "wagmi"
import { Address, erc20Abi, formatEther } from "viem"
import { iocConfig, stakeConfig, TokenContractAddress } from "@/app/constants/contract"
import { convertToAbbreviated } from "@/lib/convertToAbbreviated"



const Dsboard = () => {

    const { chainId } = useAppKitNetwork();
    const { address } = useAccount();
    const { data: resultOfTokenBalance } = useReadContract({
        abi: erc20Abi,
        address: chainId === 97 ? "0xC514Fc301BCEC34352AE759f14A237FDb1F809CB" : TokenContractAddress,
        functionName: "balanceOf",
        args: [address as Address],
        account: address,
    });

    const { data: tokenPriceUSDT } = useReadContract({
        ...iocConfig,
        functionName: "getSaleTokenPrice",
        args: [1],
        chainId: Number(chainId) ?? 56,
    });

    const tokenPrice = tokenPriceUSDT && tokenPriceUSDT;
    const tokenPriceBig = Number(formatEther(BigInt(tokenPrice ?? 0)));
    const orllaUSDTAmount =
        Number(formatEther(BigInt(resultOfTokenBalance ?? 0))) * tokenPriceBig;

    const dailyReward = useReadContract({
        ...stakeConfig,
        functionName: "user2Staker",
        args: [address as Address],
        chainId: Number(chainId) ?? 56,
    });

    const getRef = useReadContract({
        ...iocConfig,
        functionName: "user2SaleType2Contributor",
        args: [address as Address, 1],
        chainId: Number(chainId) ?? 56,
        query: {
            select(data) {
                const value = parseFloat(formatEther(data.volume));
                return value.toFixed(2);
            },
        },
    });

    const defaultCardData = [
        {
            id: 1,
            title: `${convertToAbbreviated(Number(
                formatEther(BigInt(resultOfTokenBalance ?? 0))
            ))}`,
            text: "Your Wallet Balance",
            data: `${convertToAbbreviated(Number(orllaUSDTAmount))}`
        },
        {
            id: 2,
            title: `${convertToAbbreviated(Number(getRef?.data || 0)) || 0}`,
            text: "Your Coin Worth at Launch",
            data: `${convertToAbbreviated(Number(getRef?.data || 0) * Number(0.06)) || 0}`
        },
        {
            id: 3,
            title: `${convertToAbbreviated(Number(getRef?.data || 0)) || 0}`,
            text: "Projected RCC at $1",
            data: `${convertToAbbreviated(Number(getRef?.data || 0) * Number(1)) || 0}`
        },
        {
            id: 4,
            title: `${convertToAbbreviated(
                Number(formatEther(BigInt(dailyReward?.data?.volume ?? 0)))
            )}`,
            text: "Self Staking Amount",
            data: `${dailyReward?.data?.amount
                ? convertToAbbreviated(Number(formatEther(dailyReward?.data?.amount)))
                : "0"} `
        }
    ]

    return (
        <>

            <Statscard cardData={defaultCardData} />
            <ProgressCard />
            <PurchaseHistory />
            <Box mt={3}><ReferralCard /></Box>



        </>
    )
}

export default Dsboard