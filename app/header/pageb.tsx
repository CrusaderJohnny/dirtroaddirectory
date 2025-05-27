// Deprecated

// Author: Daniel Asefa
// Reference:

// Used YouTube video showing how to make sticky header in Next.js & TailwindCSS
// https://www.youtube.com/watch?v=YHMyYgaaEm8

'use client';
import React, { useRef } from 'react';
import Nav from '../_components/nav/Nav';
import NavMT from '../_components/nav/NavMT';
import Link from 'next/link';
import {Button} from "@mantine/core";

export default function TestableStickyHeader() {
    const marketRef = useRef(null);
    const categoriesRef = useRef(null);
    const newsRef = useRef(null);
    const vendorRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            {/* <Nav onNavigate={scrollToSection} refs={{ marketRef, categoriesRef, newsRef, vendorRef, contactRef }} /> */}
            <NavMT/>

            {/* HomeRef Section */}
            <section ref={marketRef} id="home" className='relative h-[100vh] bg-gray-300 flex justify-center items-center flex-col text-center'>
                <div className='relative z-10 text-white p-4'>
                    <h2 className='text-[28px] text-[black] font-bold mb-[25px]'>Home Content</h2>
                    <p className='text-[gray] mb-[15px]'>
                        This is the home section of the page, featuring a stunning background image.
                    </p>
                    <Button component={Link} href="/" className='bg-amber-500 w-[150px] h-[45px] rounded-[5px] text-white cursor-pointer'>
                        Learn More
                    </Button>
                </div>
            </section>

            {/* Categories Section */}
            <section ref={categoriesRef} id="home" className='relative h-[100vh] bg-gray-500 flex justify-center items-center flex-col text-center'>
                <div className='relative z-10 text-white p-4'>
                    <h2 className='text-[28px] text-[black] font-bold mb-[25px]'>categories Content</h2>
                    <p className='text-[gray] mb-[15px]'>
                        This is the home section of the page, featuring a stunning background image.
                    </p>
                    <button className='bg-amber-500 w-[150px] h-[45px] rounded-[5px] text-white cursor-pointer'>
                        Learn More
                    </button>
                </div>
            </section>

            {/* News Section */}
            <section ref={newsRef} id="home" className='relative h-[100vh] bg-gray-300 flex justify-center items-center flex-col text-center'>
                <div className='relative z-10 text-white p-4'>
                    <h2 className='text-[28px] text-[black] font-bold mb-[25px]'>News Content</h2>
                    <p className='text-[gray] mb-[15px]'>
                        This is the home section of the page, featuring a stunning background image.
                    </p>
                    <button className='bg-amber-500 w-[150px] h-[45px] rounded-[5px] text-white cursor-pointer'>
                        Learn More
                    </button>
                </div>
            </section>

            {/* Vendor Section */}
            <section ref={vendorRef} id="home" className='relative h-[100vh] bg-gray-500 flex justify-center items-center flex-col text-center'>
                <div className='relative z-10 text-white p-4'>
                    <h2 className='text-[28px] text-[black] font-bold mb-[25px]'>Vendor Content</h2>
                    <p className='text-[gray] mb-[15px]'>
                        This is the home section of the page, featuring a stunning background image.
                    </p>
                    <button className='bg-amber-500 w-[150px] h-[45px] rounded-[5px] text-white cursor-pointer'>
                        Learn More
                    </button>
                </div>
            </section>

            {/* Contact Section */}
            <section ref={contactRef} id="home" className='relative h-[100vh] bg-gray-300 flex justify-center items-center flex-col text-center'>
                <div className='relative z-10 text-white p-4'>
                    <h2 className='text-[28px] text-[black] font-bold mb-[25px]'>contact Content</h2>
                    <p className='text-[gray] mb-[15px]'>
                        This is the home section of the page, featuring a stunning background image.
                    </p>
                    <button className='bg-amber-500 w-[150px] h-[45px] rounded-[5px] text-white cursor-pointer'>
                        Learn More
                    </button>
                </div>
            </section>

        </div>
    );
}