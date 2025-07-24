import {AppShell, AppShellFooter, AppShellHeader, AppShellMain, Button, Center, Text, Title} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import {clerkClient} from "@clerk/nextjs/server";
import CreateVendorForm from "@/app/_components/admincomps/db_management/create_vendor_form";

export default async function Page(params: {searchParams: Promise<{search?: string}>}) {

    // Left these here for now, please figure out what they're for
    const query = (await params.searchParams).search
    const client = await clerkClient();
    const users = query ? (await client.users.getUserList({ query })).data : [];


    return (
        <AppShell>
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <Title ta={'center'} p={'1rem'}>
                    Create new or edit Vendor
                </Title>
                <Center>
                    <CreateVendorForm/>
                </Center>
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