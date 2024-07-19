"use client"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
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
import React, {useEffect, useState} from "react";
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow} from "@tremor/react";
import {RiTimeFill} from "@remixicon/react";
import {AiFillEdit} from "react-icons/ai";
import {GrLogout} from "react-icons/gr";
import axios from "axios";
import {getToken} from "@/utils/auth";
import {TiDeleteOutline} from "react-icons/ti";
import {IoTrashBinOutline} from "react-icons/io5";

interface Department {
    _id: string;
    name: string;
    director: string;
    createdAt: string;
    updatedAt: string;
}

interface UserDetails {
    _id: string;
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    date_of_employment: string;
    position: string;
    profile: string;
    department: Department;
    createdAt: string;
    updatedAt: string;
}

const Employee: React.FC<{ user: UserDetails }> = ({ user }) => {
    const [employee, setEmployee] = useState<UserDetails[]>([]);
    const [loading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const token = getToken();

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:4000/api/v1/employee', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setEmployee(response.data.data)
                    console.log(response.data.data)
                }
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        }
        fetch();
    }, [])

    return (
        <div className="p-10">
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="#">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="#">Guests</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>

                    <BreadcrumbItem>
                        <BreadcrumbPage>Employees</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='flex mt-10 flex-row items-center justify-between'>
                <div>
                    <h1 className="text-black text-3xl font-semibold">Employees</h1>
                    <p className='text-gray-500 pt-2'>Edit and create employees here</p>
                </div>
                <div>
                    <Popover modal>
                        <PopoverTrigger asChild>
                            <Button>
                                Add Employee
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <h1>Hello</h1>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className={'mt-10'}>
                {
                    loading ? <div>Loading</div> :  <Card className="mt-5">

                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderCell>Full name</TableHeaderCell>
                                        <TableHeaderCell className="">
                                            Email
                                        </TableHeaderCell>
                                        <TableHeaderCell>Department</TableHeaderCell>
                                        <TableHeaderCell>Contact</TableHeaderCell>
                                        <TableHeaderCell>Position</TableHeaderCell>
                                        <TableHeaderCell>Actions</TableHeaderCell>

                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {
                                        employee.map((employee) => (
                                            <TableRow onClick={() => {}} key={employee._id}>
                                                <TableCell>{employee.full_name}</TableCell>
                                                <TableCell className="">{employee.email}</TableCell>
                                                <TableCell>{employee.department.name}</TableCell>
                                                <TableCell>{employee.position}</TableCell>

                                                <TableCell>{employee.phone_number}</TableCell>



                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button className='bg-yellow-500' onClick={() => setIsOpen(true)}>
                                                            <AiFillEdit/>
                                                        </Button>
                                                        <Button className={'bg-red-800'}>
                                                            <IoTrashBinOutline/>
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
                }
            </div>
        </div>
    )
}

export default Employee