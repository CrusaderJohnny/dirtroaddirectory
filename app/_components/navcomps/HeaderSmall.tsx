import {
    Modal,
    Image,
    Title,
    Menu,
    Burger,
    Flex,
    Avatar,
    ScrollArea,
    Tooltip,
    Group
} from "@mantine/core";

import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import UserLoginModal from "@/app/_components/navcomps/UserLoginModal";
import Link from "next/link";
import {
    SignedIn,
    SignedOut,
    UserButton,
    useUser
} from "@clerk/nextjs";

import {
    IconApple,
    IconBuildingStore,
    IconMapRoute,
    IconHelpHexagon,
    IconMailbox,
    IconUser,
    IconLockCode,
    IconHeartStar
} from '@tabler/icons-react';

export default function HeaderSmall() {
    const [opened, { open, close }] = useDisclosure(false);
    const isMobile = useMediaQuery('(max-width: 20rem)');
    const { user } = useUser();

    const isAdmin = user?.publicMetadata?.role === 'admin';

    return (
        <>
            {/* Modal for login */}
            <Modal
                opened={opened}
                onClose={close}
                withCloseButton={false}
                centered
                padding={0}
                scrollAreaComponent={ScrollArea.Autosize}
                fullScreen={isMobile}
                style={{
                    body: {
                        backgroundColor: 'transparent'
                    }
                }}
                size="20rem"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3
                }}
            >
                <UserLoginModal />
            </Modal>

            <Flex w="100%" justify="space-between">
                {/* Logo and Title */}
                <Group>
                    <Link href="/">
                        <Flex align="center">
                            <Image
                                src="https://media.istockphoto.com/id/1170724138/vector/farmers-market-hand-drawn-lettering.jpg?s=1024x1024&w=is&k=20&c=EI--kDMvBM9pvC9jFJcaoepQHcDbTxp-De6fgIVqy_8="
                                h={40}
                                fit="contain"
                                radius="md"
                                alt="Farmers Market Logo"
                                mr="sm"
                            />
                            <Title order={1} c="white">
                                DRD
                            </Title>
                        </Flex>
                    </Link>
                </Group>

                {/* Right-side controls */}
                <Group>
                    {/* Admin Icon - Only show if user is admin */}
                    {isAdmin && (
                        <Tooltip label="Admin Panel">
                            <Avatar
                                component="a"
                                href="/admin"
                                variant="subtle"
                                radius="xl"
                                color="green"
                                size="sm"
                                style={{
                                    backgroundColor: '#ffc2c2'
                                }}
                            >
                                <IconLockCode size={14} />
                            </Avatar>
                        </Tooltip>
                    )}

                    {/* Signed-out Avatar */}
                    <SignedOut>
                        <Tooltip label="Accounts">
                            <Avatar
                                component="button"
                                onClick={open}
                                radius="xl"
                                size="sm"
                                color="green"
                            >
                                <IconUser size={14} />
                            </Avatar>
                        </Tooltip>
                    </SignedOut>
                    {/* Clerk User Menu */}
                    <UserButton />

                    {/* Hamburger Menu */}
                    <Menu>
                        <Menu.Target>
                            <Burger color="white" />
                        </Menu.Target>
                        <Menu.Dropdown>
                            <SignedOut>
                                <Menu.Item
                                    component="button"
                                    onClick={open}
                                    leftSection={<IconUser size={14} />}
                                    color="blue"
                                >
                                    User Account
                                </Menu.Item>
                            </SignedOut>
                            <SignedIn>
                                <Menu.Item
                                    leftSection={<IconHeartStar size={14} />}
                                    color="blue"
                                    component="a"
                                    href="/userfavs"
                                >
                                    Favorites
                                </Menu.Item>
                            </SignedIn>

                            <Menu.Divider />
                            <Menu.Label>Pages</Menu.Label>
                            <Menu.Item
                                leftSection={<IconApple size={14} />}
                                component="a"
                                href="/markets"
                            >
                                Markets
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconBuildingStore size={14} />}
                                component="a"
                                href="/vendors"
                            >
                                Vendors
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconMapRoute size={14} />}
                                component="a"
                                href="/map"
                            >
                                Market Map
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconHelpHexagon size={14} />}
                                component="a"
                                href="/aboutus"
                            >
                                About Us
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconMailbox size={14} />}
                                component="a"
                                href="/contact"
                            >
                                Contact
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Flex>
        </>
    );
}
