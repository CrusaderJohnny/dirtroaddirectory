import Link from 'next/link';
import {Avatar, Button, Group, Image, Modal, ScrollArea, Title} from '@mantine/core';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import UserLoginModal from "@/app/_components/navcomps/UserLoginModal";
import {IconUser} from "@tabler/icons-react";

export default function HeaderLarge() {
    const [opened, { open, close }] = useDisclosure(false);
    const isMobile = useMediaQuery('(max-width: 20rem)');
    const {  user } = useUser();
    const isAdmin = user?.publicMetadata?.role === 'admin';
    return (
        <Group justify="space-between" w="100%" style={{ flexWrap: 'nowrap' }}>
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
                    <Title order={1} c="white">
                        Dirt Road Directory
                    </Title>
                </Group>
            </Link>

            <Group gap="md">
                <Button component="a" href="/markets" variant="subtle" color="white" size="lg">
                    Markets
                </Button>
                <Button component="a" href="/vendors" variant="subtle" color="white" size="lg">
                    Vendors
                </Button>
                <Button component="a" href="/map" variant="subtle" color="white" size="lg">
                    Market Map
                </Button>
                <Button component="a" href="/aboutus" variant="subtle" color="white" size="lg">
                    About Us
                </Button>
                <Button component="a" href="/contact" variant="subtle" color="white" size="lg">
                    Contact
                </Button>
            </Group>

            {/*The Admin Panel*/}
            {isAdmin && (
            <Group>
                <Button
                    component="a"
                    href="/admin"
                    variant="outline"
                    color="white"
                    size="xs"
                    style={{
                        backgroundColor: "#ff7070",
                    }}
                >
                    Admin Panel
                </Button>
            </Group>
            )}

            <Group>
                <SignedOut>
                <Button
                    component="a"
                    onClick={open}
                    variant="outline"
                    color="white"
                    size="xs"
                    style={{
                        backgroundColor: "#2f9e44"
                    }}
                >
                    <Avatar
                        // onClick={open}
                        radius="xl"
                        size="xs"
                        color="white"
                        style={{
                            backgroundColor: '#ffc2c2',
                        }}
                    >
                        <IconUser size={14} />
                    </Avatar>
                    <Title pl="sm" order={6}>Accounts</Title>
                </Button>
                </SignedOut>
                <SignedIn>
                    <Button component="a" href="/userfavs" variant="subtle" c="white" size="lg">
                        Favs
                    </Button>
                    <UserButton />
                </SignedIn>
            </Group>
        </Group>
    );
}
