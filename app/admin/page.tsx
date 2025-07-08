import { redirect } from 'next/navigation'
import { checkRole } from '@/utils/roles'
import { SearchUsers } from '../_components/admincomps/searchUsers'
import { clerkClient, currentUser } from '@clerk/nextjs/server'
import NavMT from "@/app/_components/navcomps/navmt";
import {
    AppShell, AppShellFooter,
    AppShellHeader,
    AppShellMain,
    Button,
    Center,
    Group,
    Title, Container, Card, Text
} from "@mantine/core";
import Link from "next/link";
import { checkMarket } from "@/utils/checkMarket";
import { checkVendor } from "@/utils/checkVendor";
import DisplayUsers from "@/app/_components/admincomps/displayUsers";

export default async function AdminDashboard(params: {
    searchParams: Promise<{ search?: string }>
}) {
    if (!await checkRole('admin')) {
        redirect('/')
    }

    const query = (await params.searchParams).search
    const client = await clerkClient()
    const users = query ? (await client.users.getUserList({ query })).data : []
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
                <NavMT />
            </AppShellHeader>

            <AppShellMain style={{ minHeight: '100vh' }}>
                <Container size="lg" py="xl">
                    <Title ta="center" order={2} mb="lg">
                        Welcome to the Admin Dashboard, {displayName}!
                    </Title>

                    <Group>
                        <Card title="Modify Vendor"
                              w={'20rem'}
                            component='a'
                              href={'/admin/add-vendor'}
                        >
                            <Text>Add or modify a vendor</Text>
                        </Card>
                        <Card title="Modify Market"
                        w={'20rem'}
                        component='a'
                        href={'/admin/add-market'}>
                            <Text>Add or modify a market</Text>
                        </Card>
                    </Group>

                    {/*<Center mb={'md'}>*/}
                    {/*        <SearchUsers />*/}
                    {/*</Center>*/}
                    {/*{users && (*/}
                    {/*    <DisplayUsers users={users}/>*/}
                    {/*)}*/}
                </Container>
            </AppShellMain>

            <AppShellFooter style={{ backgroundColor: '#fff', padding: '1rem 0' }}>
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
