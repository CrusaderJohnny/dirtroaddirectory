import {AppShell, AppShellHeader, AppShellMain, Center} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import VendorPostForm from "@/app/_components/postmanagement/vendorPostForm";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {checkVendor} from "@/_utils/checkVendor";

export default async function Page() {
    const user = await currentUser();
    if(!user) {
        redirect("/");
    }

    if(!checkVendor()) {
        redirect("/");
    }
    const vendorName = user?.publicMetadata?.vendorName as string || "";
    const userId = user.id;
    return (
        <AppShell>
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <Center pt={20}>
                    <VendorPostForm vendorName={vendorName} userId={userId}/>
                </Center>
            </AppShellMain>
        </AppShell>
    )
}