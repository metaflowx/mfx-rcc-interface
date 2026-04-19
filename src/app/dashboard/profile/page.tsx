 

'use client'
import dynamic from "next/dynamic"

const Profilecmp = dynamic(
  () => import("@/ui/profile/profilecmp"),
  {
    ssr: false,
  }
)
 

const Profile = () => {
    return (
        <>
             <Profilecmp/>
        </>
    )
}

export default Profile