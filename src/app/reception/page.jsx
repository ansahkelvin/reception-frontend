"use client"
import {RiFlag2Line, RiTimeFill} from '@remixicon/react';
import {
    Badge, BadgeDelta,
    Card,
    Dialog,
    DialogPanel,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';
import React, {useEffect, useState} from "react";
import {getToken} from "../../utils/auth";
import axios from "axios";
import {Button} from "../../components/ui/button";
import {MdOutlineVisibility} from "react-icons/md";
import {HiLogout} from "react-icons/hi";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "../../components/ui/breadcrumb";
import Link from "next/link";
import {Input} from "../../components/ui/input";
import {File, ListFilter, MoreHorizontal, Search} from "lucide-react";
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../../components/ui/dropdown-menu";
import Image from "next/image";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/ui/tabs";
import {CardContent, CardDescription, CardHeader, CardTitle} from "../../components/ui/card";
import {TableHeader} from "../../components/ui/table";
import {Avatar, AvatarImage} from "../../components/ui/avatar";
import {AiFillEdit} from "react-icons/ai";
import {GrLogout} from "react-icons/gr";


export default function Reception() {
    const [visits, setVisit] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentVisitor, setUpdateVisitor] = useState({});

    const token = getToken();

    useEffect(() => {
        const fetchVisits = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/visits', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setVisit(response.data.data); // Extracting visits array from response.data
            } catch (e) {
                console.log(e);
            }
        };

        fetchVisits();
    }, [token]);

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className={"flex justify-between w-full"}>
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="#">Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>

                        <BreadcrumbItem>
                            <BreadcrumbPage>Guest</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="relative ml-auto mr-10  md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    />
                </div>
            </div>

            <div className='flex mt-10 pb-10'>
                <div>
                    <h3 className="text-tremor-content-strong text-xl dark:text-dark-tremor-content-strong font-semibold">List
                        of visits today</h3>
                    <p className="dark:text-dark-tremor-content-strong pt-2 text-sm text-gray-500 font-norma pb-10">This
                        is a list of people who visited the premises</p>
                </div>

            </div>

            <Tabs defaultValue="today">
                <div className="flex items-center">

                    <TabsList>
                        <TabsTrigger value="today">Today</TabsTrigger>
                        <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
                        <TabsTrigger value="week">Week</TabsTrigger>
                    </TabsList>

                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 gap-1 text-sm"
                                >
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only">Filter</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Approved
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Pending
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Declined
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 gap-1 text-sm"
                        >
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only">Export</span>
                        </Button>
                    </div>
                </div>

                <TabsContent value="today">
                    <Card className="mt-5">
                        <CardHeader className="px-7">
                            <CardTitle className=''>Guests</CardTitle>
                            <CardDescription className='pb-10 pt-3'>
                               All guests for Ghana Link Network Services
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderCell>Full name</TableHeaderCell>
                                        <TableHeaderCell className="">
                                            Email
                                        </TableHeaderCell>
                                        <TableHeaderCell>Host</TableHeaderCell>
                                        <TableHeaderCell>Status</TableHeaderCell>
                                        <TableHeaderCell>Actions</TableHeaderCell>

                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {
                                        visits.map((visit) => (
                                            <TableRow onClick={() => setUpdateVisitor(visit)} key={visit._id}>
                                                <TableCell>{visit.full_name}</TableCell>
                                                <TableCell className="">{visit.email}</TableCell>
                                                <TableCell>{visit.employee.full_name}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        icon={RiTimeFill}
                                                        size="xs"
                                                        className={' text-yellow-500 p-2'}
                                                    >
                                                        {visit.visit_response}
                                                    </Badge>
                                                   </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button onClick={() => setIsOpen(true)}>
                                                            <AiFillEdit/>
                                                        </Button>
                                                        <Button>
                                                            <GrLogout/>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }

                                </TableBody>
                            </Table>

                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {
                currentVisitor && <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
                    <DialogPanel>
                        <h3 className="text-xl font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">{currentVisitor.full_name}</h3>
                        <div
                            className="mt-5  flex items-center space-x-2 ">
                            <h1 className='font-bold text-lg'>Purpose:</h1>
                            <p className='text-sm leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content'> {currentVisitor.visit_purpose}
                            </p>
                        </div>
                        <div
                            className="mt-5 flex items-center space-x-2 ">
                            <h1 className='font-bold text-lg'>Time:</h1>
                            <p className='text-sm leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content'> {new Date(currentVisitor.createdAt).toLocaleTimeString()}
                            </p>
                        </div>

                        <div
                            className="mb-5 mt-2 pb-10 flex items-center space-x-2 ">
                            <h1 className='font-bold text-lg'>Response:</h1>
                            <p className='text-sm leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
                                {currentVisitor.visit_response}
                            </p>
                        </div>

                        <div className='flex justify-between gap-x-3.5 w-full'>
                            <Button className="mt-8 w-1/2 mr-2 bg-red-700" onClick={() => setIsOpen(false)}>
                                Cancel Appointment
                            </Button>
                            <Button className="mt-8 w-1/2 bg-emerald-700" onClick={() => setIsOpen(false)}>
                                Approve Appointment
                            </Button>
                        </div>


                    </DialogPanel>
                </Dialog>
            }


        </div>
    );
}
