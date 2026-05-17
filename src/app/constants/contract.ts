import { IcoABI } from "../ABI/IcoABI";
import { RefferABI } from "../ABI/RewardToken";
import { StakingABI } from "../ABI/StakingABI";
import { TokenABI } from "../ABI/TokenSupply";


export const TokenContractAddress = "0xDA4F5fBe9664786f9b33DE4BE0a201873a5575C6";
export const ICOContractAddress = "0x86CcC377EbdD39D945be2a58839DDEA807c2A816"
export const ReferralContractAddress = "0x080Fc12d7DB40432abFC69166fdB856EEEc966bB";
export const USDTAddress = "0x55d398326f99059fF775485246999027B3197955"
export const StakeContractAddress = "0x5e09fD9A0a8328bA02113923f557898D18384376";


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
