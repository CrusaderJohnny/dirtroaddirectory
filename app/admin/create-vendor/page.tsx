import {AppShell, AppShellFooter, AppShellHeader, AppShellMain, Button, Center, Title} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import CreateVendorForm from "@/app/_components/admincomps/db_management/create_vendor_form";

export default async function Page() {

    // Left these here for now, please figure out what they're for
    //const query = (await params.searchParams).search
    //const client = await clerkClient();
    //const users = query ? (await client.users.getUserList({ query })).data : [];


    return (
        <AppShell>
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <Title ta={'center'} p={'1rem'}>
                    Create New or Edit Vendor
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