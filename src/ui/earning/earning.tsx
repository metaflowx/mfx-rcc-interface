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

    const { data: resultOfTokenBalance } = useReadContract({
        abi: erc20Abi,
        address: chainId === 56 ? "0xC514Fc301BCEC34352AE759f14A237FDb1F809CB" : TokenContractAddress,
        functionName: "balanceOf",
        args: [address as Address],
        account: address,
    });

    const { data: tokenPriceUSDT } = useReadContract({
        ...iocConfig,
        functionName: "getSaleTokenPrice",
        chainId: Number(chainId) ?? 56,
    });

    const tokenPrice = tokenPriceUSDT && tokenPriceUSDT;
    const tokenPriceBig = Number(formatEther(BigInt(tokenPrice ?? 0)));

    const rccUSDTAmount =
        Number(formatEther(BigInt(resultOfTokenBalance ?? 0))) * tokenPriceBig;

    const dailyReward = useReadContract({
        ...stakeConfig,
        functionName: "user2Staker",
        args: [address as Address],
        chainId: Number(chainId) ?? 56,
    })



    const customCardData = [
        {
            id: 101,
            title: `${convertToAbbreviated(Number(
                formatEther(BigInt(resultOfTokenBalance ?? 0))
            ))}`,
            text: "Your Wallet Balance",
            data: `${convertToAbbreviated(Number(rccUSDTAmount))}`
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