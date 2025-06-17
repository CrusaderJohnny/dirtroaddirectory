/*
Author: Daniel Asefa
website header using Mantine

References:



*/
"use client"
import {AppShell, Button, Group, BackgroundImage, Title, Image} from '@mantine/core';
import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from "@clerk/nextjs";
import Link from "next/link";

export default function NavMT() {

    // const theme = useMantineTheme()

    return (
        <AppShell
            header={{ height: 60 }}
        >
            <AppShell.Header>
                {/* main div containing the header */}
                <BackgroundImage
                    src="https://d27p2a3djqwgnt.cloudfront.net/wp-content/uploads/2024/05/15165226/dirt-road.jpeg"
                    style={{
                        //backgroundColor: theme.colors.red[6], // Use if color preferred over image (team not decided)
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 3vh',
                        backgroundPosition: "500% 80%"
                    }}
                >
                    {/* Header right side */}
                    <Link href="/">
                    <Group
                        justify="space-evenly"
                    >
                        <Image
                            src='https://media.istockphoto.com/id/1170724138/vector/farmers-market-hand-drawn-lettering.jpg?s=1024x1024&w=is&k=20&c=EI--kDMvBM9pvC9jFJcaoepQHcDbTxp-De6fgIVqy_8='
                            h={40}
                            w='auto'
                            fit='contain'
                            radius='md'
                            alt="Farmers Market Logo"
                        />
                        <Title
                            order={1} c='white'>
                            Dirt Road Directory
                        </Title>
                    </Group>
                    </Link>

                    {/* Header let side where nav to sections of the page */}
                    <Group gap='md' >
                        <Button
                            component='a'
                            href='/markets'
                            variant='subtle'
                            color='white'
                            size='lg'
                        >
                            Markets
                        </Button>
                        <Button
                            component='a'
                            href='/vendors'
                            variant='subtle'
                            color='white'
                            size='lg'
                        >
                            Vendors
                        </Button>
                        <Button
                            component='a'
                            href='/map'
                            variant='subtle'
                            color='white'
                            size='lg'
                        >
                            Market Map
                        </Button>
                        <Button
                            component='a'
                            href='/aboutus'
                            variant='subtle'
                            color='white'
                            size='lg'
                        >
                            About Us
                        </Button>
                        <Button
                            component='a'
                            href='/contact'
                            variant='subtle'
                            color='white'
                            size='lg'
                        >
                            Contact
                        </Button>
                    </Group>
                    <Group>
                        <SignedOut>
                            <SignInButton>
                                <button className="signin-button">
                                    Sign in here
                                </button>
                            </SignInButton>
                            <SignUpButton>
                                <button className="signup-button">
                                    Sign up here
                                </button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <Button
                                component='a'
                                href="/userfavs"
                                variant={'subtle'}
                                c='white'
                                size='lg'
                            >
                                Favs
                            </Button>
                            <UserButton />
                        </SignedIn>
                    </Group>
                </BackgroundImage>
            </AppShell.Header>
        </AppShell>

    );
}