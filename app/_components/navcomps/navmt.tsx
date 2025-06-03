/*
Author: Daniel Asefa
website header using Mantine

References:



*/
"use client"
import { AppShell, useMantineTheme, Button, Group, BackgroundImage, Title, Image, Box } from '@mantine/core';

export default function NavMT() {

    const theme = useMantineTheme()

    return (
        <AppShell
        >
            <AppShell.Header>
                {/* main div containing the header */}
                <BackgroundImage src="https://letspasta.com/wp-content/uploads/2022/08/Alberta-farming.jpg"
                    style={{
                        //backgroundColor: theme.colors.red[6], // Use if color preferred over image (team not decided)
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 3vh',
                    }}
                >
                    {/* Header right side */}
                    <div
                        style={{
                            width: '25%',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Image
                            src='https://media.istockphoto.com/id/1170724138/vector/farmers-market-hand-drawn-lettering.jpg?s=1024x1024&w=is&k=20&c=EI--kDMvBM9pvC9jFJcaoepQHcDbTxp-De6fgIVqy_8='
                            h={40}
                            w='auto'
                            fit='contain'
                            radius='md'
                        />

                        <div>
                            <Title order={1} c='white'>
                                Market Fresh
                            </Title>
                        </div>
                    </div>

                    {/* Header let side where nav to sections of the page */}
                    <Group gap='md' >
                        <Button
                            component='a'
                            href='#section1'
                            variant='subtle'
                            color='white'
                            size='lg'
                        >
                            Markets
                        </Button>
                        <Button
                            component='a'
                            href='#section2'
                            variant='subtle'
                            color='white'
                            size='lg'
                        >
                            Categories
                        </Button>
                        <Button
                            component='a'
                            href='#section3'
                            variant='subtle'
                            color='white'
                            size='lg'
                        >
                            News
                        </Button>
                        <Button
                            component='a'
                            href='#section4'
                            variant='subtle'
                            color='white'
                            size='lg'
                        >
                            Vendors
                        </Button>
                        <Button
                            component='a'
                            href='#section5'
                            variant='subtle'
                            color='white'
                            size='lg'
                        >
                            Contact
                        </Button>
                    </Group>
                </BackgroundImage>

            </AppShell.Header>
        </AppShell>

    );
}