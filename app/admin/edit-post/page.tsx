import {AppShell, AppShellFooter, AppShellHeader, AppShellMain, Button, Center} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import ArticlePutForm from "@/app/_components/postmanagement/articlePutForm";

export default async function Page() {


    return (
        <AppShell>
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <Center pt={20}>
                    <ArticlePutForm />
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
    );
}
