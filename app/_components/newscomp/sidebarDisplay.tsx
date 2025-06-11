import {AppShell, Center, Container, ScrollArea, Title} from "@mantine/core";
import UpdateList from "@/app/_components/newscomp/updateList";
import Board from "@/app/_components/tiktaktoe/board";

export default function SidebarDisplay() {
    return (
        <AppShell>
            {/* Box for updatesList.js */}
            <AppShell.Navbar
            >
                <Title
                    order={2}
                    ml={'10%'}
                    style={{
                        fontFamily: 'Monospace',
                        alignSelf: 'flex-start',
                    }}
                >
                    Top Updates
                </Title>

                <ScrollArea
                    style={{
                        padding: '1.5%',
                        marginRight: '2%',
                        height: '90%',
                        borderTop: '3px solid #8B4513',
                        borderBottom: '3px solid #D2B48C',

                    }}
                >
                    <UpdateList/>
                    <Center>
                        <Container>
                            <Board/>
                        </Container>
                    </Center>
                </ScrollArea>
            </AppShell.Navbar>
        </AppShell>
    )
}