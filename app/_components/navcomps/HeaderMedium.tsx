import Link from 'next/link';
import {Button, Group, Title, Flex, ScrollArea, Modal, Avatar} from '@mantine/core';
import {SignedIn, SignedOut, UserButton, useUser} from '@clerk/nextjs';
import UserLoginModal from '@/app/_components/navcomps/UserLoginModal';
import {useDisclosure, useMediaQuery} from '@mantine/hooks';
import {IconUser} from '@tabler/icons-react';

export default function HeaderMedium() {
    const [opened, {open, close}] = useDisclosure(false);
    const isMobile = useMediaQuery('(max-width: 20rem)');

    // isLoaded boolean to handle the asynchronous nature of Clerk
    const {user, isLoaded} = useUser();

    // If the user data hasn't loaded yet, return null or a loading state.
    // This prevents the component from rendering with an undefined 'user' object.
    if (!isLoaded) {
        return null;
    }

    const isAdmin = user?.publicMetadata?.role === 'admin';

    return (
        <>
            <Flex direction="column" w={"100%"}>
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
                <Group justify="space-between" w="100%" wrap="nowrap" align="center">
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <Group wrap="nowrap" align="center" gap="xs">
                            <Avatar
                                src="https://media.istockphoto.com/id/1170724138/vector/farmers-market-hand-drawn-lettering.jpg?s=1024x1024&w=is&k=20&c=EI--kDMvBM9pvC9jFJcaoepQHcDbTxp-De6fgIVqy_8="
                                alt="Farmers Market Logo"
                                size={"1.5rem"}
                                radius="xl"
                            />

                            <Group gap={4} align="center">
                                <Title order={2} c="white">
                                    <span style={{ fontSize: '1.75rem' }}>D</span>
                                    <span style={{ fontSize: '1rem' }}>irt</span>
                                </Title>
                                <Title order={2} c="white">
                                    <span style={{ fontSize: '1.75rem' }}>R</span>
                                    <span style={{ fontSize: '1rem' }}>oad</span>
                                </Title>
                                <Title order={2} c="white">
                                    <span style={{ fontSize: '1.75rem' }}>D</span>
                                    <span style={{ fontSize: '1rem' }}>irectory</span>
                                </Title>
                            </Group>
                        </Group>
                    </Link>
                    <Group>
                        <Group>
                            {/* If signed out, show button for the sign-in / sign-up model*/}
                            <SignedOut>
                                <Button
                                    onClick={open}
                                    variant="outline"
                                    color="white"
                                    size="compact-xs"
                                    style={{backgroundColor: '#2f9e44'}}
                                >
                                    <Avatar radius="xl" size="compact-xs" style={{backgroundColor: '#ffc2c2'}}>
                                        <IconUser size={12}/>
                                    </Avatar>
                                    <Title style={{ fontSize: '.75rem' }}>Accounts</Title>
                                </Button>
                            </SignedOut>

                            {/*Signed in section*/}
                            {/*Basic user favs section*/}
                            {/*Admin Panel Section*/}
                            {isAdmin ? (
                                <Button
                                    component="a"
                                    href="/admin"
                                    variant="outline"
                                    color="white"
                                    size="compact-xs"
                                    style={{backgroundColor: '#ff7070'}}
                                >
                                    Admin Panel
                                </Button>
                            ) : (
                                <SignedIn>
                                <Button component="a" href="/userfavs" variant="subtle" c="white" size="compact-xs">
                                Favs
                                </Button>
                                </SignedIn>
                                )}
                            <UserButton
                                appearance={{
                                    elements: {
                                        rootBox: {
                                            width: "24px", // make smaller
                                            height: "24px",
                                        },
                                        avatarBox: {
                                            width: "24px",
                                            height: "24px",
                                        },
                                    },
                                }}
                            />
                        </Group>
                    </Group>
                </Group>

                <Group>
                    <Group gap="md" w={"80%"} justify="space-between" style={{flexWrap: 'nowrap'}}>
                        <Button component="a" href="/markets" variant="subtle" color="white" size="sm">
                            Markets
                        </Button>
                        <Button component="a" href="/vendors" variant="subtle" color="white" size="sm">
                            Vendors
                        </Button>
                        <Button component="a" href="/map" variant="subtle" color="white" size="sm">
                            Market Map
                        </Button>
                        <Button component="a" href="/aboutus" variant="subtle" color="white" size="sm">
                            About Us
                        </Button>
                        <Button component="a" href="/contact" variant="subtle" color="white" size="sm">
                            Contact
                        </Button>
                    </Group>
                </Group>
            </Flex>

        </>
    );
}
