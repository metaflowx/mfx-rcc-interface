import { useAppKitNetwork } from "@reown/appkit/react";
import EarningTable from "./earningTable"
import Statscard from "./statscard"
import { useAccount, useReadContract } from "wagmi";
import { Address, erc20Abi, formatEther } from "viem";
import { iocConfig, stakeConfig, TokenContractAddress } from "@/app/constants/contract";
import { convertToAbbreviated } from "@/lib/convertToAbbreviated";

const Earning = () => {

    const { chainId } = useAppKitNetwork();
    const { address } = useAccount();

    const { data: tokenPriceUSDT } = useReadContract({
        ...iocConfig,
        functionName: "getSaleTokenPrice",
        args: [1],
        chainId: Number(chainId) ?? 56,
    });

    const tokenPrice = tokenPriceUSDT && tokenPriceUSDT;
    const tokenPriceBig = Number(formatEther(BigInt(tokenPrice ?? 0)));
    const dailyReward = useReadContract({
        ...stakeConfig,
        functionName: "user2Staker",
        args: [address as Address],
        chainId: Number(chainId) ?? 56,
    })

    const teamBusiness = useReadContract({
        ...stakeConfig,
        functionName: "calculateTeamBusiness",
        args: [address as Address],
        chainId: Number(chainId) ?? 56,
    });

    const yourReward = useReadContract({
        ...stakeConfig,
        functionName: "getReward",
        args: [address as Address],
        chainId: Number(chainId) ?? 56,
    });


    const customCardData = [
        {
            id: 101,
            title: `${convertToAbbreviated(Number(
                Number(formatEther(BigInt(teamBusiness?.data ?? 0))) /
                tokenPriceBig
            ))}`,
            text: "Your Wallet Balance",
            data: `${convertToAbbreviated(Number(
                Number(formatEther(BigInt(teamBusiness?.data ?? 0)))
            ))}`
        },
        {
            id: 102,
            title: `${convertToAbbreviated(Number(
                Number(formatEther(BigInt(dailyReward?.data?.claimedRewards ?? 0)))
            ))}`,
            text: "Total Earnings",
            data: `${dailyReward?.data?.claimedRewards
                ? convertToAbbreviated(
                    Number(formatEther(dailyReward?.data?.claimedRewards)) *
                    tokenPriceBig
                )
                : "0"
                } `
        },
        {
            id: 103,
            title: `${convertToAbbreviated(Number(
                Number(formatEther(BigInt(dailyReward?.data?.volume ?? 0)))
            ))}`,
            text: "Total Staking Amount",
            data: `${dailyReward?.data?.amount
                ? convertToAbbreviated(Number(formatEther(dailyReward?.data?.amount)))
                : "0"
                } `
        },
        // {
        //     id: 104,
        //     title: `${convertToAbbreviated(Number(
        //         Number(formatEther(BigInt(yourReward?.data ?? 0)))/
        //         tokenPriceBig
        //     ))}`,
        //     text: "Your Reward",
        //     data: `${convertToAbbreviated(Number(
        //         Number(formatEther(BigInt(yourReward?.data ?? 0)))
        //     ))}`
        // },


    ]

    return (
        <>

            <Statscard cardData={customCardData} />
            <EarningTable />

        </>
    )
}

export default Earning