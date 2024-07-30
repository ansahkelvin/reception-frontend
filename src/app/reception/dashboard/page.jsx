"use client"

import {ArrowUpRight, TrendingUp} from "lucide-react"

import {getToken} from "@/utils/auth";
import {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "../../../components/ui/chart";
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts";
import {CardDescription, CardFooter, CardTitle} from "../../../components/ui/card";
import {Button} from "../../../components/ui/button";
import Link from "next/link";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../../components/ui/table";


export default function Dashboard() {
    const token = getToken();
    const [user, setUser] = useState(null)
    const [premise, setPremise] = useState(null)
    const [visitors, setTodayVisitor] = useState(null)
    const [totalPending, setTotalPending] = useState(null)
    const [guest, setGuest] = useState(null)
    const [loading, setLoading] = useState(null)

    const chartData = [
        {day: "Monday", official: 186, nonofficial: 80},
        {day: "Tuesday", official: 305, nonofficial: 200},
        {day: "Wednesday", official: 237, nonofficial: 120},
        {day: "Thursday", official: 73, nonofficial: 190},
        {day: "Friday", official: 209, nonofficial: 130},
        {day: "Saturday", official: 10, nonofficial: 20},
    ]


    const chartConfig = {
        desktop: {
            label: "Official",
            color: "#0f172a",
        },
        mobile: {
            label: "Nonofficial",
            color: "#9ca3af",
        },
    }
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true)
                const [visitsResponse, totalPendingResponse, inPremiseResponse, guestResponse] = await Promise.all([
                    fetchVisits(),
                    fetchTotalPending(),
                    fetchInPremise(),
                    fetchGuests()
                ]);
                setLoading(false)


                setTodayVisitor(visitsResponse.data.todayVisits);
                setTotalPending(totalPendingResponse.data.totalPending);
                setPremise(inPremiseResponse.data.inPremiseVisits.length);
                setGuest(guestResponse.data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false)
            }
        };

        fetchDashboard();
    }, []);

    const fetchGuests = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/visits', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                console.log("GUEST", response.data)
                return response.data;
            }
        } catch (e) {

        }

    }

    const fetchVisits = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/dashboard/visitors', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                return response
            }
        } catch (e) {

        }
    }

    const fetchInPremise = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/dashboard/premise', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                return response;
            }
        } catch (e) {
            console.log(e)
        }
    }

    const fetchTotalPending = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/dashboard/pending', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                return response;
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/user/info', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    const {data} = response.data;
                    setUser({...data})
                    console.log(data, "This is coming from the data")
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchUser();
    }, [])
    return (
        <div className='m-10 flex flex-col gap-10 bg-white'>
            <div>
                <h1 className="text-2xl font-bold text-blue-950 mt-10 pb-2">Welcome Back</h1>
                <p className="text-gray-500 text-sm ">These are the total number of visitors awaiting confirmation</p>
            </div>

            <div className="flex flex-row justify-between gap-5 mb-14  mt-10">
                <Card className='w-1/2'>
                    <CardHeader>
                        <h1 className='font-bold text-lg'> Total Visitors
                        </h1>
                        <p className="text-gray-500 text-sm">These are the total number of visitors received today</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-blue-950 font-bold text-2xl">{visitors}</p>
                    </CardContent>

                </Card>

                <Card className='w-1/2'>
                    <CardHeader>
                        <h1 className='font-bold text-lg'> In Premises
                        </h1>
                        <p className="text-gray-500 text-sm">These are the total number of visitors still in the
                            building</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-blue-950 font-bold text-2xl">{premise}</p>
                    </CardContent>

                </Card>

                <Card className='w-1/2'>
                    <CardHeader>
                        <h1 className='font-bold text-lg'> Total Pending
                        </h1>
                        <p className="text-gray-500 text-sm">These are the total number of visitors awaiting
                            confirmation</p>

                    </CardHeader>
                    <CardContent>
                        <p className="text-blue-950 font-bold text-2xl">{totalPending}</p>
                    </CardContent>

                </Card>

            </div>

            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-5">
                <Card
                    className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                >
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Guest</CardTitle>
                            <CardDescription>
                                Recent guests clock out from the premise.
                            </CardDescription>
                        </div>
                        <Button asChild size="sm" className="ml-auto gap-1">
                            <Link href="/reception">
                                View All
                                <ArrowUpRight className="h-4 w-4"/>
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Guest</TableHead>
                                    <TableHead className="text-right">Clock Out</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {guest !== null ?
                                    guest.map((visitor) => {
                                        return <TableRow key={visitor._id}>
                                            <TableCell>
                                                <div className="font-medium">{visitor.full_name}</div>
                                                <div className=" text-sm text-muted-foreground">
                                                    {visitor.email}
                                                </div>
                                            </TableCell>

                                            <TableCell
                                                className="text-right">{visitor.departure_time === null ? "Pending" : new Date(visitor.departure_time).toLocaleTimeString()}</TableCell>
                                        </TableRow>
                                    }) : <TableRow>

                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Visit Purpose</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false}/>
                                <XAxis
                                    dataKey="day"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dashed"/>}
                                />
                                <Bar dataKey="official" fill="var(--color-desktop)" radius={4}/>
                                <Bar dataKey="nonofficial" fill="var(--color-mobile)" radius={4}/>
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4"/>
                        </div>
                        <div className="leading-none text-muted-foreground">
                            Showing total visitors for the last 6 months
                        </div>
                    </CardFooter>
                </Card>

            </div>

        </div>
    )
}


