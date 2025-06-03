"use client"
import { useState, useEffect } from 'react';
import { Title, Flex, Center, Container, ScrollArea, useMantineTheme } from '@mantine/core';
import CurrentUpdate from "./currentUpdate";
import UpdateList from "./updateList";
import ContactOrNewPost from "./contactOr-newPost";


export default function NewsPage() {
    const theme = useMantineTheme()

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setIsAdmin(true);
      }, 10000);
    }, []);

    return(
        <>
            <Center>
                <Title
                    order={2}
                    c="Black"
                >
                    What&#39;s New!
                </Title>
            </Center>
            <Flex
                style={{
                    minHeight: '80vh',
                    height: '80vh',
                }}
            >
                {/* Box for current currentUpdate.js */}
                <Flex
                    justify="center"
                    align="center"
                    direction="column"
                    gap={"lg"}
                    style={{width: '100%'}}
                >
                    <ScrollArea
                        h={500}
                        style={{
                            width: '100%',
                            backgroundColor: theme.colors.gray[5],
                            borderRadius: '5%',
                            padding: '2%',
                            height: '70%',
                            maxWidth: '80%',
                            maxHeight: '75%',
                        }}
                    >
                        <CurrentUpdate />
                    </ScrollArea>

                    <ScrollArea
                        style={{
                            width: '100%',
                            backgroundColor: theme.colors.gray[5],
                            borderRadius: '1%',
                            // padding: '2%',
                            height: '10%',
                            maxWidth: '30%',
                            maxHeight: '150%',
                        }}
                    >
                        <ContactOrNewPost isAdmin={isAdmin} />
                    </ScrollArea>
                </Flex>

                {/* Box for updatesList.js */}
                <ScrollArea
                    style={{
                        width: '25%',
                        borderRadius: '5%',
                        backgroundColor: theme.colors.gray[5],
                        padding: '2%',
                        marginRight: '2%',
                        maxWidth: '20%',
                        height: '90%',
                        maxHeight: '90%',
                    }}
                >
                    <UpdateList />
                </ScrollArea>
            </Flex>
        </>

    );
}

