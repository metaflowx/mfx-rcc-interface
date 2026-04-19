"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  IconButton,
  Box,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useWriteContract } from "wagmi";
 
import { toast } from "react-toastify";
import { extractDetailsFromError } from "@/lib/extractDetailsFromError";
import { contractConfig, stakeConfig } from "@/app/constants/contract";
 

interface ClaimModalProps {
  open: boolean;
  onClose: () => void;
  isClaimChecking: Record<string, boolean>;
  index?: number,
  level?: number;
}

const ClaimModalConfirmation: React.FC<ClaimModalProps> = ({
  open,
  onClose,
  isClaimChecking,
  index,
  level,
}) => {
  const {
    writeContractAsync: writeContractAsyncClaim,
    isPending: isPendingClaim,
    isSuccess,
  } = useWriteContract();

  const [selectedCurrency, setSelectedCurrency] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCurrency(event.target.value);
  };

  const handleClaim = async () => {
    try {
      if (!selectedCurrency) {
        toast.error("Please select a currency.");
        return;
      }

      let res;
      if (isClaimChecking.reward) {
        res = await writeContractAsyncClaim({
          ...stakeConfig,
          functionName: "claimReward",
          args: [BigInt(index??0),selectedCurrency !== "RCC"],
        });
      } else if (isClaimChecking.referral) {
        res = await writeContractAsyncClaim({
          ...contractConfig,
          functionName: "claimReferralReward",
          args: [selectedCurrency !== "RCC", BigInt(level ?? 1)],
        });
      } else {
        toast.error("Please select a valid claim type.");
        return;
      }

      if (res && isSuccess) {
        toast.success("Claim completed!");
        onClose();
      }
    } catch (error: any) {
      toast.error(extractDetailsFromError(error.message) as string);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          border:'1px solid #557804',
          background: "#fff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          color: "#000",
        },
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" px={3} pt={3}>
        <Typography  variant="h6" fontWeight={600}>
          Confirm Claim
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#557804" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <DialogContent dividers sx={{ px: 3, py: 2 }}>
        <Typography sx={{ mb: 2, color: "#000" }}>
          Please select the currency in which you want to claim your reward.
        </Typography>
        <FormControl fullWidth>
          <InputLabel sx={{ color: "#aaa" }}>Currency</InputLabel>
          <Select
            value={selectedCurrency}
            onChange={handleChange}
            disabled={isPendingClaim}
            sx={{
              borderRadius: 3,
              backgroundColor: "#fff",
              color: "#000",
              "& .MuiSelect-icon": { color: "#000" },
              "& fieldset": { borderColor: "#557804" },
            }}
          >
            <MenuItem value="RCC">RCC</MenuItem>
            <MenuItem value="USDT">USDT</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ px: 3, pb: 3, justifyContent: "space-between" }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: "#000",
            borderColor: "#557804",
            borderRadius: 12,
            px: 3,
            "&:hover": {
              borderColor: "#fff",
              backgroundColor: "#557804",
              color:'#fff',
            },
          }}
          disabled={isPendingClaim}
        >
          Cancel
        </Button>

        <Button
          onClick={handleClaim}
          variant="contained"
          disabled={!selectedCurrency || isPendingClaim}
          sx={{
            background: "linear-gradient(85deg, #557804, #557804, #557804)",
            borderRadius: 12,
            px: 4,
            color: "#fff",
            fontWeight: 500,
            "&:hover": {
              background: "linear-gradient(85deg, #557804, #557804, #557804)",
            },
          }}
          startIcon={isPendingClaim ? <CircularProgress color="inherit" size={18} /> : null}
        >
          {isPendingClaim ? "Processing..." : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClaimModalConfirmation;
