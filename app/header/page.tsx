/*
    Author: Daniel Asefa
    Page: Demo Mantine header with nav on page
    This page is an example implementation of how many components can be placed around the page

    References:
    Used official Mantine Documentation for creating headers

*/

"use client"

import { AppShell, useMantineTheme, Container, Title, Text, Box } from '@mantine/core';
import NavMT from "@/app/_components/navcomps/navmt";
import BoxComp from "@/app/_components/othercomps/boxcomp";
import NewsPage from "@/app/news-page/page";



export default function MantineNavPage() {
    const theme = useMantineTheme()
    const headerHeightVh = 7;

    return (
        <>
            <AppShell
                header={{ height: '7vh' }}
                // style={{'height': '50%'}}
            >
                <NavMT />

                <AppShell.Main>
                    <Container
                        style={{
                            width: '1920px',
                            maxWidth: '100%',
                        }}
                    >

                        {/* Section 1 - Markets */}
                        <Box
                            id="section1"
                            style={{
                                minHeight: '86vh',
                                backgroundColor: theme.colors.green[3], // Color added to show size of Box (Delete later)
                                scrollMarginTop: `${headerHeightVh}vh`,
                            }}
                        >
                            <Title order={2}>Section 1: Markets</Title>
                            <Text>
                                This section is for testing Market Components
                            </Text>
                        </Box>

                        {/* Section 2 */}
                        <Box
                            id="section2"
                            style={{
                                minHeight: '86vh',
                                backgroundColor: theme.colors.green[0],
                                scrollMarginTop: `${headerHeightVh}vh`,
                            }}
                        >
                            {/* <Title order={2}>Section 2: Categories</Title> */}
                            <BoxComp />
                            {/* <Text>
                                This section is for testing Categories Components
                            </Text> */}
                        </Box>

                        {/* Section 3 */}
                        <Box
                            id="section3"
                            style={{
                                minHeight: '86vh',
                                backgroundColor: theme.colors.gray[4],
                                scrollMarginTop: `${headerHeightVh}vh`,
                            }}
                        >
                            <NewsPage />
                        </Box>

                        {/* Section 4 */}
                        <Box
                            id="section4"
                            style={{
                                minHeight: '86vh',
                                backgroundColor: theme.colors.green[0],
                                scrollMarginTop: `${headerHeightVh}vh`,
                            }}
                        >
                            <Title order={2}>Section 4: Vendors</Title>
                            <Text>
                                This section is for testing Vendor Components
                            </Text>
                        </Box>

                        {/* Section 5 */}
                        <Box
                            id="section5"
                            style={{
                                minHeight: '86vh',
                                backgroundColor: theme.colors.green[3],
                                scrollMarginTop: `${headerHeightVh}vh`,
                            }}
                        >
                            <Title order={2}>Section 5: Contact</Title>
                            <Text>
                                This section is for testing Contact Components
                            </Text>
                        </Box>
                    </Container>
                </AppShell.Main>

            </AppShell>
        </>
    );
}