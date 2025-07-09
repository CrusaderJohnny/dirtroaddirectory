import {AppShell, AppShellHeader, AppShellMain, Center, Title} from "@mantine/core";
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
                <Center pt={'2rem'}>
                    <DisplayUsers users={users} searchType={'Market'}/>
                </Center>
            </AppShellMain>
        </AppShell>
    )
}