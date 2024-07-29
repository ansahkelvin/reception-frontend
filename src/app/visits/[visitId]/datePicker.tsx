import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {cn} from "@/lib/utils";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import axios from "axios";
import {getToken} from "@/utils/auth";
import {useRouter} from "next/navigation";

export function RescheduleButton({visitDetails}) {
    const [date, setDate] = useState<Date>()
    const [time, setTime] = useState('10:00');
    const token = getToken();
    const router = useRouter();


    const reschedule = async () => {
        try{
            const res = await axios.put(`http://localhost:4000/api/v1/visits/${visitDetails._id}`, {
                email: visitDetails.email,
                full_name: visitDetails.full_name,
                company_name: visitDetails.company_name,
                phone_number: visitDetails.phone_number,
                visit_purpose: visitDetails.visit_purpose,
                image: visitDetails.image,
                employee: visitDetails.employee._id,
                visit_response: "Rescheduled",
                visit_reason: "Reschedule",
                reschedule_status: true,
                reschedule_date: date,
                reschedule_time: time
            },{
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })

            if(res.status === 200){
                console.log(res.data)
                router.push('/success')
            }
        }
        catch (e){
            console.log(e)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-8 w-1/2 bg-purple-600 text-white" variant="outline">Reschedule</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Reschedule Meeting</DialogTitle>
                    <DialogDescription>
                       Enter the date and time you want to meet the person
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                           Date
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Time
                        </Label>
                        <TimePicker
                            onChange={setTime}
                            value={time}
                            disableClock={true}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={reschedule} type="submit">Reschedule</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
