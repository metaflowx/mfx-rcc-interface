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
import { Address, erc20Abi, formatEther, parseEther } from "viem";
import { iocConfig,StakeContractAddress, TokenContractAddress } from "@/app/constants/contract";
import useCheckAllowance from "@/hooks/useCheckAllowance";
import { useAccount, useBlockNumber, useReadContract, useWriteContract } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { StakingABI } from "@/app/ABI/StakingABI";
import { useAppKitNetwork } from "@reown/appkit/react";

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

  const { address } = useAccount();
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: {
      enabled: true,
      pollingInterval: 5_000,
    } });
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
        args: [1],
        chainId: Number(chainId) ?? 56,
    });

    const tokenPrice = tokenPriceUSDT && tokenPriceUSDT;
    const tokenPriceBig = Number(formatEther(BigInt(tokenPrice ?? 0)));
    const userAmount = Number(amount) * tokenPriceBig;

    

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
    if(!blockNumber) return;
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
          args: [BigInt(selectedId), formattedAmount],
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
          backgroundColor: "#131c48",
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
          <Typography variant="h5" color="#fff" px={3} py={2}>
            Confirmation
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "#fff", mr: 1 }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 0 }}>
        {selectedData && (
          <>
            <Typography variant="h6" color="#fff" gutterBottom>
              {selectedData.title1}
            </Typography>
            <Typography variant="body2" color="#fff">
              APR:{" "}
              <Typography component="span" color="#FDB355">
                {(Number(selectedData.returnInPercent) / 1e2)/2}%
              </Typography>
            </Typography>
            <Typography variant="body2" color="#fff">
              Daily Staking Benefit:{" "}
              <Typography component="span" color="#FDB355">
                {parseFloat(selectedData.dailyRewardRateInPercent) / 1e4}%
              </Typography>
            </Typography>
            { 
              userAmount>0 &&
              <Typography variant="body2" color="#fff">
              {amount} RCC = {" "}
              <Typography component="span" color="#FDB355">
                ${userAmount.toFixed(4)}
              </Typography>
            </Typography>
            }
          </>
        )}

        <Box mt={3}>
          <Typography variant="body2" color="#fff" gutterBottom>
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
              input: { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#FDB355" },
                "&:hover fieldset": { borderColor: "#FEE0A6" },
                "&.Mui-focused fieldset": { borderColor: "#FDB355" },
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
                ? "linear-gradient(85deg, #FDB355, #FEE0A6, #7737DB)"
                : "linear-gradient(85deg, #fdb4557a, #fee1a679, #7637db7a)",
            color:
              amount === ""
                ? "#00000075 !important"
                : "#000000 !important",
            fontWeight: "bold",
            borderRadius: "12px",
            textTransform: "none",
            "&:hover": {
              background:
                amount === ""
                  ? "linear-gradient(85deg, #fdb4557a, #fee1a679, #7637db7a)"
                  : "linear-gradient(85deg, #FDB355, #FEE0A6, #7737DB)",
              color: amount === "" ? "#00000075" : "#000000",
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
