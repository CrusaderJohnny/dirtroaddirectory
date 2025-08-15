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
    Group,
} from "@mantine/core";
import {useDisclosure, useMediaQuery} from "@mantine/hooks";
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
// import {checkRole} from "@/_utils/roles";

export default function HeaderSmall() {
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

            <Flex w="100%" justify="space-between">
                <Group>
                    <Link href="/">
                        <Flex align="center">
                            <Image
                                src="https://media.istockphoto.com/id/1170724138/vector/farmers-market-hand-drawn-lettering.jpg?s=1024x1024&w=is&k=20&c=EI--kDMvBM9pvC9jFJcaoepQHcDbTxp-De6fgIVqy_8="
                                h={40}
                                w="auto"
                                fit="contain"
                                radius="md"
                                alt="Farmers Market Logo"
                            />
                            <Title order={1} c="white">
                                DRD
                            </Title>
                        </Flex>
                    </Link>
                </Group>

                <Group>
                    <SignedOut>
                        <Tooltip label="Accounts">
                            <Avatar
                                component="button"
                                onClick={open}
                                radius="xl"
                                size="sm"
                                color="green"
                            >
                                <IconUser size={14}/>
                            </Avatar>
                        </Tooltip>
                    </SignedOut>

                    <SignedIn>
                        {/*Basic user favs section*/}
                        {!isAdmin && (
                            <Tooltip label="Favorites">
                                <Avatar
                                    component="a"
                                    href="/userfavs"
                                    variant="subtle"
                                    radius="xl"
                                    color="green"
                                    size="sm"
                                    style={{backgroundColor: '#ffc2c2'}}
                                >
                                    <IconHeartStar size={14}/>
                                </Avatar>
                            </Tooltip>
                        )}

                        {/*Admin Panel Section*/}
                        {isAdmin && (
                            <Tooltip label="Admin Panel">
                                <Avatar
                                    component="a"
                                    href="/admin"
                                    variant="subtle"
                                    radius="xl"
                                    color="green"
                                    size="sm"
                                    style={{backgroundColor: '#ffc2c2'}}
                                >
                                    <IconLockCode size={14}/>
                                </Avatar>
                            </Tooltip>
                        )}
                        <UserButton/>
                    </SignedIn>

                    {/*Hamburger Menu*/}
                    <Menu>
                        <Menu.Target>
                            <Burger color="white"/>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Pages</Menu.Label>
                            <Menu.Item leftSection={<IconApple size={14}/>} component="a" href="/markets">
                                Markets
                            </Menu.Item>
                            <Menu.Item leftSection={<IconBuildingStore size={14}/>} component="a" href="/vendors">
                                Vendors
                            </Menu.Item>
                            <Menu.Item leftSection={<IconMapRoute size={14}/>} component="a" href="/map">
                                Market Map
                            </Menu.Item>
                            <Menu.Item leftSection={<IconHelpHexagon size={14}/>} component="a" href="/aboutus">
                                About Us
                            </Menu.Item>
                            <Menu.Item leftSection={<IconMailbox size={14}/>} component="a" href="/contact">
                                Contact
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Flex>
        </>
    );
}
