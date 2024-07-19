"use client"
import React, {useState} from 'react';
import axios from "axios";
import {useRouter} from "next/navigation";
import {setToken} from "@/utils/auth";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const [form, setFormDetails] = useState({email: '', password: ''})
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:4000/api/v1/auth/sign-in', {
                email: form.email,
                password: form.password
            });

            if (response.status === 200) {
                setToken(response.data.token)
                if (response.data.role.name === "HR ADMIN") {
                    router.push('/human-resource')
                } else {
                    router.push('/reception')
                }
            }
        } catch (e) {
            console.log(e)
        }


    };

    return (

        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                value={form.email}
                                onChange={(value) => setFormDetails({...form, email: value.target.value})}
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder={"******"}
                                required
                                value={form.password}
                                onChange={(value) => setFormDetails({...form, password: value.target.value})}

                            />
                        </div>
                        <Button onClick={handleSubmit} type="submit" className="w-full">
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8v4l-2 2a4 4 0 100 8l2 2v4a8 8 0 01-8-8z"></path>
                                </svg>
                            ) : (
                                'Sign In'
                            )}
                        </Button>

                    </div>

                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src={"https://images.unsplash.com/photo-1604960198403-53793a3916b5?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
