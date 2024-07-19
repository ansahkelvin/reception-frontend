"use client"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {getToken} from "@/utils/auth";
import {Dialog, DialogPanel} from "@tremor/react";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import {useRouter} from "next/navigation";

export default function ViewDetails({params}) {
    const visitId = params.visitId;

    const router = useRouter();

    const [visitDetails, setVisitDetails] = useState(null)
    const [response, setResponse] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const token = getToken();


    useEffect(() => {
        const fetchVisitDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/visits/${visitId}`);
                if (response.status === 200) {
                    setVisitDetails(response.data.data);
                    console.log(response.data)
                }
            } catch (e) {
                console.log(e)
            }

        }
        fetchVisitDetails()
    }, [])

    const onValidResponse = async () => {
        try{
            setIsOpen(true)
            setIsLoading(true)
            const res = await axios.put(`http://localhost:4000/api/v1/visits/${visitId}`, {
                email: visitDetails.email,
                full_name: visitDetails.full_name,
                company_name: visitDetails.company_name,
                phone_number: visitDetails.phone_number,
                visit_purpose: visitDetails.visit_purpose,
                image: visitDetails.image,
                employee: visitDetails.employee._id,
                visit_response: "Approved",
                visit_reason: response,
            },{
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })

            if(res.status === 200){
                console.log(res.data)
                router.push('/success')
            }
        }catch (e) {
            console.log(e)
        }finally {
            setIsOpen(false)
            setIsLoading(false)


        }

    }

    const onDeclineResponse = async () => {
        try{
            setIsOpen(true)
            setIsLoading(true)
            const res = await axios.put(`http://localhost:4000/api/v1/visits/${visitId}`, {
                email: visitDetails.email,
                full_name: visitDetails.full_name,
                company_name: visitDetails.company_name,
                phone_number: visitDetails.phone_number,
                visit_purpose: visitDetails.visit_purpose,
                image: visitDetails.image,
                employee: visitDetails.employee._id,
                visit_response: "Declined",
                visit_reason: response,
            },{
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })

            if(res.status === 200){
                console.log(res.data)
                router.push('/success')
            }
        }catch (e) {
            console.log(e)
        } finally {
            setIsOpen(false)
            setIsLoading(false)

        }

    }
    return (
       <div>
           {visitDetails ?
               <div className={'flex flex-col h-screen w-full justify-center items-center'}>

               <Card className={'p-10'}>
                   <div className={'py-5'}>
                       <h1 className="font-semibold text-2xl">Name: {visitDetails.full_name}</h1>
                       <h1 className="font-semibold my-2 text-gray-500 text-sm">Purpose: {visitDetails.visit_purpose}</h1>
                       <h1>Company Name: {visitDetails.company_name}</h1>

                       <div className="flex flex-row justify-between">
                           <h1 className='mt-3 font-semibold my-2 text-black text-sm '>Time: {new Date(visitDetails.createdAt).toLocaleTimeString()}</h1>
                           <h1 className='mt-3 font-semibold my-2 text-black text-sm'>Date: {new Date(visitDetails.createdAt).toLocaleDateString()}</h1>
                       </div>


                   </div>
                   <div className="flex flex-col  space-y-2">
                   <Label className='py-2' htmlFor="name">Extra comment</Label>
                       <Input
                           id="company"
                           placeholder="Enter your response here"
                           type="text"
                           value={response}
                           onChange={(text) => setResponse(text.target.value)}
                       />
                   </div>

                   <div className='flex justify-between gap-x-3.5 w-full'>
                       {
                           isLoading ?
                               <>
                                   <Dialog
                                       open={isOpen}
                                       onClose={() => setIsOpen(false)}
                                       static={true}
                                       className="z-[100]"
                                   >
                                       <DialogPanel className="max-w-sm">
                                           <p className="text-sm w-full flex justify-center font-semibold">Loading</p>
                                           <DotLottieReact
                                               src="/Animation - 1721257627381.json"
                                               loop
                                               autoplay
                                           />
                                       </DialogPanel>
                                   </Dialog>
                               </>
                               : <>
                                   <Button className="mt-8 w-1/2 mr-2 bg-red-700" onClick={() => onDeclineResponse()}>
                                       Cancel Appointment
                                   </Button>
                                   <Button className="mt-8 w-1/2 bg-emerald-700" onClick={() => onValidResponse()} >
                                       Approve Appointment
                                   </Button>
                               </>
                       }

                   </div>


               </Card>

           </div> : <div>Loading</div>}
       </div>

    )
}