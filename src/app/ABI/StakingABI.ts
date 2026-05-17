export const StakingABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "AlreadyInitialize",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ClaimCooldownPeriodNotOver",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InsufficientAmount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InsufficientRewardAllocation",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidAddress",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "startIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "endIndex",
                "type": "uint256"
            }
        ],
        "name": "InvalidRange",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidTierId",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "MaxReturnAchieve",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "MinStakeAmount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NoTokensStake",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "PlanDurationNotEnd",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RestakeNotEnabled",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "SafeERC20FailedOperation",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TokensUnstaked",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "Unauthorized",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "UnstakeNotEnabled",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "FeeAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "newTreasury",
                "type": "address"
            }
        ],
        "name": "FeeTreasuryUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewards",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newVolume",
                "type": "uint256"
            }
        ],
        "name": "Restaked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "reward",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "fee",
                "type": "uint256"
            }
        ],
        "name": "RewardsClaimed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "staker",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Staked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tierId",
                "type": "uint256"
            }
        ],
        "name": "TierAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tierId",
                "type": "uint256"
            }
        ],
        "name": "TierUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewards",
                "type": "uint256"
            }
        ],
        "name": "Unstaked",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tierId_",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isEnabled_",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isUnstakedEnabled_",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isRestakeEnabled_",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "minStaked_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lockDuration_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "withdrawnPeriod_",
                "type": "uint256"
            }
        ],
        "name": "UpdateTier",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount_",
                "type": "uint256"
            }
        ],
        "name": "addStakingRewardAllocation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user_",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index_",
                "type": "uint256"
            }
        ],
        "name": "calculateRewards",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user_",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index_",
                "type": "uint256"
            }
        ],
        "name": "checkMaxReturn",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index_",
                "type": "uint256"
            }
        ],
        "name": "claimReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "claimedFee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "isEnabled_",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isUnstakedEnabled_",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isRestakeEnabled_",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "minStaked_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lockDuration_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "withdrawnPeriod_",
                "type": "uint256"
            }
        ],
        "name": "createStakingTier",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "feeTreasury",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "startIndex_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "endIndex_",
                "type": "uint256"
            }
        ],
        "name": "getStakers",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "result",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tierId_",
                "type": "uint256"
            }
        ],
        "name": "getTier",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "minStaked",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lockPeriod",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "withdrawnPeriod",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isEnabled",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isUnstakedEnabled",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isRestakeEnabled",
                        "type": "bool"
                    }
                ],
                "internalType": "struct IRCCStaking.Tier",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "startIndex_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "endIndex_",
                "type": "uint256"
            }
        ],
        "name": "getTierList",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "minStaked",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lockPeriod",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "withdrawnPeriod",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isEnabled",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isUnstakedEnabled",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isRestakeEnabled",
                        "type": "bool"
                    }
                ],
                "internalType": "struct IRCCStaking.Tier[]",
                "name": "result",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "rccToken_",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "rccIcoContract_",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "rccReferralContract_",
                "type": "address"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isInitialized",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rccIcoContract",
        "outputs": [
            {
                "internalType": "contract IRCCICO",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rccReferralContract",
        "outputs": [
            {
                "internalType": "contract IRCCReferral",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rccToken",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index_",
                "type": "uint256"
            }
        ],
        "name": "restake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tierId_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount_",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "referrer_",
                "type": "address"
            }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tier_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount_",
                "type": "uint256"
            }
        ],
        "name": "stakingYieldRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "mr",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "tr",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalFeeTreasury",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalRewards",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalStaked",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user_",
                "type": "address"
            }
        ],
        "name": "totalStakedLengthForUser",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalStakersLength",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalStakingRewardAllocation",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalTierLenth",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to_",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount_",
                "type": "uint256"
            }
        ],
        "name": "transferRccToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index_",
                "type": "uint256"
            }
        ],
        "name": "unstake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "fee_",
                "type": "uint256"
            }
        ],
        "name": "updateClaimedFee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "feeTreasury_",
                "type": "address"
            }
        ],
        "name": "updateFeeTreasure",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "rccIcoContract_",
                "type": "address"
            }
        ],
        "name": "updateRccIcoContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "rccReferralContract_",
                "type": "address"
            }
        ],
        "name": "updateRccReferralContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user_",
                "type": "address"
            }
        ],
        "name": "user2Staker",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "tierId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "volume",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "claimedRewards",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lastClaimTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isUnstaked",
                        "type": "bool"
                    }
                ],
                "internalType": "struct IRCCStaking.Staker",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user_",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "startIndex_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "endIndex_",
                "type": "uint256"
            }
        ],
        "name": "user2StakerList",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "tierId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "volume",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "claimedRewards",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "lastClaimTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isUnstaked",
                        "type": "bool"
                    }
                ],
                "internalType": "struct IRCCStaking.Staker[]",
                "name": "result",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const