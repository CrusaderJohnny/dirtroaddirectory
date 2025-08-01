import {AppShell, AppShellHeader, AppShellMain, Center, Title, Text, AppShellFooter, Button} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import {SearchUsers} from "@/app/_components/admincomps/searchUsers";
import DisplayUsers from "@/app/_components/admincomps/displayUsers";
import {clerkClient} from "@clerk/nextjs/server";

export default async function Page(params: {searchParams: Promise<{search?: string}>}) {
    const query = (await params.searchParams).search;
    const client = await clerkClient();
    const users = query ? (await client.users.getUserList({ query })).data : [];
    return (
        <AppShell>
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <Title ta={'center'} p={'1rem'}>
                 Add or Modify a vendor
                </Title>
                <Center>
                    <SearchUsers searchName={'Vendor'}/>
                </Center>
                {!query ? (
                    <Center pt={'2rem'}>
                        <Text>
                            Search for a Vendor
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
                            <DisplayUsers users={users} searchType={'Vendor'}/>
                        </Center>
                    )
                    )}
            </AppShellMain>
            <AppShellFooter>
                <Center>
                    <Button variant={'light'} component={'a'} href={'/admin'}>
                        Return to Admin Page
                    </Button>
                </Center>
            </AppShellFooter>
        </AppShell>
    )
}