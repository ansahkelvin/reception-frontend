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



const Department: React.FC<{ user: Department }> = ({ user }) => {
    const [department, setDepartment] = useState<Department[]>([]);
    const [loading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const token = getToken();

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:4000/api/v1/department', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setDepartment(response.data.data)
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
                        <BreadcrumbLink asChild>
                            <Link href="#">Employees</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>

                    <BreadcrumbItem>
                        <BreadcrumbPage>Department</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='flex mt-10 flex-row items-center justify-between'>
                <div>
                    <h1 className="text-black text-3xl font-semibold">Department</h1>
                    <p className='text-gray-500 pt-2'>Edit and create department here</p>
                </div>
                <div>
                    <Popover modal>
                        <PopoverTrigger asChild>
                            <Button>
                                Add Department
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
                                        <TableHeaderCell>Department Name</TableHeaderCell>

                                        <TableHeaderCell>Director</TableHeaderCell>
                                        <TableHeaderCell>Actions</TableHeaderCell>


                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {
                                        department.map((depart) => (
                                            <TableRow onClick={() => {}} key={depart._id}>
                                                <TableCell>{depart.name}</TableCell>
                                                <TableCell className="">{depart.director}</TableCell>


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

export default Department