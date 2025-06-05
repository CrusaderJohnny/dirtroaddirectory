"use client"
import { useState, useEffect } from 'react';
import { Title, Flex, Box, Center, Container, ScrollArea, useMantineTheme } from '@mantine/core';
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
            <Flex
                style={{
                    minHeight: '80vh',
                    height: '80vh',
                    paddingTop: '5vh',
                }}
            >
                {/*<Box>*/}

                {/* Box for current currentUpdate.js */}
                <Flex
                    justify="center"
                    align="center"
                    direction="column"
                    gap={"lg"}

                    style={{width: '100%'}}
                >
                    <Title
                        order={2}
                        ml={'10%'}

                        style={{
                            // fontFamily: 'Montserrat', Articles?
                            fontFamily: 'Monospace',
                            alignSelf: 'flex-start',


                        }}
                    >
                        What&#39;s New with local farmers markets!
                    </Title>

                    <ScrollArea
                        h={500}
                        style={{
                            width: '80%',
                            // backgroundColor: theme.colors.gray[5],
                            // borderRadius: '5%',
                            padding: '1.5%',
                            height: '70%',
                            // background: `linear-gradient(to right, ${theme.colors.gray[6]}, ${theme.colors.gray[5]})`,
                            borderTop: '3px solid #8B4513',
                            // borderLeft: '3px solid #8B4513',
                            // borderRight: '3px solid #D2B48C',
                            borderBottom: '3px solid #D2B48C',
                        }}
                    >
                        <CurrentUpdate />
                    </ScrollArea>

                    <ScrollArea
                        style={{
                            width: '100%',
                            // backgroundColor: theme.colors.gray[5],
                            // borderRadius: '1%',
                            // background: `linear-gradient(to right, ${theme.colors.gray[6]}, ${theme.colors.gray[5]})`,
                            height: '10%',
                            maxWidth: '30%',
                            maxHeight: '150%',
                        }}
                    >
                        <ContactOrNewPost isAdmin={isAdmin} />
                    </ScrollArea>
                </Flex>
                {/*</Box>*/}

                {/* Box for updatesList.js */}
                <ScrollArea
                    style={{
                        width: '25%',
                        // borderRadius: '5%',
                        // background: `linear-gradient(to right, ${theme.colors.gray[6]}, ${theme.colors.gray[5]})`,
                        padding: '1.5%',
                        marginRight: '2%',
                        height: '90%',
                        borderTop: '3px solid #8B4513',
                        // borderLeft: '3px solid #8B4513',
                        // borderRight: '3px solid #D2B48C',
                        borderBottom: '3px solid #D2B48C',

                    }}
                >
                    <UpdateList />
                </ScrollArea>
            </Flex>
        </>

    );
}

