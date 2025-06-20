import { redirect } from 'next/navigation'
import { checkRole } from '@/utils/roles'
import { SearchUsers } from '../_components/admincomps/searchUsers'
import { clerkClient, currentUser, EmailAddress } from '@clerk/nextjs/server'
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
    Text, Title, Container, Box
} from "@mantine/core";
import Link from "next/link";
import { checkMarket } from "@/utils/checkMarket";
import { checkVendor } from "@/utils/checkVendor";
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

            <AppShellMain style={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
                <Container size="lg" py="xl">
                    <Title ta="center" order={2} mb="lg">
                        Welcome to the Admin Dashboard, {displayName}!
                    </Title>

                    <Box mb="xl">
                        <SearchUsers />
                    </Box>

                    <Stack gap="lg">
                        {users.map((user) => (
                            <Card
                                key={user.id}
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                style={{ backgroundColor: "#ffffff" }}
                            >
                                <Flex justify="space-between" align="flex-start" wrap="wrap">
                                    <Stack gap="xs">
                                        <Group>
                                            <Text fw={600}>Username:</Text>
                                            <Text>{user.firstName} {user.lastName}</Text>
                                        </Group>
                                        <Group>
                                            <Text fw={600}>Email:</Text>
                                            <Text>
                                                {
                                                    user.emailAddresses.find(
                                                        (email: EmailAddress) =>
                                                            email.id === user.primaryEmailAddressId
                                                    )?.emailAddress
                                                }
                                            </Text>
                                        </Group>
                                        <Group>
                                            <Text fw={600}>Role:</Text>
                                            <Text>{user.publicMetadata.role as string}</Text>
                                        </Group>
                                    </Stack>
                                    <UserRoleActions userId={user.id} />
                                </Flex>
                            </Card>
                        ))}
                    </Stack>
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
