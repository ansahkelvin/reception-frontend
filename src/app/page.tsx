'use client'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import axios from "axios";
import * as React from "react";
import {useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {DotLottieReact} from '@lottiefiles/dotlottie-react';
import {Dialog, DialogPanel, SearchSelect, SearchSelectItem} from "@tremor/react";
import Image from "next/image";


export default function Home() {
    const {toast} = useToast()
    const [loading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = React.useState(false);
    const [employee, setEmployee] = useState([])

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/employee')
                if (response.status === 200) {
                    setEmployee(response.data.data)
                }
            } catch (e) {

            }

        }
        fetchEmployee()
    }, [])


    const onSubmit = async () => {
        setIsLoading(true)
        setIsOpen(true)

        try {
            const response = await axios.post('http://localhost:4000/api/v1/visits', {
                email: form.email,
                full_name: form.full_name,
                company_name: form.company_name,
                phone_number: form.phone_number,
                visit_purpose: form.visit_purpose,
                image: form.image,
                employee: form.employee
            },)
            console.log(response.data)

            if (response.status === 200) {
                toast({
                    title: "Great news",
                    description: "Request has been submitted",
                })
            }

        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
            setIsOpen(false)
            alert("Request sent successfully")

            setFormDetails({
                full_name: '',
                image: 'https://helloworld.com',
                company_name: '',
                phone_number: '',
                email: '',
                visit_purpose: '',
                employee: '',
                receptionist: ''
            })
        }

    }

    const [form, setFormDetails] = useState({
        full_name: '',
        image: 'https://helloworld.com',
        company_name: '',
        phone_number: '',
        email: '',
        visit_purpose: '',
        employee: '',
    })

    return (
        <main className="flex flex-row w-full justify-center md:p-10 p-2">

            <div className='hidden md:flex md:h-screen'>
                <Image className='h-screen object-cover w-[600px] '
                       src={'https://images.unsplash.com/photo-1470290378698-263fa7ca60ab?q=80&w=2621&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                       width={400} height={500} alt={''}/>
            </div>

            <Card className="md:w-[650px]">
                <CardHeader>
                    <CardTitle className={"pb-2"}>Welcome to Ghana Link</CardTitle>
                    <CardDescription>Kindly fill the form below.</CardDescription>
                </CardHeader>
                <CardContent className={'mt-5'}>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-2">
                                <Label className='py-2' htmlFor="name">Full Name</Label>
                                <Input
                                    type="text"
                                    value={form.full_name}
                                    id="name"
                                    placeholder="Enter your name"
                                    onChange={(value) => setFormDetails({...form, full_name: value.target.value})}
                                />
                            </div>

                            <div className="flex flex-col space-y-2">
                                <Label className='py-2' htmlFor="email">Email</Label>
                                <Input
                                    value={form.email}
                                    onChange={(text) => setFormDetails({...form, email: text.target.value})}
                                    id="email"
                                    placeholder="Enter your email"
                                    type="email"
                                />
                            </div>

                            <div className='flex flex-row gap-x-3 py-2'>
                                <div className="flex flex-col w-1/2 space-y-2">
                                    <Label className='py-2' htmlFor="name">Company Name</Label>
                                    <Input
                                        id="company"
                                        placeholder="Enter your company name"
                                        type="text"
                                        value={form.company_name}
                                        onChange={(text) => setFormDetails({...form, company_name: text.target.value})}

                                    />
                                </div>
                                <div className="flex flex-col w-1/2  space-y-2">
                                    <Label className='py-2' htmlFor="name">Contact</Label>
                                    <Input
                                        id="contact"
                                        value={form.phone_number}
                                        placeholder="Enter your phone number"
                                        type="number"
                                        onChange={(text) => setFormDetails({...form, phone_number: text.target.value})}

                                    />
                                </div>
                            </div>


                            <div className="flex flex-col space-y-2">
                                <Label className='py-2' htmlFor="name">Host Name</Label>
                                <SearchSelect
                                    value={form.employee}
                                    onChange={(value) => {
                                        console.log(value);
                                        setFormDetails({...form, employee: value as string})
                                    }}>
                                    {employee ?
                                        employee.map((data) => <SearchSelectItem key={data._id}
                                                                                 value={`${data._id}`}>{data.full_name}</SearchSelectItem>
                                        ) : <div>Loading</div>
                                    }
                                </SearchSelect>
                            </div>

                            <div className="flex py-2  flex-col space-y-1.5">
                                <Label className='py-2' htmlFor="visit">Purpose of Visiting</Label>
                                <Select value={form.visit_purpose} onValueChange={(value) => {
                                    setFormDetails({...form, visit_purpose: value})
                                    console.log(value)
                                }
                                }>
                                    <SelectTrigger id="visit">
                                        <SelectValue placeholder="Select"/>
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="Official">Official</SelectItem>
                                        <SelectItem value="Unofficial">Unofficial</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </form>
                </CardContent>
                {loading ?
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
                    : <CardFooter className="flex justify-between mt-10">
                        <Button disabled={loading} onClick={onSubmit} className="w-full bg-red-800">
                            Submit
                        </Button>
                    </CardFooter>}

            </Card>

        </main>
    );
}
