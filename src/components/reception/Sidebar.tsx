"use client"
import React, {useEffect} from 'react';
import { useAuth } from '@/state/authContext'; // Adjust path based on your project structure
import {usePathname, useRouter} from 'next/navigation';
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {BiBarChart, BiCalendarWeek} from "react-icons/bi";
import {GoReport} from "react-icons/go";
import {FcDocument} from "react-icons/fc";
import {HiClipboardDocument} from "react-icons/hi2";
import {IoSettingsOutline} from "react-icons/io5";
import {CiLogout} from "react-icons/ci";
import {MdPersonOutline} from "react-icons/md";
import {Divider} from "@tremor/react";

const Sidebar = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const location = usePathname()


    const handleLogout = () => {
        logout();
        router.push('/auth/sign-in');
    };

    const links = [
        {
            title: "Dashboard",
            url: '/reception/dashboard',
            active: location === '/reception/dashboard',
            icon: BiBarChart
        },
        {
            title: "Guests",
            url: '/reception',
            active: location === '/reception',
            icon: MdPersonOutline
        },

        {
            title: "Report",
            url: '/reception/report',
            active: location.startsWith('/reception/report'),
            icon: HiClipboardDocument

},
        {
            title: "Logout",
            url: '/auth/sign-in',
            active: location.startsWith('/auth/sign-in'),
            icon: CiLogout

        }
    ]


    return (
        <div className="border border-r border-[#ededed] bg-white text-white p-4 w-56">
            <div className="mb-4">
                <Image src={'/cropped-logo-white.png'} alt={'logo'} width={400} height={400}/>



                <h2 className="text-sm text-gray-500 font-bold mb-2 pt-4">Ghana Link Network Services</h2>
                <Divider/>
                {
                    links.map((link) => (
                        <Link className='p-2' key={link.title} href={link.url}>

                            <p className={`font-normal text-sm text-black flex items-center gap-5  px-6 py-2 ${link.active ? ' py-3   rounded-lg bg-black text-white' : 'text-black'}`}>
                                <link.icon className={`text-lg  `}/>
                                {link.title}
                            </p>

                        </Link>))
                }
            </div>
            <nav>

            </nav>
        </div>
    );
};

export default Sidebar;
