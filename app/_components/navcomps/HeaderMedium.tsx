import Link from 'next/link';
import {Button, Group, Image, Title, Burger, Menu, Text, ScrollArea, Modal} from '@mantine/core';
import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from '@clerk/nextjs';
import UserLoginModal from "@/app/_components/navcomps/UserLoginModal";
import {useDisclosure, useMediaQuery} from "@mantine/hooks";

import {
    IconApple,
    IconBuildingStore,
    IconHeartStar,
    IconHelpHexagon, IconMailbox,
    IconMapRoute,
    IconUser
} from "@tabler/icons-react";

export default function HeaderMedium() {
    const [opened, {open, close}] = useDisclosure(false);
    const isMobile = useMediaQuery('(max-width: 20rem) ');
    return (
        // Test one tried adding "style={{ flexWrap: 'nowrap' }}" to main-group to stop it from wrapping
        <Group justify="space-between" w="100%" style={{flexWrap: 'nowrap'}}>
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

            <Group>
                <Menu position="bottom-start">
                    <Menu.Target>
                        <Button
                            component="a"
                            variant="outline"
                            color="white"
                            size="xs"
                            style={{
                                backgroundColor: "#2f9e44"
                            }}
                        >
                            <Burger color="white" size="sm"/>
                            <Text pl="sm">Pages</Text>
                        </Button>
                    </Menu.Target>
                    {/*Drop down menu options*/}
                    <Menu.Dropdown>
                        <SignedOut>
                            <Menu.Item
                                component="button"
                                onClick={open}
                                leftSection={<IconUser size={14}/>}
                                color="blue"
                            >
                                User Account
                            </Menu.Item>
                        </SignedOut>
                        <SignedIn>
                            <Menu.Item
                                leftSection={<IconHeartStar size={14}/>}
                                color="blue"
                                component="a"
                                href="/userfavs"
                            >
                                Favorites
                            </Menu.Item>
                        </SignedIn>

                        <Menu.Divider/>
                        <Menu.Label>Pages</Menu.Label>
                        <Menu.Item
                            leftSection={<IconApple size={14}/>}
                            component="a"
                            href="/markets"
                        >
                            Markets
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconBuildingStore size={14}/>}
                            component="a"
                            href="/vendors"
                        >
                            Vendors
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconMapRoute size={14}/>}
                            component="a"
                            href="/map"
                        >
                            Market Map
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconHelpHexagon size={14}/>}
                            component="a"
                            href="/aboutus"
                        >
                            About Us
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconMailbox size={14}/>}
                            component="a"
                            href="/contact"
                        >
                            Contact
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>

                <Group>
                    <Button
                        component="a"
                        href="/admin"
                        variant="outline"
                        color="white"
                        size="xs"
                        style={{
                            backgroundColor: "#ff7070"
                        }}
                    >
                        Admin Panel
                    </Button>
                </Group>
            </Group>
        </Group>
    );
}
