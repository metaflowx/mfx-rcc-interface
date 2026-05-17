import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { extractDetailsFromError } from "@/lib/extractDetailsFromError";
import { toast } from "react-toastify";
import { Address, erc20Abi, formatEther, parseEther, zeroAddress } from "viem";
import { contractConfig, iocConfig, stakeConfig, StakeContractAddress, TokenContractAddress } from "@/app/constants/contract";
import useCheckAllowance from "@/hooks/useCheckAllowance";
import { useAccount, useBlockNumber, useReadContract, useWriteContract } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { StakingABI } from "@/app/ABI/StakingABI";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useSearchParams } from "next/navigation";
import { communityAddress } from "../dashboard/progressCard";
import { convertToAbbreviated } from "@/lib/convertToAbbreviated";

interface AmountDialogProps {
  open: boolean;
  onClose: () => void;
  selectedId: any;
  selectedData: {
    title1: string;
    returnInPercent: any;
    dailyRewardRateInPercent: any;
    minStaked: string;
  };
}

const AmountDialog: React.FC<AmountDialogProps> = ({
  open,
  onClose,
  selectedId,
  selectedData,
}) => {
  const [amount, setAmount] = useState<string>("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { chainId } = useAppKitNetwork();
  const searchparm = useSearchParams();

  const { address } = useAccount();
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({
    watch: {
      enabled: true,
      pollingInterval: 5_000,
    }
  });
  const [referrer, setReferrer] = useState(searchparm.get("ref") || "");

  const [isAproveERC20, setIsApprovedERC20] = useState(true);
  const { writeContractAsync, isPending, isSuccess, isError } = useWriteContract();

  const { data: resultOfTokenBalance } = useReadContract({
    abi: erc20Abi,
    address: TokenContractAddress,
    functionName: "balanceOf",
    args: [address as Address],
    account: address,
    chainId: Number(chainId) ?? 56,
  });

  const { data: tokenPriceUSDT } = useReadContract({
    ...iocConfig,
    functionName: "getSaleTokenPrice",
    chainId: Number(chainId) ?? 56,
  });

  const { data: resultOfReferrer } = useReadContract({
    ...contractConfig,
    functionName: "getReferrer",
    args: [address as Address],
    chainId: Number(chainId) ?? 56,
  });

  const tokenPrice = tokenPriceUSDT && tokenPriceUSDT;
  const tokenPriceBig = Number(formatEther(BigInt(tokenPrice ?? 0)));
  const userAmount = Number(amount) * tokenPriceBig;


  const { data: resultOfYieldRate } = useReadContract({
    ...stakeConfig,
    functionName: "stakingYieldRate",
    args: [BigInt(selectedId), parseEther(`${userAmount}`)],
    chainId: Number(chainId) ?? 56,
  });



  const approveToken = async () => {
    try {
      const formattedAmount =
        Number?.(amount) > 0
          ? parseEther?.(amount.toString())
          : parseEther?.(
            BigInt((Number.MAX_SAFE_INTEGER ** 1.3)?.toString())?.toString()
          );
      const res = await writeContractAsync({
        abi: erc20Abi,
        address: TokenContractAddress,
        functionName: "approve",
        args: [StakeContractAddress, formattedAmount],
        account: address,
      });
      if (res) {
        setIsApprovedERC20(true);
        setAmount("")
        toast.success("Token approved successfully");
      }
    } catch (error: any) {
      toast.error(extractDetailsFromError(error.message as string) as string);
    }
  };

  const resultOfCheckAllowance = useCheckAllowance({
    spenderAddress: StakeContractAddress,
    token: TokenContractAddress,
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
  }, [blockNumber, queryClient, !resultOfCheckAllowance.queryKey]);


  const handleSubmit = async () => {
    if (amount !== "") {
      try {
        const formattedAmount = parseEther(amount);

        const res = await writeContractAsync({
          address: StakeContractAddress,
          abi: StakingABI,
          functionName: "stake",
          args: [
            BigInt(selectedId),
            formattedAmount,
            resultOfReferrer !== zeroAddress
              ? (resultOfReferrer as Address)
              : ((referrer || communityAddress) as Address)
          ],
        });

        if (res) {
          onClose();
          toast.success("Stake completed");
        }
      } catch (error: any) {
        console.log(">>>>>>>>>>>>.error", error);

        toast.error(extractDetailsFromError(error.message as string) as string);
      }

    }

  };
  const minStaked = parseFloat(formatEther(BigInt(selectedData?.minStaked)));


  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#fff",
          border: "1px solid #FDB355",
          borderRadius: "12px",
          padding: isMobile ? "1rem" : "2rem",
          width: "100%",
          m: isMobile ? "1rem" : "auto",
        },
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" color="#000" px={3} py={2}>
            Confirmation
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "#000", mr: 1 }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 0 }}>
        {selectedData && (
          <>
            <Typography variant="h6" color="#000" gutterBottom>
              {selectedData.title1}
            </Typography>
            <Typography variant="body2" color="#000">
              Monthly Staking Benefit:{" "}
              <Typography component="span" color="#557804">
                {Number(resultOfYieldRate?.[0] ?? 0) / 1e2}%
              </Typography>
            </Typography>
            <Typography variant="body2" color="#000">
              Daily Staking Benefit:{" "}
              <Typography component="span" color="#557804">
                {((Number(resultOfYieldRate?.[0] ?? 0) / 1e2) / 30).toFixed(4)}%
              </Typography>
            </Typography>
            <Typography variant="body2" color="#000">
              Total Return:{" "}
              <Typography component="span" color="#557804">
                ${convertToAbbreviated((Number(resultOfYieldRate?.[1] ?? 0) / 1e4) * userAmount)}
              </Typography>
            </Typography>
            {
              userAmount > 0 &&
              <Typography variant="body2" color="#000">
                {convertToAbbreviated(Number(amount))} RCC = {" "}
                <Typography component="span" color="#557804">
                  ${convertToAbbreviated(userAmount)}
                </Typography>
              </Typography>
            }
          </>
        )}

        <Box mt={3}>
          <Typography variant="body2" color="#000" gutterBottom>
            Enter Amount
          </Typography>
          <TextField
            type="number"
            placeholder="Enter RCC amount"
            fullWidth
            variant="outlined"
            value={amount}
            inputProps={{
              min: 0, /// 👈 prevents negative numbers
            }}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => {
              if (["-", "e", "E", "+"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            InputProps={{
              style: { backgroundColor: 'transparent', color: 'white' },
            }}
            sx={{
              input: { color: "#000" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#557804" },
                "&:hover fieldset": { borderColor: "#557804" },
                "&.Mui-focused fieldset": { borderColor: "#557804" },
                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 3 }}>
        <Button
          fullWidth
          variant="contained"
          disabled={
            amount === "" ||
            userAmount < minStaked ||
            isPending ||
            Number(
              formatEther(BigInt(resultOfTokenBalance ?? 0))
            ) < Number(amount)
          }
          onClick={() => {
            !isAproveERC20 ? approveToken() : handleSubmit();
          }}
          sx={{
            background:
              (userAmount >= minStaked && Number(
                formatEther(BigInt(resultOfTokenBalance ?? 0))
              ) >= userAmount
              )
                ? "linear-gradient(85deg, #557804, #557804, #557804)"
                : "linear-gradient(85deg, #557804, #55780479, #5578047a)",
            color: "#fff !important",
            fontWeight: "bold",
            borderRadius: "12px",
            textTransform: "none",
            "&:hover": {
              background:
                amount === ""
                  ? "linear-gradient(85deg, #557804, #55780479, #5578047a)"
                  : "linear-gradient(85deg, #557804, #55780479, #5578047a)",
              color: amount === "" ? "#fff" : "#fff",
            },
          }}
        >
          {isPending
            ? isAproveERC20
              ? "Staking..."
              : "Approving..."
            : amount === ""
              ? "Please enter amount"
              : userAmount < minStaked
                ? `Min. stake is $${minStaked} worth of RCC`
                : Number(formatEther(BigInt(resultOfTokenBalance ?? 0))) < Number(amount)
                  ? "Insufficient funds"
                  : isAproveERC20
                    ? "Submit"
                    : "Approve"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AmountDialog;
