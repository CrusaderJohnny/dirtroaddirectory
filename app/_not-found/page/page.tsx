import {AppShell, AppShellHeader, AppShellMain, Card, Center, Text} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";

export default function Page() {
    return(
        <AppShell>
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <Center>
                    <Card>
                        <Text>
                            Page not found!
                        </Text>
                    </Card>
                </Center>
            </AppShellMain>
        </AppShell>
    )
}