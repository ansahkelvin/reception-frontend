"use client"

import {ArrowUpRight, TrendingUp} from "lucide-react"

import {getToken} from "@/utils/auth";
import {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "../../../components/ui/chart";
import {Bar, CartesianGrid,BarChart, XAxis} from "recharts";
import {CardDescription, CardFooter, CardTitle} from "../../../components/ui/card";
import {Button} from "../../../components/ui/button";
import Link from "next/link";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../../components/ui/table";


export default function Dashboard() {
    const token = getToken();
    const [user, setUser] = useState(null)

    const chartData = [
        { day: "Monday", official: 186, nonofficial: 80 },
        { day: "Tuesday", official: 305, nonofficial: 200 },
        { day: "Wednesday", official: 237, nonofficial: 120 },
        { day: "Thursday", official: 73, nonofficial: 190 },
        { day: "Friday", official: 209, nonofficial: 130 },
        { day: "Saturday", official: 10, nonofficial: 20 },
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
                <h1 className="text-2xl font-bold text-blue-950 mt-10 pb-2">Human Resource</h1>
                <p className="text-gray-500 text-sm ">Manage employees here</p>
            </div>

            <div className="flex flex-row justify-between gap-5 mb-14  mt-10">
                <Card className='w-1/2'>
                    <CardHeader>
                        <h1 className='font-bold text-lg'> Total Employees
                        </h1>
                        <p className="text-gray-500 text-sm">These are the total number of employee </p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-blue-950 font-bold text-2xl">10</p>
                    </CardContent>

                </Card>

                <Card className='w-1/2'>
                    <CardHeader>
                        <h1 className='font-bold text-lg'> Total Departments
                        </h1>
                        <p className="text-gray-500 text-sm">These are the total number of departments</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-blue-950 font-bold text-2xl">08</p>
                    </CardContent>

                </Card>

                <Card className='w-1/2'>
                    <CardHeader>
                        <h1 className='font-bold text-lg'> Total Guests
                        </h1>
                        <p className="text-gray-500 text-sm">These are the total number of visitors awaiting
                            confirmation</p>

                    </CardHeader>
                    <CardContent>
                        <p className="text-blue-950 font-bold text-2xl">10</p>
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
                            <Link href="#">
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
                                <TableRow>
                                    <TableCell>
                                        <div className="font-medium">Liam Johnson</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            liam@example.com
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-right">2023-06-26</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div className="font-medium">Olivia Smith</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            olivia@example.com
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-right">2023-06-26</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div className="font-medium">Noah Williams</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            noah@example.com
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-right">2023-06-26</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div className="font-medium">Emma Brown</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            emma@example.com
                                        </div>
                                    </TableCell>
                                    {/**/}
                                    <TableCell className="text-right"> 2023-06-26</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <div className="font-medium">Liam Johnson</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            liam@example.com
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">2023-06-26</TableCell>
                                </TableRow>
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


