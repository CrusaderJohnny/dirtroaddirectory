import Link from 'next/link';
import { Button, Group, Image, Title, Burger, Menu, ScrollArea, Modal, Avatar } from '@mantine/core';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import UserLoginModal from '@/app/_components/navcomps/UserLoginModal';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
    IconApple,
    IconBuildingStore,
    IconHelpHexagon,
    IconMailbox,
    IconMapRoute,
    IconUser,
    IconHeartStar,
    IconLockCode,
} from '@tabler/icons-react';

export default function HeaderMedium() {
    const [opened, { open, close }] = useDisclosure(false);
    const isMobile = useMediaQuery('(max-width: 20rem)');
    const { user } = useUser();
    const isAdmin = user?.publicMetadata?.role === 'admin';

    return (
        <Group justify="space-between" w="100%" style={{ flexWrap: 'nowrap' }}>
            <Modal
                opened={opened}
                onClose={close}
                withCloseButton={false}
                centered
                padding={0}
                scrollAreaComponent={ScrollArea.Autosize}
                fullScreen={isMobile}
                style={{ body: { backgroundColor: 'transparent' } }}
                size="20rem"
                overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
            >
                <UserLoginModal />
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
                            <span style={{ fontSize: '2.5rem', verticalAlign: 'middle' }}>D</span>
                            <span style={{ fontSize: '1.5rem' }}>irt</span>
                        </Title>
                        <Title order={2} c="white">
                            <span style={{ fontSize: '2.5rem', verticalAlign: 'middle' }}>R</span>
                            <span style={{ fontSize: '1.5rem' }}>oad</span>
                        </Title>
                        <Title order={2} c="white">
                            <span style={{ fontSize: '2.5rem', verticalAlign: 'middle' }}>D</span>
                            <span style={{ fontSize: '1.5rem' }}>irectory</span>
                        </Title>
                    </Group>
                </Group>
            </Link>

            <Group>
                {/* Admin button space reserved */}
                <div style={{ visibility: isAdmin ? 'visible' : 'hidden' }}>
                    <Button
                        component="a"
                        href="/admin"
                        variant="outline"
                        color="white"
                        size="xs"
                        style={{ backgroundColor: '#ff7070' }}
                    >
                        <Avatar
                            variant="subtle"
                            radius="xl"
                            color="green"
                            size="xs"
                            style={{ backgroundColor: '#ffc2c2' }}
                        >
                            <IconLockCode size={14} />
                        </Avatar>
                        <Title pl="sm" order={6}>Admin Panel</Title>
                    </Button>
                </div>

                {/* Auth controls */}
                <UserButton />

                <Menu position="bottom-start">
                    <Menu.Target>
                        <Button
                            component="a"
                            variant="outline"
                            color="white"
                            size="xs"
                            style={{ backgroundColor: '#2f9e44' }}
                        >
                            <Burger color="white" size="xs" />
                            <Title pl="sm" order={6}>Pages</Title>
                        </Button>
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
                        <Menu.Item leftSection={<IconApple size={14} />} component="a" href="/markets">
                            Markets
                        </Menu.Item>
                        <Menu.Item leftSection={<IconBuildingStore size={14} />} component="a" href="/vendors">
                            Vendors
                        </Menu.Item>
                        <Menu.Item leftSection={<IconMapRoute size={14} />} component="a" href="/map">
                            Market Map
                        </Menu.Item>
                        <Menu.Item leftSection={<IconHelpHexagon size={14} />} component="a" href="/aboutus">
                            About Us
                        </Menu.Item>
                        <Menu.Item leftSection={<IconMailbox size={14} />} component="a" href="/contact">
                            Contact
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Group>
    );
}
