import { IcoABI } from "../ABI/IcoABI";
import { RefferABI } from "../ABI/RewardToken";
import { StakingABI } from "../ABI/StakingABI";
import { TokenABI } from "../ABI/TokenSupply";


export const TokenContractAddress = "0x1d32FD85A7592eFFCc1ceE43fBbE33088B89B5D8";
export const ICOContractAddress = "0xF5A24757ed0795049Facd40b078Fa3b8306fc5E5"
export const ReferralContractAddress = "0x38c4d73bfb927e67EaD3D113Ff64B41d036BcB1f";
export const USDTAddress = "0x55d398326f99059fF775485246999027B3197955"
export const StakeContractAddress = "0xCAd6D3269e4809637309d9bB9D5c8aAfB4A0cff1";


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
