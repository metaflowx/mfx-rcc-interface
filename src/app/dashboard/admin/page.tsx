'use client'
import dynamic from "next/dynamic"

const Admincmp = dynamic(
  () => import("@/ui/admin/admincmp"),
  {
    ssr: false,
  }
)


const Admin = () => {
  return (
    <>
      <Admincmp />
    </>
  )
}

export default Admin