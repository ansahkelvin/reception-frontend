"use client"
import { RiFlag2Line } from '@remixicon/react';
import {
    Badge,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';
import {useEffect, useState} from "react";
import {getToken} from "../../../utils/auth";
import axios from "axios";


export default function TableUsageExample() {
    const [visits, setVisit] = useState([])
    const token = getToken();
    useEffect(() => {

        const fetchVisits = async () => {
            const response = await axios.get('http://localhost:4000/api/v1/visits', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)
            setVisit(response.data)
        }

        fetchVisits()
    }, [])

    return (
        <Card>
            <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">List of Swiss Federal Councillours</h3>
            <Table className="mt-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Position</TableHeaderCell>
                        <TableHeaderCell>Department</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visits.map((visit) => (
                        <TableRow key={visit._id}>
                            <TableCell>{item.full_name}</TableCell>
                            <TableCell>
                                {item.Role}
                            </TableCell>
                            <TableCell>
                                {item.departement}
                            </TableCell>
                            <TableCell>
                                <Badge color="emerald" icon={RiFlag2Line}>
                                    {item.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}



