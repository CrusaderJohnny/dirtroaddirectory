import {checkRole} from '@/_utils/roles'
import {currentUser} from '@clerk/nextjs/server'
import NavMT from "@/app/_components/navcomps/navmt";
import {
    AppShell, AppShellFooter,
    AppShellHeader,
    AppShellMain,
    Button,
    Center,
    Group,
    Title, Container, Card, Text, Stack
} from "@mantine/core";
import Link from "next/link";
import {checkMarket} from "@/_utils/checkMarket";
import {checkVendor} from "@/_utils/checkVendor";

export default async function AdminDashboard() {
    const hasMarketAccess = await checkMarket();
    const hasVendorAccess = await checkVendor();
    const isAdmin = await checkRole('admin');
    const user = await currentUser();

    function titleFix(str: string | null | undefined): string {
        if (!str) {
            return '';
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const displayName = titleFix(user?.username || user?.firstName);

    return (
        <AppShell>
            <AppShellHeader>
                <NavMT/>
            </AppShellHeader>
            <AppShellMain style={{minHeight: '100vh'}}>
                <Container size="lg" py="xl">
                    <Title ta="center" order={2} mb="lg">
                        Welcome to the Admin Dashboard, {displayName}!
                    </Title>

                    <Center>
                        <Stack>
                            <Group>
                                <Card
                                    bg={'#d0f2da'}
                                    title="Modify Vendor"
                                    w={'20rem'}
                                    component='a'
                                    href={'/admin/add-vendor'}
                                >
                                    <Center>
                                        <Text fw={500}>Add or modify a vendor user</Text>
                                    </Center>
                                </Card>
                                <Card
                                    bg={'#d0f2da'}
                                    title="Modify Market"
                                    w={'20rem'}
                                    component='a'
                                    href={'/admin/add-market'}>
                                    <Center>
                                        <Text fw={500}>Add or modify a market user</Text>
                                    </Center>
                                </Card>
                            </Group>
                            <Group>
                                <Card
                                    bg={'#d0f2da'}
                                    title="Admin Post"
                                    w={'20rem'}
                                    component='a'
                                    href={'/admin/add-post'}
                                >
                                    <Center>
                                        <Text fw={500}>Make a post as an admin</Text>
                                    </Center>
                                </Card>
                                <Card
                                    bg={'#d0f2da'}
                                    title="Messages"
                                    w={'20rem'}
                                    component='a'
                                    href={'/admin/messages'}
                                >
                                    <Center>
                                        <Text fw={500}>View Messages</Text>
                                    </Center>
                                </Card>
                            </Group>
                            <Group>
                                <Card
                                    bg={'#d0f2da'}
                                    title="Admin Role Panel"
                                    w={'20rem'}
                                    component='a'
                                    href={'/admin/add-roles'}
                                >
                                    <Center>
                                        <Text fw={500}>Modify admin roles</Text>
                                    </Center>
                                </Card>
                                <Card
                                    bg={'#d0f2da'}
                                    title="Admin Analytics Dashboard"
                                    w={'20rem'}
                                    component='a'
                                    href={'/admin/analytics-board'}
                                >
                                    <Center>
                                        <Text fw={500}>View Website Analytics</Text>
                                    </Center>
                                </Card>
                            </Group>
                            <Group>
                                <Card
                                    bg={'#d0f2da'}
                                    title="Admin Role Panel"
                                    w={'20rem'}
                                    component='a'
                                    href={'/admin/create-vendor'}
                                >
                                    <Center>
                                        <Text fw={500}>Create new or edit Vendor</Text>
                                    </Center>
                                </Card>
                                <Card
                                    bg={'#d0f2da'}
                                    title="Admin Analytics Dashboard"
                                    w={'20rem'}
                                    component='a'
                                    href={'/admin/create-market'}
                                >
                                    <Center>
                                        <Text fw={500}>Create new or edit Market</Text>
                                    </Center>
                                </Card>
                            </Group>
                            <Group>
                                <Card
                                    bg={'#d0f2da'}
                                    title="Shazbot Test"
                                    w={'20rem'}
                                    component='a'
                                    href={'/admin/chatTest'}
                                >
                                    <Center>
                                        <Text fw={500}>Shazbot Test</Text>
                                    </Center>
                                </Card>
                                {/*<Card*/}
                                {/*    bg={'#d0f2da'}*/}
                                {/*    title="Admin Analytics Dashboard"*/}
                                {/*    w={'20rem'}*/}
                                {/*    component='a'*/}
                                {/*    href={'/admin/create-market'}*/}
                                {/*>*/}
                                {/*    <Center>*/}
                                {/*        <Text fw={500}>Create new or edit Market</Text>*/}
                                {/*    </Center>*/}
                                {/*</Card>*/}
                            </Group>
                        </Stack>
                    </Center>
                </Container>
            </AppShellMain>

            <AppShellFooter style={{backgroundColor: '#fff', padding: '1rem 0'}}>
                <Center>
                    <Group>
                        {hasMarketAccess && (
                            <Button component={Link} href="/post-market" variant="light">
                                Market Post
                            </Button>
                        )}
                        {hasVendorAccess && (
                            <Button component={Link} href="/post-vendor" variant="light">
                                Vendor Post
                            </Button>
                        )}
                        {isAdmin && (
                            <>
                                <Button component={Link} href="/post-admin" variant="light">
                                    Admin Post
                                </Button>
                                <Button component={Link} href="/contact-form-messages" variant="light">
                                    Contact Messages
                                </Button>
                            </>
                        )}
                    </Group>
                </Center>
            </AppShellFooter>
        </AppShell>
    );
}
