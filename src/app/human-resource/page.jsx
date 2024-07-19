"use client"
import {RiFlag2Line} from '@remixicon/react';
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
import {useEffect, useState} from "react";
import {getToken} from "../../utils/auth";
import axios from "axios";
import {Button} from "../../components/ui/button";
import {MdOutlineVisibility} from "react-icons/md";
import {HiLogout} from "react-icons/hi";


export default function HumanResource() {
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
        <Card className="mx-auto max-w-2xl rounded">
            <div className='flex'>
                <div>
                    <h2 className="text-tremor-content-strong text-lg dark:text-dark-tremor-content-strong font-semibold">Human Resource</h2>
                    <p className="dark:text-dark-tremor-content-strong pt-2 text-sm text-gray-500 font-norma pb-10">This
                        is a list of people who visited the premises</p>
                </div>

            </div>

            <Table className="mt-5">
                <TableHead>
                    <TableRow className='font-semibold'>
                        <TableHeaderCell>Full Name</TableHeaderCell>
                        <TableHeaderCell>Phone Number</TableHeaderCell>
                        <TableHeaderCell>Purpose</TableHeaderCell>
                        <TableHeaderCell>Host</TableHeaderCell>
                        <TableHeaderCell>Time</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {visits.map((visit, index) => (
                        <TableRow onClick={() => {
                            setUpdateVisitor(visit)
                        }} className={'text-sm'} key={index}>
                            <TableCell>{visit.full_name}</TableCell>
                            <TableCell>{visit.phone_number}</TableCell>
                            <TableCell>{visit.visit_purpose}</TableCell>
                            <TableCell>{visit.employee.full_name}</TableCell>
                            <TableCell>{new Date(visit.createdAt).toLocaleTimeString()}</TableCell>
                            <TableCell>
                                <Badge color={`${visit.visit_response === 'Pending' ? 'yellow' : 'emerald'}`}
                                       icon={RiFlag2Line}>
                                    {visit.visit_response}
                                </Badge>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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


        </Card>
    );
}
