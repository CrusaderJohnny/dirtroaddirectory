import Link from 'next/link';
import {Button, Group, Title, Flex, ScrollArea, Modal, Avatar} from '@mantine/core';
import {SignedIn, SignedOut, UserButton, useUser} from '@clerk/nextjs';
import UserLoginModal from '@/app/_components/navcomps/UserLoginModal';
import {useDisclosure, useMediaQuery} from '@mantine/hooks';
import {IconUser} from '@tabler/icons-react';

export default function HeaderMedium() {
    const [opened, {open, close}] = useDisclosure(false);
    const isMobile = useMediaQuery('(max-width: 20rem)');
    const {user} = useUser();
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
                            {!isAdmin && (
                                <SignedIn>
                                    <Button component="a" href="/userfavs" variant="subtle" c="white" size="compact-xs">
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
                                    size="compact-xs"
                                    style={{backgroundColor: '#ff7070'}}
                                >
                                    Admin Panel
                                </Button>
                            )}

                            {/*Vendor Panel Section*/}
                            {/*<Button*/}
                            {/*    component="a"*/}
                            {/*    href="/admin"*/}
                            {/*    variant="outline"*/}
                            {/*    color="white"*/}
                            {/*    size="xs"*/}
                            {/*    style={{backgroundColor: '#ff7070'}}*/}
                            {/*>*/}
                            {/*    Vendor Panel*/}
                            {/*</Button>*/}

                            {/*Market Panel Section*/}
                            {/*<Button*/}
                            {/*    component="a"*/}
                            {/*    href="/admin"*/}
                            {/*    variant="outline"*/}
                            {/*    color="white"*/}
                            {/*    size="xs"*/}
                            {/*    style={{backgroundColor: '#ff7070'}}*/}
                            {/*>*/}
                            {/*    Market Panel*/}
                            {/*</Button>*/}

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

            {/*<Group justify="space-between" w="100%" style={{ flexWrap: 'nowrap' }}>*/}
            {/*    <Modal*/}
            {/*        opened={opened}*/}
            {/*        onClose={close}*/}
            {/*        withCloseButton={false}*/}
            {/*        centered*/}
            {/*        padding={0}*/}
            {/*        scrollAreaComponent={ScrollArea.Autosize}*/}
            {/*        fullScreen={isMobile}*/}
            {/*        style={{ body: { backgroundColor: 'transparent' } }}*/}
            {/*        size="20rem"*/}
            {/*        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}*/}
            {/*    >*/}
            {/*        <UserLoginModal />*/}
            {/*    </Modal>*/}

            {/*    <Link href="/">*/}
            {/*        <Group>*/}
            {/*            <Image*/}
            {/*                src="https://media.istockphoto.com/id/1170724138/vector/farmers-market-hand-drawn-lettering.jpg?s=1024x1024&w=is&k=20&c=EI--kDMvBM9pvC9jFJcaoepQHcDbTxp-De6fgIVqy_8="*/}
            {/*                h={40}*/}
            {/*                w="auto"*/}
            {/*                fit="contain"*/}
            {/*                radius="md"*/}
            {/*                alt="Farmers Market Logo"*/}
            {/*            />*/}
            {/*            <Group gap={4} align="center">*/}
            {/*                <Title order={2} c="white">*/}
            {/*                    <span style={{ fontSize: '2.5rem', verticalAlign: 'middle' }}>D</span>*/}
            {/*                    <span style={{ fontSize: '1.5rem' }}>irt</span>*/}
            {/*                </Title>*/}
            {/*                <Title order={2} c="white">*/}
            {/*                    <span style={{ fontSize: '2.5rem', verticalAlign: 'middle' }}>R</span>*/}
            {/*                    <span style={{ fontSize: '1.5rem' }}>oad</span>*/}
            {/*                </Title>*/}
            {/*                <Title order={2} c="white">*/}
            {/*                    <span style={{ fontSize: '2.5rem', verticalAlign: 'middle' }}>D</span>*/}
            {/*                    <span style={{ fontSize: '1.5rem' }}>irectory</span>*/}
            {/*                </Title>*/}
            {/*            </Group>*/}
            {/*        </Group>*/}
            {/*    </Link>*/}

            {/*    <Group>*/}
            {/*        /!* Admin button space reserved *!/*/}
            {/*        <div style={{ visibility: isAdmin ? 'visible' : 'hidden' }}>*/}
            {/*            <Button*/}
            {/*                component="a"*/}
            {/*                href="/admin"*/}
            {/*                variant="outline"*/}
            {/*                color="white"*/}
            {/*                size="xs"*/}
            {/*                style={{ backgroundColor: '#ff7070' }}*/}
            {/*            >*/}
            {/*                <Avatar*/}
            {/*                    variant="subtle"*/}
            {/*                    radius="xl"*/}
            {/*                    color="green"*/}
            {/*                    size="xs"*/}
            {/*                    style={{ backgroundColor: '#ffc2c2' }}*/}
            {/*                >*/}
            {/*                    <IconLockCode size={14} />*/}
            {/*                </Avatar>*/}
            {/*                <Title pl="sm" order={6}>Admin Panel</Title>*/}
            {/*            </Button>*/}
            {/*        </div>*/}

            {/*        /!* Auth controls *!/*/}
            {/*        <UserButton />*/}

            {/*        <Menu position="bottom-start">*/}
            {/*            <Menu.Target>*/}
            {/*                <Button*/}
            {/*                    component="a"*/}
            {/*                    variant="outline"*/}
            {/*                    color="white"*/}
            {/*                    size="xs"*/}
            {/*                    style={{ backgroundColor: '#2f9e44' }}*/}
            {/*                >*/}
            {/*                    <Burger color="white" size="xs" />*/}
            {/*                    <Title pl="sm" order={6}>Pages</Title>*/}
            {/*                </Button>*/}
            {/*            </Menu.Target>*/}
            {/*            <Menu.Dropdown>*/}
            {/*                <SignedOut>*/}
            {/*                    <Menu.Item*/}
            {/*                        component="button"*/}
            {/*                        onClick={open}*/}
            {/*                        leftSection={<IconUser size={14} />}*/}
            {/*                        color="blue"*/}
            {/*                    >*/}
            {/*                        User Account*/}
            {/*                    </Menu.Item>*/}
            {/*                </SignedOut>*/}
            {/*                <SignedIn>*/}
            {/*                    <Menu.Item*/}
            {/*                        leftSection={<IconHeartStar size={14} />}*/}
            {/*                        color="blue"*/}
            {/*                        component="a"*/}
            {/*                        href="/userfavs"*/}
            {/*                    >*/}
            {/*                        Favorites*/}
            {/*                    </Menu.Item>*/}
            {/*                </SignedIn>*/}

            {/*                <Menu.Divider />*/}
            {/*                <Menu.Label>Pages</Menu.Label>*/}
            {/*                <Menu.Item leftSection={<IconApple size={14} />} component="a" href="/markets">*/}
            {/*                    Markets*/}
            {/*                </Menu.Item>*/}
            {/*                <Menu.Item leftSection={<IconBuildingStore size={14} />} component="a" href="/vendors">*/}
            {/*                    Vendors*/}
            {/*                </Menu.Item>*/}
            {/*                <Menu.Item leftSection={<IconMapRoute size={14} />} component="a" href="/map">*/}
            {/*                    Market Map*/}
            {/*                </Menu.Item>*/}
            {/*                <Menu.Item leftSection={<IconHelpHexagon size={14} />} component="a" href="/aboutus">*/}
            {/*                    About Us*/}
            {/*                </Menu.Item>*/}
            {/*                <Menu.Item leftSection={<IconMailbox size={14} />} component="a" href="/contact">*/}
            {/*                    Contact*/}
            {/*                </Menu.Item>*/}
            {/*            </Menu.Dropdown>*/}
            {/*        </Menu>*/}
            {/*    </Group>*/}
            {/*</Group>*/}
        </>
    );
}
