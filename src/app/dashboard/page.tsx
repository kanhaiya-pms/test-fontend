import Dashboard from '@/components/Dashboard'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const signUpPage = () => {
  const cookie = cookies()

   const token = cookie.get("ACCESS_TOKEN")
   console.log("token",token?.value);
   

   if (!token?.value) {
    redirect("/login")
   }
  return (
   <Dashboard userId={token?.value}/>
  )
}

export default signUpPage