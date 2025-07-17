import {AppShell, AppShellFooter, AppShellHeader, AppShellMain, Button, Center, Text, Title} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import {SearchUsers} from "@/app/_components/admincomps/searchUsers";
import DisplayUsers from "@/app/_components/admincomps/displayUsers";
import {clerkClient} from "@clerk/nextjs/server";

export default async function Page(params: {searchParams: Promise<{search?: string}>}) {
    const query = (await params.searchParams).search
    const client = await clerkClient();
    const users = query ? (await client.users.getUserList({ query })).data : [];
    return (
        <AppShell>
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <Title ta={'center'} p={'1rem'}>
                    Add or Modify a Market
                </Title>
                <Center>
                    <SearchUsers searchName={'Market'}/>
                </Center>
                {!query ? (
                    <Center pt={'2rem'}>
                        <Text>
                            Search for a Market
                        </Text>
                    </Center>
                ) : (
                    users.length === 0 ? (
                        <Center  pt={'2rem'}>
                            <Text>
                                No users found matching your search criteria
                            </Text>
                        </Center>
                    ) : (
                        <Center pt={'2rem'}>
                            <DisplayUsers users={users} searchType={'Market'}/>
                        </Center>
                    )
                )}
            </AppShellMain>
            <AppShellFooter>
                <Center>
                    <Button component={'a'} href={'/admin'}>
                        Return to Admin Page
                    </Button>
                </Center>
            </AppShellFooter>
        </AppShell>
    )
}