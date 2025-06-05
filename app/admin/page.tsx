import { redirect } from 'next/navigation'
import { checkRole } from '@/utils/roles'
import { SearchUsers } from './searchUsers'
import {clerkClient, EmailAddress} from '@clerk/nextjs/server'
import { removeRole, setRole } from './_actions'
import NavMT from "@/app/_components/navcomps/navmt";
import {
    AppShell,
    AppShellHeader,
    AppShellMain,
    Button,
    Card,
    Center,
    Flex,
    Group,
    Stack,
    Text
} from "@mantine/core";

export default async function AdminDashboard(params: {
    searchParams: Promise<{ search?: string }>
}) {
    if (!checkRole('admin')) {
        redirect('/')
    }

    const query = (await params.searchParams).search

    const client = await clerkClient()

    const users = query ? (await client.users.getUserList({ query })).data : []

    return (
        <AppShell>
            <AppShellHeader>
                <NavMT/>
            </AppShellHeader>
            <AppShellMain>
                <Center>
                    <Text>
                        This is a protected admin dashboard. Assign user roles with the search function.
                    </Text>
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
                                <Stack>
                                    <Button formAction={setRole}>
                                        <input type="hidden" value={user.id} name="id"/>
                                        <input type="hidden" value="admin" name="role"/>
                                        Make Admin
                                    </Button>
                                    <Button formAction={setRole}>
                                        <input type="hidden" value={user.id} name="id"/>
                                        <input type="hidden" value="moderator" name="role"/>
                                        Make Moderator
                                    </Button>
                                    <Button formAction={removeRole}>
                                        <input type="hidden" value={user.id} name="id"/>
                                        Remove Role
                                    </Button>
                                </Stack>
                                </Group>
                            </Card>
                        )
                    })}
                </Center>
            </AppShellMain>
        </AppShell>
    )
}