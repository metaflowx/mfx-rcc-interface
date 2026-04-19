
'use client'
import dynamic from "next/dynamic"

const Stakingcmp = dynamic(
  () => import("@/ui/staking/stakingcmp"),
  {
    ssr: false,
  }
)
 

const Staking = () => {
    return (
        <>
             <Stakingcmp/>
        </>
    )
}

export default Staking