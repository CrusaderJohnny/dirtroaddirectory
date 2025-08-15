import Link from 'next/link';
import {Avatar, Button, Group, Image, Modal, ScrollArea, Title} from '@mantine/core';
import {SignedIn, SignedOut, UserButton, useUser} from '@clerk/nextjs';
import {useDisclosure, useMediaQuery} from '@mantine/hooks';
import UserLoginModal from '@/app/_components/navcomps/UserLoginModal';
import {IconUser} from '@tabler/icons-react';

export default function HeaderLarge() {
    const [opened, {open, close}] = useDisclosure(false);
    const isMobile = useMediaQuery('(max-width: 20rem)');
    const {user} = useUser();
    const isAdmin = user?.publicMetadata?.role === 'admin';

    return (
        <Group justify="space-between" w="100%" style={{flexWrap: 'nowrap'}}>
            <Modal
                opened={opened}
                onClose={close}
                withCloseButton={false}
                centered
                padding={0}
                scrollAreaComponent={ScrollArea.Autosize}
                fullScreen={isMobile}
                style={{body: {backgroundColor: 'transparent'}}}
                size="20rem"
                overlayProps={{backgroundOpacity: 0.55, blur: 3}}
            >
                <UserLoginModal/>
            </Modal>

            <Link href="/">
                <Group>
                    <Image
                        src="https://media.istockphoto.com/id/1170724138/vector/farmers-market-hand-drawn-lettering.jpg?s=1024x1024&w=is&k=20&c=EI--kDMvBM9pvC9jFJcaoepQHcDbTxp-De6fgIVqy_8="
                        h={40}
                        w="auto"
                        fit="contain"
                        radius="md"
                        alt="Farmers Market Logo"
                    />
                    <Group gap={4} align="center">
                        <Title order={2} c="white">
                            <span style={{fontSize: '2.5rem', verticalAlign: 'middle'}}>D</span>
                            <span style={{fontSize: '1.5rem'}}>irt</span>
                        </Title>
                        <Title order={2} c="white">
                            <span style={{fontSize: '2.5rem', verticalAlign: 'middle'}}>R</span>
                            <span style={{fontSize: '1.5rem'}}>oad</span>
                        </Title>
                        <Title order={2} c="white">
                            <span style={{fontSize: '2.5rem', verticalAlign: 'middle'}}>D</span>
                            <span style={{fontSize: '1.5rem'}}>irectory</span>
                        </Title>
                    </Group>
                </Group>
            </Link>

            <Group gap="md" w={"50%"} justify="space-between" style={{flexWrap: 'nowrap'}}>
                <Button component="a" href="/markets" variant="subtle" color="white" size="md">
                    Markets
                </Button>
                <Button component="a" href="/vendors" variant="subtle" color="white" size="md">
                    Vendors
                </Button>
                <Button component="a" href="/map" variant="subtle" color="white" size="md">
                    Market Map
                </Button>
                <Button component="a" href="/aboutus" variant="subtle" color="white" size="md">
                    About Us
                </Button>
                <Button component="a" href="/contact" variant="subtle" color="white" size="md">
                    Contact
                </Button>
            </Group>

            {/*(Sign-in) / (Panel / Favs + Clerk Icon)*/}
            <Group>
                {/* If signed out, show button for the sign-in / sign-up model*/}
                <SignedOut>
                    <Button
                        onClick={open}
                        variant="outline"
                        color="white"
                        size="xs"
                        style={{backgroundColor: '#2f9e44'}}
                    >
                        <Avatar radius="xl" size="xs" style={{backgroundColor: '#ffc2c2'}}>
                            <IconUser size={14}/>
                        </Avatar>
                        <Title pl="sm" order={6}>Accounts</Title>
                    </Button>
                </SignedOut>

                {/*Signed in section*/}
                {/*Basic user favs section*/}
                {!isAdmin && (
                    <SignedIn>
                        <Button component="a" href="/userfavs" variant="subtle" c="white" size="md">
                            Favs
                        </Button>
                    </SignedIn>
                )}

                {/*Admin Panel Section*/}
                {isAdmin && (
                    <Button
                        component="a"
                        href="/admin"
                        variant="outline"
                        color="white"
                        size="xs"
                        style={{backgroundColor: '#ff7070'}}
                    >
                        Admin Panel
                    </Button>
                )}
                <UserButton/>
            </Group>
        </Group>
    );
}
