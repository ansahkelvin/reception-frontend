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
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader, DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {CalendarIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

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

function Calendar(props: {
    mode: string,
    initialFocus: boolean,
    selected: Date | undefined,
    onSelect: (value: (((prevState: (Date | undefined)) => (Date | undefined)) | Date | undefined)) => void
}) {
    return null;
}

const Employee: React.FC<{ user: UserDetails }> = ({ user }) => {
    const [employee, setEmployee] = useState<UserDetails[]>([]);
    const [loading, setIsLoading] = useState(false)
    const [department, setDepartment] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [date, setDate] = React.useState<Date>()



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

    useEffect(()=> {
        const fetch = async () => {
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
                            <Link href="/human-resource/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/human-resource">Guests</Link>
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Create Employee</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create Employee</DialogTitle>
                                <DialogDescription>
                                    Fill the form to create an employee
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Full Name
                                    </Label>
                                    <Input
                                        id="name"
                                        className="col-span-3"
                                        placeholder={'Enter your full name here'}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="position" className="text-right">
                                        Position
                                    </Label>
                                    <Input
                                        id="position"
                                        className="col-span-3"
                                        placeholder={'Enter your position'}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        className="col-span-3"
                                        placeholder={"email@example.com"}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="number" className="text-right">
                                        Contact
                                    </Label>
                                    <Input
                                        id="number"
                                        className="col-span-3"
                                        placeholder={"0543XXXXXX"}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="number" className="text-right">
                                        Select
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Department"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Departments</SelectLabel>
                                                {
                                                    department.map((department) => {
                                                        return <SelectItem
                                                            key={department._id}
                                                            value={`${department.name}`}>{department.name}</SelectItem>
                                                    })
                                                }


                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="address" className="text-right">
                                        Address
                                    </Label>
                                    <Input
                                        id="address"
                                        className="col-span-3"
                                        placeholder={"House address"}
                                    />
                                </div>
                                <div className="flex justify-around items-center gap-4">
                                    <Label htmlFor="address" className="text-right">
                                        Employee Photo
                                    </Label>
                                    <div className="flex w-full min-w-lg items-center gap-1.5">
                                        <Input id="picture" type="file"/>
                                    </div>
                                </div>


                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className={'mt-10'}>
                {
                    loading ? <div>Loading</div> : <Card className="mt-5">

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