
import { Box } from "@mui/material";
import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import Link from "next/link";
import React from "react";

interface ConnectButtonProps {
  label?: string;
}

const ConnectWallet: React.FC<ConnectButtonProps> = ({ label = "Connect Wallet" }) => {

  const { address, isConnected, } = useAppKitAccount()
  const { disconnect } = useDisconnect()
  const { open, close } = useAppKit()

  return (
    <div>
      {!address ?
        <>
          <Link style={{
            background: "linear-gradient(85deg, #557804, #557804, #557804)",
            color: "#fff",
            padding: '12px 20px',
            borderRadius: "5rem",
            textDecoration: 'none'
          }} onClick={async () => open()} href={""}>{label}</Link>

        </>
        :
        <Box
          sx={{
border:'1px solid #557804',
borderRadius:'5rem'
          }}
        >
          <appkit-account-button balance="hide" />
        </Box>


      }



    </div>
  );
};

export default ConnectWallet;
