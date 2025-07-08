import {AppShell, AppShellHeader, AppShellMain, Text} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";

export default function Page() {
    return (
        <AppShell>
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <Text>
                    Add Market Page
                </Text>
            </AppShellMain>
        </AppShell>
    )
}