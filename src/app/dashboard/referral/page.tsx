'use client'
import dynamic from "next/dynamic"

const Referralcmp = dynamic(
  () => import("@/ui/referral/referralcmp"),
  {
    ssr: false,
  }
)
 

const Referral = () => {
    return (
        <>
             <Referralcmp/>
        </>
    )
}

export default Referral