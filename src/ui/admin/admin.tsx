import { useAppKitNetwork } from "@reown/appkit/react";
import Statscard from "./statscard"
import { useAccount, useBalance, useReadContract, useReadContracts } from "wagmi";
import { Address, erc20Abi, formatEther } from "viem";
import { iocConfig, stakeConfig, TokenContractAddress } from "@/app/constants/contract";
import { convertToAbbreviated } from "@/lib/convertToAbbreviated";
import { contractConfig } from "@/app/constants/contract";

const Admin = () => {

    const { chainId } = useAppKitNetwork();
    const { address } = useAccount();

    const { data: resultUSDTTokenBalanceInICO } = useReadContract({
        abi: erc20Abi,
        address: chainId === 56 ? "0xC514Fc301BCEC34352AE759f14A237FDb1F809CB" : TokenContractAddress,
        functionName: "balanceOf",
        args: [iocConfig.address],
        account: address,
    });

    const { data: resultOfBNBBalanceInICO } = useBalance({
        address: iocConfig.address,
        chainId: 56,
    });

    const { data: tokenPriceUSDT } = useReadContract({
        ...iocConfig,
        functionName: "getSaleTokenPrice",
        chainId: Number(chainId) ?? 56,
    });

    const { data: totalICOUsers } = useReadContract({
        ...iocConfig,
        functionName: "totalContributor",
        args: [1],
        chainId: Number(chainId) ?? 56,
    });

    const tokenPrice = tokenPriceUSDT && tokenPriceUSDT;
    const tokenPriceBig = Number(formatEther(BigInt(tokenPrice ?? 0)));

    const referralRewardResult = useReadContract({
        ...contractConfig,
        functionName: "totalReferralBonusReward",
        chainId: Number(chainId) ?? 56,
    })

    const stakerResult = useReadContracts({
        contracts: [
            {
                ...stakeConfig,
                functionName: "totalStaked",
                chainId: Number(chainId) ?? 56,
            },
            {
                ...stakeConfig,
                functionName: "totalUnstaked",
                chainId: Number(chainId) ?? 56,
            },
            {
                ...stakeConfig,
                functionName: "totalStakersLength",
                chainId: Number(chainId) ?? 56,
            },
            {
                ...stakeConfig,
                functionName: "totalRewards",
                chainId: Number(chainId) ?? 56,
            },
            {
                ...stakeConfig,
                functionName: "totalFeeTreasury",
                chainId: Number(chainId) ?? 56,
            },

        ],
    });





    const customCardData = [
        {
            id: 101,
            title: `${convertToAbbreviated(Number(
                Number(formatEther(BigInt(stakerResult?.data?.[0].result ?? 0)))
            ))}`,
            text: "Total Staking",
            data: `${stakerResult?.data?.[0]
                ? convertToAbbreviated(
                    Number(formatEther(BigInt(stakerResult?.data?.[0].result ?? 0))) *
                    tokenPriceBig
                )
                : "0"
                } `
        },
        {
            id: 102,
            title: `${convertToAbbreviated(Number(
                Number(formatEther(BigInt(stakerResult?.data?.[1].result ?? 0)))
            ))}`,
            text: "Total Unstaking",
            data: `${stakerResult?.data?.[1]
                ? convertToAbbreviated(
                    Number(formatEther(BigInt(stakerResult?.data?.[1].result ?? 0))) *
                    tokenPriceBig
                )
                : "0"
                } `
        },
        {
            id: 103,
            title: `${convertToAbbreviated(Number(
                Number(formatEther(BigInt(stakerResult?.data?.[3].result ?? 0)))
            ))}`,
            text: "Total Staking Rewards",
            data: `${stakerResult?.data?.[3]
                ? convertToAbbreviated(
                    Number(formatEther(BigInt(stakerResult?.data?.[3].result ?? 0))) *
                    tokenPriceBig
                )
                : "0"
                } `
        },
        {
            id: 104,
            title: `${convertToAbbreviated(Number(
                Number(formatEther(BigInt(referralRewardResult?.data ?? 0)))
            ))}`,
            text: "Total Referral Rewards",
            data: `${referralRewardResult?.data
                ? convertToAbbreviated(
                    Number(formatEther(referralRewardResult?.data)) *
                    tokenPriceBig
                )
                : "0"
                } `
        },
        {
            id: 105,
            title: `${convertToAbbreviated(Number(
                Number((BigInt(stakerResult?.data?.[2].result ?? 0)))
            ), 0)}`,
            text: "Total Staking Users",
            data: `0`,
            isAdmin: true
        },
        {
            id: 106,
            title: `${convertToAbbreviated(Number(
                ((totalICOUsers ?? 0))
            ), 0)}`,
            text: "Total ICO Users",
            data: `0`,
            isAdmin: true
        },

        {
            id: 107,
            title: `${convertToAbbreviated(Number(
                Number(formatEther(BigInt(stakerResult?.data?.[4].result ?? 0)))
            ))}`,
            text: "Total Fee Treasure",
            data: `${stakerResult?.data?.[4]
                ? convertToAbbreviated(
                    Number(formatEther(BigInt(stakerResult?.data?.[4].result ?? 0))) *
                    tokenPriceBig
                )
                : "0"
                } `
        },
        {
            id: 108,
            title: `${convertToAbbreviated(Number(
                formatEther(BigInt(resultUSDTTokenBalanceInICO ?? 0))
            ))}`,
            text: "ICO USDT Balance",
            data: `0`,
            isAdmin: true
        },
        {
            id: 109,
            title: `${convertToAbbreviated(Number(
                formatEther(BigInt(resultOfBNBBalanceInICO?.value ?? 0))
            ))}`,
            text: "ICO BNB Balance",
            data: `0`,
            isAdmin: true
        },


    ]

    return (
        <>

            <Statscard cardData={customCardData} />

        </>
    )
}

export default Admin