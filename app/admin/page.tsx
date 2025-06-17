import { redirect } from 'next/navigation'
import { checkRole } from '@/utils/roles'
import { SearchUsers } from '../_components/admincomps/searchUsers'
import {clerkClient, currentUser, EmailAddress} from '@clerk/nextjs/server'
import NavMT from "@/app/_components/navcomps/navmt";
import {
    AppShell, AppShellFooter,
    AppShellHeader,
    AppShellMain,
    Button,
    Card,
    Center,
    Flex,
    Group,
    Stack,
    Text, Title
} from "@mantine/core";
import Link from "next/link";
import {checkMarket} from "@/utils/checkMarket";
import {checkVendor} from "@/utils/checkVendor";
import UserRoleActions from "@/app/_components/admincomps/userRoleActions";

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
        if(!str) {
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
            <AppShellMain>
                <Center>
                    <Title>
                        Welcome! To the Admin Dashboard {displayName}!
                    </Title>
                </Center>
                <Center p={20}>
                    <SearchUsers/>
                </Center>
                <Center>
                    {users.map((user) => {
                        return(
                            <Card shadow="lg" bg="lightgray" key={user.id}>
                                <Group>
                                    <Stack>
                                        <Flex>
                                            <Group>
                                                <Text>
                                                    Username:
                                                </Text>
                                                {user.firstName} {user.lastName}
                                            </Group>
                                        </Flex>
                                        <Flex>
                                            <Group>
                                                <Text>
                                                    Email:
                                                </Text>
                                                {
                                                    user.emailAddresses.find((email: EmailAddress) => email.id === user.primaryEmailAddressId)
                                                        ?.emailAddress
                                                }
                                            </Group>
                                        </Flex>
                                        <Flex>
                                            <Group>
                                                <Text>
                                                    Role:
                                                </Text>
                                                {user.publicMetadata.role as string}
                                            </Group>
                                        </Flex>
                                    </Stack>
                                    <UserRoleActions userId={user.id}/>
                                </Group>
                            </Card>
                        )
                    })}
                </Center>
            </AppShellMain>
            <AppShellFooter>
                <Center>
                    {hasMarketAccess && (
                        <Button
                            component={Link}
                            href="/post-market">
                            Market Post
                        </Button>
                    )}
                    {hasVendorAccess && (
                        <Button component={Link} href="/post-vendor">
                            Vendor Post
                        </Button>
                    )}
                    {isAdmin && (
                        <Button
                            component={Link}
                            href="post-admin">
                            Admin Post
                        </Button>
                    )}
                </Center>
            </AppShellFooter>
        </AppShell>
    )
}