import {BackgroundImage, Button, Group, Box, Image, Title, Menu, Burger, Text, Flex} from "@mantine/core";
import Link from "next/link";
import {SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton} from "@clerk/nextjs";

import {
    IconApple,
    IconBuildingStore,
    IconMapRoute,
    IconHelpHexagon,
    IconMailbox,
} from '@tabler/icons-react';


export default function HeaderSmall() {

    return (

        <>
            <BackgroundImage
                src="https://d27p2a3djqwgnt.cloudfront.net/wp-content/uploads/2024/05/15165226/dirt-road.jpeg"
                style={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 3vh',
                    backgroundPosition: "500% 80%"
                }}
            >


                <Flex
                    justify='center'
                    align='center'
                    direction='row'
                    gap='lg'
                >

                    <Link href="/">

                        <Flex
                            align='center'
                            direction='row'
                        >

                            <Image
                                src='https://media.istockphoto.com/id/1170724138/vector/farmers-market-hand-drawn-lettering.jpg?s=1024x1024&w=is&k=20&c=EI--kDMvBM9pvC9jFJcaoepQHcDbTxp-De6fgIVqy_8='
                                h={40}
                                w='auto'
                                fit='contain'
                                radius='md'
                                alt="Farmers Market Logo"
                                mr='sm'
                            />
                            <Title
                                order={1} c='white'>
                                DRD
                            </Title>
                        </Flex>
                    </Link>

                    <Menu trigger='hover' openDelay='100' closeDelay='400'>
                        <Menu.Target>
                            <Burger color='white'/>
                        </Menu.Target>

                        {/*Drop down menu options*/}
                        <Menu.Dropdown>

                            {/*<Menu.Label>Main Pages</Menu.Label>*/}
                            {/*<Menu.Item*/}
                            {/*    leftSection={<IconSettings size={14}/>}*/}
                            {/*    component='a'*/}
                            {/*    href='/'*/}
                            {/*>*/}
                            {/*    Home*/}
                            {/*</Menu.Item>*/}
                            <Menu.Item
                                leftSection={<IconApple size={14}/>}
                                component='a'
                                href='/markets'
                            >
                                Markets
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconBuildingStore size={14}/>}
                                component='a'
                                href='/vendors'
                            >
                                Vendors
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconMapRoute size={14}/>}
                                component='a'
                                href='/map'
                            >
                                Market Map
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconHelpHexagon size={14}/>}
                                component='a'
                                href='/aboutus'
                            >
                                About Us
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconMailbox size={14}/>}
                                component='a'
                                href='/contact'
                            >
                                Contact
                            </Menu.Item>
                            {/*<Menu.Divider/>*/}

                            {/*This is cursed for some reason but looks nice*/}
                            {/*<Menu.Label>User Account</Menu.Label>*/}

                            {/*<SignedOut>*/}
                            {/*    <SignInButton>*/}
                            {/*        <Menu.Item*/}
                            {/*            leftSection={<IconArrowsLeftRight size={14}/>}*/}
                            {/*            color='blue'*/}
                            {/*        >*/}
                            {/*            Sign In*/}
                            {/*        </Menu.Item>*/}
                            {/*    </SignInButton>*/}
                            {/*</SignedOut>*/}
                            {/*<SignedIn>*/}
                            {/*    <SignOutButton>*/}
                            {/*        <Menu.Item*/}
                            {/*            leftSection={<IconArrowsLeftRight size={14}/>}*/}
                            {/*            color='blue'*/}
                            {/*        >*/}
                            {/*            Sign Out*/}
                            {/*        </Menu.Item>*/}
                            {/*    </SignOutButton>*/}
                            {/*</SignedIn>*/}
                            {/*<SignedOut>*/}
                            {/*    <SignUpButton>*/}
                            {/*        <Menu.Item*/}
                            {/*            leftSection={<IconArrowsLeftRight size={14}/>}*/}
                            {/*            color='blue'*/}
                            {/*        >*/}
                            {/*            Sign Up*/}
                            {/*        </Menu.Item>*/}
                            {/*    </SignUpButton>*/}
                            {/*</SignedOut>*/}
                            {/*<SignedIn>*/}
                            {/*    <Menu.item*/}
                            {/*        leftSection={<IconArrowsLeftRight size={14}/>}*/}
                            {/*        color='blue'*/}
                            {/*        component='a'*/}
                            {/*        href='/userfavs'*/}
                            {/*    >*/}
                            {/*        Favorites*/}
                            {/*    </Menu.item>*/}
                            {/*</SignedIn>*/}

                        </Menu.Dropdown>
                    </Menu>

                    <SignedOut>
                        <SignInButton>
                            <button className="signin-button">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton>
                            <button className="signup-button">
                                Sign Up
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
                        <UserButton/>
                    </SignedIn>
                </Flex>

            </BackgroundImage>
        </>
    );
}