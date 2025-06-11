"use client"
import {useState, useEffect} from 'react';
import {Title, Flex, ScrollArea, useMantineTheme, AppShell} from '@mantine/core';
import CurrentUpdate from "./currentUpdate";
import ContactOrNewPost from "./contactOr-newPost";


export default function NewsPage() {
    const theme = useMantineTheme()

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsAdmin(true);
        }, 10000);
    }, []);

    return (
        <AppShell
        >
            <AppShell.Main
                style={{
                    // height: '93vh',
                    // paddingTop: '5vh',
                    background: `linear-gradient(to right, ${theme.colors.gray[4]}, ${theme.colors.gray[5]})`,
                }}
            >
                {/*<Box>*/}

                {/* Box for current currentUpdate.js */}
                <Flex
                    align="center"
                    direction="column"
                    justify="space-around"
                    gap={"lg"}

                    style={{width: '100%'}}
                >
                    <Title
                        order={2}
                        ml={'10%'}
                        style={{
                            fontFamily: 'Monospace',
                            alignSelf: 'flex-start',
                        }}
                    >
                        What&#39;s New with local farmers markets!
                    </Title>

                    <ScrollArea
                        h={600}
                        style={{
                            width: '80%',
                            padding: '1%',
                            borderTop: '3px solid #8B4513',
                            borderBottom: '3px solid #D2B48C',
                        }}
                    >
                        <CurrentUpdate/>
                    </ScrollArea>

                    <ScrollArea
                        style={{
                            width: '100%',
                            height: '10%',
                            maxWidth: '30%',
                            maxHeight: '150%',
                        }}
                    >
                        <ContactOrNewPost isAdmin={isAdmin}/>
                    </ScrollArea>
                </Flex>
                {/*</Box>*/}

                {/*/!* Box for updatesList.js *!/*/}
                {/*<Container*/}
                {/*    style={{*/}
                {/*        width: '25%',*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Title*/}
                {/*        order={2}*/}
                {/*        ml={'10%'}*/}
                {/*        style={{*/}
                {/*            fontFamily: 'Monospace',*/}
                {/*            alignSelf: 'flex-start',*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        Top Updates*/}
                {/*    </Title>*/}

                {/*    <ScrollArea*/}
                {/*        style={{*/}
                {/*            padding: '1.5%',*/}
                {/*            marginRight: '2%',*/}
                {/*            height: '90%',*/}
                {/*            borderTop: '3px solid #8B4513',*/}
                {/*            borderBottom: '3px solid #D2B48C',*/}

                {/*        }}*/}
                {/*    >*/}
                {/*        <UpdateList/>*/}
                {/*        <Center>*/}
                {/*            <Container>*/}
                {/*                <Board/>*/}
                {/*            </Container>*/}
                {/*        </Center>*/}
                {/*    </ScrollArea>*/}
                {/*</Container>*/}
            </AppShell.Main>
        </AppShell>

    );
}