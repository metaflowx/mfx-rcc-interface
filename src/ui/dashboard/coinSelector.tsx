
import { useAppKitNetwork } from "@reown/appkit/react";
import React, { useMemo, useState } from "react";
import { useReadContract, useReadContracts } from "wagmi";
import { erc20Abi, zeroAddress } from "viem";
import { Box, Tab, Tabs, ToggleButton } from "@mui/material";
import Image from "next/image";
import { iocConfig } from "@/app/constants/contract";
import usdtIcon from '../../icons/recorechain/usdt.svg';
import usdcIcon from '../../icons/recorechain/usdc.svg';
import bnbIcon from '../../icons/recorechain/bnb.svg';
import ethIcon from '../../icons/recorechain/eth.svg';

export default function CoinSelector({
    selectedToken,
    setSelectedToken,
}: {
    selectedToken?: any;
    setSelectedToken?: any;
}) {
    const { chainId } = useAppKitNetwork();

    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const result = useReadContracts({
        contracts: [
            {
                ...iocConfig,
                functionName: "getAcceptedTokenList",
                chainId: Number(chainId) ?? 56,
            },
        ],
    });

    const tokenAddresses = useMemo(() => {
        const list = result?.data?.[0]?.result;
        if (Array.isArray(list)) {
            return [zeroAddress, ...list]; // e.g., [USDT, BTCB, BNB (as zero address)]
        }
        return [];
    }, [result.data]);

    const handleSelect = (coin: any, tokenLabel: string, index: number) => {
        setSelectedIndex(index);
        setSelectedToken({
            address: coin,
            tokenname: tokenLabel,
        });
    };
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)', // 2 per row on mobile
                    sm: 'repeat(4, 1fr)', // 4 per row on larger screens
                },
                gap: 2,
                mb: 3,
            }}
        >
            {tokenAddresses.map((coin: any, index: number) => (
                <TokenData
                    key={index}
                    coin={coin}
                    chainId={chainId}
                    index={index}
                    selected={index === selectedIndex}
                    onSelect={handleSelect}
                />
            ))}
        </Box>
    );
}

const TokenData = ({
    coin,
    chainId,
    index,
    selected,
    onSelect,
}: {
    coin: any;
    chainId: any;
    index: number;
    selected: boolean;
    onSelect: (coin: any, tokenLabel: string, index: number) => void;
}) => {
    const { data: symbol } = useReadContract({
        abi: erc20Abi,
        address: coin,
        functionName: "symbol",
        query: {
            enabled: coin !== zeroAddress,
        },
        chainId: Number(chainId) ?? 56,
    });

    const tokenLabel = coin === zeroAddress ? "BNB" : symbol;
    const tokenImage =
        tokenLabel === "BNB"
            ? bnbIcon
            : tokenLabel === "USDT"
                ? usdtIcon
                : tokenLabel === 'USDC' ?
                    usdcIcon :
                    ethIcon

    return (
        <ToggleButton
            key={index}
            value={tokenLabel as string}
            selected={selected}
            onClick={() => onSelect(coin, tokenLabel as string, index)}
            sx={{
                color: selected ? '#000' : '#000',

                background:
                    selected
                        ? 'linear-gradient(85deg, #fff, #fff, #fff)'
                        : '#fff',

                border:
                    selected
                        ? '1px solid #557804'
                        : '1px solid #55780459',
                fontWeight: 'bold',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                width: '100%',
                '&:hover': {
                    background:
                        selected
                            ? 'linear-gradient(85deg, #fff, #fff, #fff)'
                            : '#fff',
                },
            }}
        >
            <Image src={tokenImage} alt={tokenLabel || ''} width={20} height={20} />
            {tokenLabel}
        </ToggleButton>
    );
};
