import { IcoABI } from "../ABI/IcoABI";
import { RefferABI } from "../ABI/RewardToken";
import { StakingABI } from "../ABI/StakingABI";
import { TokenABI } from "../ABI/TokenSupply";

 
export const TokenContractAddress = "0x2140da78b3f04df1445850fed78bc5b71ad2c97f";
export const ICOContractAddress = "0xd1bE3fd57Df66eb6d599cD83462D916A1b02e3bE"
export const ReferralContractAddress = "0xbB916ad6148A0b1F7Bd244a3594ad39EAA2f783A";
export const USDTAddress = "0x55d398326f99059fF775485246999027B3197955"
export const StakeContractAddress = "0x2de8A6c5841617b81B5b0f61befAAE5541971B74";


export const contractConfig = {
  address: ReferralContractAddress as `0x${string}`,
  abi: RefferABI,
};

export const iocConfig = {
  address: ICOContractAddress as `0x${string}`,
  abi: IcoABI,

};

export const tokenConfig = {
  address: TokenContractAddress as `0x${string}`,
  abi: TokenABI,

};

export const stakeConfig = {
  address: StakeContractAddress as `0x${string}`,
  abi: StakingABI,

};
