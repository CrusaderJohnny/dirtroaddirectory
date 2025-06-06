"use client"
import { useState, useEffect } from 'react';
import { Title, Flex, Container, ScrollArea, useMantineTheme } from '@mantine/core';
import CurrentUpdate from "./currentUpdate";
import UpdateList from "./updateList";
import ContactOrNewPost from "./contactOr-newPost";
import { updateList, UpdateArticle } from "./types";


export default function NewsPage() {
    const theme = useMantineTheme()

    const [isAdmin, setIsAdmin] = useState(false);
    // State to hold the currently selected update article
    const [selectedUpdate, setSelectedUpdate] = useState<UpdateArticle | null>(null);

    useEffect(() => {
        // Set the first update as the default selected update when the component mounts
        if (updateList.length > 0) {
            setSelectedUpdate(updateList[0]);
        }

        // Temp delete and replace later
        setTimeout(() => {
            setIsAdmin(true);
        }, 1000000);
    }, []);

    // Function to handle when an update card is clicked
    const handleUpdateClick = (update: UpdateArticle) => {
        setSelectedUpdate(update);
    };

    return (
        <>
            <Flex
                style={{
                    height: '93vh',
                    paddingTop: '1vh',
                    background: `linear-gradient(to right, ${theme.colors.gray[3]}, ${theme.colors.gray[6]})`,
                }}
            >
                {/*<Box>*/}

                {/* Box for current currentUpdate.js */}
                <Flex
                    align="center"
                    direction="column"
                    justify="space-around"
                    gap={'sm'}

                    style={{ width: '100%' }}
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
                        <CurrentUpdate update={selectedUpdate} />
                    </ScrollArea>

                    <Container
                        style={{
                            width: '90%',
                            height: '10%',
                        }}
                    >
                        <ContactOrNewPost isAdmin={isAdmin} />
                    </Container>
                </Flex>
                {/*</Box>*/}

                {/* Box for updatesList.js */}
                <Container
                    style={{
                        width: '25%',
                    }}
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
                        <UpdateList updateList={updateList} onUpdateClick={handleUpdateClick} />
                    </ScrollArea>
                </Container>
            </Flex>
        </>

    );
}

