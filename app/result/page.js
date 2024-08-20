"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import getStripe from "@/utils/get-stripe"
import { useSearchParams } from "next/navigation"
import { CircularProgress, Typography, container } from "@mui/material"

const resultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get("session_id")

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(true)
    const [error, setError] = useState(true)

    useEffect(()=> {
        const fetchCheckoutSession = async () =>{
            if(!sessionId) 
                return
            try{
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const sessionData = await res.json()
                if(res.ok) {
                    setSession(sessionData)
                }
                else {
                    setError(sessionData.error)
                }
            }
            catch (err){
                setError("An error occured")
            } finally {
                setLoading(false)
            }
        }
        fetchCheckoutSesion()
    }, [session_id])
    if (loading) {
        return(
            <Container maxWidth="100vw" sx={{textAlign: "center", mt:4 }}>
                <CircularProgress/>
                <Typography variant="h6">
                    Loading..
                </Typography>
            </Container>
        )
    }
    if(error) {
        return (
            <Container maxWidth="100vw" sx={{textAlign: "center", mt:4 }}> 
                <Typography variant="h6">
                    {error}
                </Typography>
            </Container>
        )
    }

    return (
        <container maxWidth="100vw" sx={{textAlign: "center", mt:4 }}> 

            {
                session.payment_status === "paid" ? (
                    <>
                    <Typography varinat="h4"> 
                        Thank you for purchasing
                    </Typography>
                    <Box sx={{mt:22}}>
                        <Typography variant="h6">
                            Session Id: {session_id}
                        </Typography>
                        <Typography variant="body1">
                            We have recieved your payment. You will get an email with the order details shortly
                        </Typography>
                    </Box>
                    </>
                ) :(
                    <> <Typography varinat="h4"> 
                    Payment failed
                </Typography>
                <Box sx={{mt:22}}>
                    <Typography variant="h6">
                        Session Id: {session_id}
                    </Typography>
                    <Typography variant="body1">
                        Your payment couldn't be processed. 
                    </Typography>
                </Box></>
                    
                )
            }
        </container>
    )
}
export default resultPage
