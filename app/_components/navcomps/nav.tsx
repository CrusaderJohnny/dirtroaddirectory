// Deprecated

// Author: Daniel Asefa
// Reference:
// Used youtube video as a base for how to create a sticky header
// https://www.youtube.com/watch?v=YHMyYgaaEm8
//

'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@mantine/core';
import Link from 'next/link';

function Nav({ onNavigate, refs }) {
    const [header, setHeader] = useState(false);

    const scrollHeader = () => {
        if (window.scrollY >= 20) {
            setHeader(true);
        } else {
            setHeader(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollHeader);
        return () => {
            window.removeEventListener("scroll", scrollHeader);
        };
    }, []);

    const handleNavigation = (ref) => {
        onNavigate(ref);
    };

    return (
        // Header color still up for debate red: #C70039 green: #248721
        // Make Header one color or change with scrolling? bg
        <div
            className={
                // Changing header color when scrolling
                // header
                //     ? 'fixed w-[100%] bg-[#C70039] text-[white] z-50'
                //     : 'bg-[transparent] z-50'

                // Static color header throughout
                "header fixed w-[100%] h-[14vh] bg-[#C70039] text-[white] z-50"
            }
        >
            <div className="header flex w-[80%] justify-between m-auto py-[5px] items-end">
                <Image
                    src="/images/Market-Image-PlaceHolder.jpg"
                    width={60}
                    height={60}
                    alt="Place Holder logo"
                    style={{ objectFit: 'cover' }}
                    priority
                />
                <Button variant='default' fullWidth size='xl' component={Link} href="/">
                    <div className="logo text-[24px]">
                        <h2>Market</h2>
                        <div className="pl-[3vw]">
                            <h2>Fresh</h2>
                        </div>
                    </div>
                </Button>


                <div className="menu">
                    <nav className="">
                        <ul className="flex gap-[3vw] text-[1.5vw] font-sans-bold">
                            <li>
                                <button onClick={() => handleNavigation(refs.marketRef)}>
                                    Markets
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleNavigation(refs.categoriesRef)}>
                                    Categories
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleNavigation(refs.newsRef)}>
                                    News
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleNavigation(refs.vendorRef)}>
                                    Vendors
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleNavigation(refs.contactRef)}>
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Nav;
