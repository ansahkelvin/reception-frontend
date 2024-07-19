"use client"
import {RiTimeFill} from '@remixicon/react';
import {
    Badge,
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
import React, {useCallback, useEffect, useState} from "react";
import {getToken} from "@/utils/auth";
import axios from "axios";
import {Button} from "@/components/ui/button";


import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {File, ListFilter, Search} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {AiFillEdit} from "react-icons/ai";
import {GrLogout} from "react-icons/gr";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {toast} from "sonner";
import debounce from "debounce";

interface iEmployee {
    _id: string;
}

interface iVisitor {
    email: string;
    _id: string;
    full_name: string;
    visit_response: string;
    visit_reason: string;
    phone_number: string;
    image: string;
    company_name: string;
    employee: iEmployee;
    visit_purpose: string;
    createdAt: string;
    departure_time: string;


}

interface iFilter {
    None: true,
    Approved: false,
    Pending: false,
    Declined: false,
}

export default function Reception() {
    const [visits, setVisit] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isDepartureLoading, setIsDepartureLoading] = useState(false)
    const [selectedTab, setSelectedTab] = useState('today');
    const [cache, setCache] = useState({});
    const [currentVisitor, setUpdateVisitor] = useState<iVisitor>({
        email: '',
        _id: '',
        full_name: '',
        visit_response: '',
        visit_purpose: '',
        visit_reason: '',
        image: '',
        phone_number: '',
        company_name: '',
        employee: {
            _id: ''
        },
        visit_purpose: '',
        createdAt: '',
        departure_time: ''
    });

    const [selectedFilters, setSelectedFilters] = useState<iFilter>({
        None: true,
        Approved: false,
        Pending: false,
        Declined: false,
    });

    const constructQueryString = (filters) => {
        const activeFilters = Object.keys(filters).filter(filter => filters[filter] && filter !== 'None');
        return activeFilters.length ? `?status=${activeFilters.join('&status=')}` : '';
    };

    const onExitPremises = async (visitId) => {
        try {
            setIsDepartureLoading(true)
            const res = await axios.put(`http://localhost:4000/api/v1/visits/${visitId._id}`, {
                email: visitId.email,
                full_name: visitId.full_name,
                company_name: visitId.company_name,
                phone_number: visitId.phone_number,
                visit_purpose: visitId.visit_purpose,
                image: visitId.image,
                employee: visitId.employee._id,
                visit_response: visitId.visit_response,
                visit_reason: visitId.visit_reason,
                departure_time: new Date()
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast("Changes has been saved", {
                description: "Guest has successfully left the premises",
                action: {
                    label: "Done",
                    onClick: () => console.log("Done"),
                },
            })


            console.log(res);
        } catch (e) {
            console.log(e)
        } finally {
            setIsOpen(false)
            setIsDepartureLoading(false)
        }

    }

    const token = getToken();

    const fetchFilteredData = useCallback(debounce(async (filters: iFilter) => {
        const queryString = constructQueryString(filters);

        try {
            const response = await axios.get(`http://localhost:4000/api/v1/visits${queryString}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setVisit(response.data.data); // Extracting visits array from response.data
            }
        } catch (e) {
            console.error(e);
        }
    }, 300), []);

    useEffect(() => {

        fetchFilteredData(selectedFilters);
    }, [token, selectedFilters]);

    const handleFilterChange = (filter) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [filter]: !prevFilters[filter],
        }));
    };

    console.log(selectedFilters)

    const getDateRange = (tab) => {
        const today = new Date();
        let startDate, endDate;

        switch (tab) {
            case 'today':
                startDate = endDate = today;
                break;
            case 'yesterday':
                startDate = endDate = new Date(today.setDate(today.getDate() - 1));
                break;
            case 'week':
                startDate = new Date(today.setDate(today.getDate() - 7));
                endDate = new Date();
                break;
            default:
                startDate = endDate = today;
        }

        return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
    };


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

                <div className="relative ml-auto mr-10 md:grow-0">
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

            <Tabs defaultValue={selectedTab}>
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
                                    <ListFilter className="h-3.5 w-3.5"/>
                                    <span className="sr-only sm:not-sr-only">Filter</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                {Object.keys(selectedFilters).map((filter) => (
                                    <DropdownMenuCheckboxItem
                                        key={filter}
                                        checked={selectedFilters[filter]}
                                        onCheckedChange={() => handleFilterChange(filter)}
                                    >
                                        {filter}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 gap-1 text-sm"
                        >
                            <File className="h-3.5 w-3.5"/>
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
                                        <TableHeaderCell>Profile</TableHeaderCell>
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
                                                <TableCell>
                                                    <Avatar>
                                                        <AvatarImage src={visit.image} alt="profile"/>
                                                        <AvatarFallback>CN</AvatarFallback>
                                                    </Avatar>

                                                </TableCell>
                                                <TableCell>{visit.full_name}</TableCell>
                                                <TableCell className="">{visit.email}</TableCell>
                                                <TableCell>{visit.employee.full_name}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        icon={RiTimeFill}
                                                        size="xs"
                                                        className={`${visit.visit_response === 'Declined' && 'outline outline-red-700 p-2 bg-white rounded-lg text-red-600'} ${visit.visit_response === 'Approved' && 'outline outline-emerald-600 p-2 bg-white rounded-lg text-emerald-600'} ${visit.visit_response === 'Pending' && 'outline outline-yellow-500 p-2 bg-white rounded-lg text-yellow-500'}`}
                                                    >
                                                        {visit.visit_response}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button onClick={() => setIsOpen(true)}>
                                                            <AiFillEdit/>
                                                        </Button>
                                                        <Button className='bg-red-800'
                                                                onClick={() => onExitPremises(visit)}>
                                                            {isDepartureLoading ? (
                                                                <svg className="animate-spin h-5 w-5 mx-auto text-white"
                                                                     xmlns="http://www.w3.org/2000/svg"
                                                                     fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12"
                                                                            r="10" stroke="currentColor"
                                                                            strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor"
                                                                          d="M4 12a8 8 0 018-8v4l-2 2a4 4 0 100 8l2 2v4a8 8 0 01-8-8z"></path>
                                                                </svg>
                                                            ) : (
                                                                <GrLogout/>
                                                            )}
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
                        <div className="p-10">
                            <table className="table-auto w-full">
                                <thead>
                                <tr className="border-b-2">
                                    <th className="text-left p-2">Title</th>
                                    <th className="text-left p-2">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="border-b-2">
                                    <td className="font-semibold text-lg p-2">Purpose:</td>
                                    <td className="text-sm leading-6 font-semibold text-tremor-default text-tremor-content dark:text-dark-tremor-content p-2">
                                        {currentVisitor.visit_purpose}
                                    </td>
                                </tr>
                                <tr className="border-b-2">
                                    <td className="font-semibold text-lg p-2">Arrival Time:</td>
                                    <td className="text-sm leading-6 font-semibold text-tremor-default text-tremor-content dark:text-dark-tremor-content p-2">
                                        {new Date(currentVisitor.createdAt).toLocaleTimeString()}
                                    </td>
                                </tr>
                                <tr className="border-b-2">
                                    <td className="font-semibold text-lg p-2">Departure Time:</td>
                                    <td className="text-sm leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content p-2">
                                        {currentVisitor.departure_time ? (
                                            `${new Date(currentVisitor.departure_time).toLocaleDateString()} - ${new Date(currentVisitor.departure_time).toLocaleTimeString()}`
                                        ) : (
                                            <span className="text-yellow-500 font-bold">On Premise</span>
                                        )}
                                    </td>
                                </tr>
                                <tr className="border-b-2">
                                    <td className="font-semibold text-lg p-2">Request Status:</td>
                                    <td className={`${currentVisitor.visit_response === "Declined" ? 'text-red-700' : ''} text-sm leading-6 font-semibold p-2`}>
                                        {currentVisitor.visit_response}
                                    </td>
                                </tr>
                                {currentVisitor.visit_reason && (
                                    <tr className="border-b-2">
                                        <td className="font-semibold text-lg p-2">Host Reason:</td>
                                        <td className="text-sm leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content p-2">
                                            {currentVisitor.visit_reason}
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                            <div className="flex justify-between gap-x-3.5 w-full mt-8">
                                {(currentVisitor.visit_response !== "Declined" && currentVisitor.visit_response !== "Approved") && (
                                    <>
                                        <Button className="w-1/2 bg-red-700" onClick={() => setIsOpen(false)}>Cancel
                                            Appointment</Button>
                                        <Button className="w-1/2 bg-emerald-700" onClick={() => setIsOpen(false)}>Approve
                                            Appointment</Button>
                                    </>
                                )}
                            </div>
                        </div>

                    </DialogPanel>
                </Dialog>
            }


        </div>
    );
}
