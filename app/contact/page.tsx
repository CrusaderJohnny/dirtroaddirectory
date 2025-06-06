"use client";
import {AppShell, Card, Center, Container, Text, Title} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import Board from "@/app/_components/tiktaktoe/board";
import {useDisclosure} from "@mantine/hooks";

export default function Page() {
    const [opened] = useDisclosure();
    return (
        <AppShell
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: {mobile: !opened},
            }}
        >
            <AppShell.Header
                component={NavMT}/>
            <AppShell.Navbar>
                <Container pt={10}>
                    <Board/>
                </Container>
            </AppShell.Navbar>
            <AppShell.Main>
                <Card
                    shadow="md"
                    withBorder
                    padding="lg"
                >
                    <Card.Section p={10}>
                        <Center>
                            <Title>Questions?</Title>
                        </Center>
                    </Card.Section>
                    <Container>
                        <Text p={10}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar pretium elementum.
                            Sed quis sapien et elit fermentum eleifend. Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit. Quisque fermentum vestibulum mauris. Suspendisse vel nisl hendrerit,
                            viverra mauris ut, bibendum dui. Proin congue urna non massa rutrum blandit. Donec
                            ullamcorper, ipsum sed porttitor commodo, diam diam porttitor velit, vel fermentum augue
                            elit consectetur dui.
                        </Text>
                        <Card.Section p={10}>
                            <Center>
                                <Title>Are you a Farmers Market?</Title>
                            </Center>
                        </Card.Section>
                        <Text p={10}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar pretium elementum.
                            Sed quis sapien et elit fermentum eleifend. Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit. Quisque fermentum vestibulum mauris. Suspendisse vel nisl hendrerit,
                            viverra mauris ut, bibendum dui. Proin congue urna non massa rutrum blandit. Donec
                            ullamcorper, ipsum sed porttitor commodo, diam diam porttitor velit, vel fermentum augue
                            elit consectetur dui.
                        </Text>
                        <Card.Section p={10}>
                            <Center>
                                <Title>Are you a Vendor?</Title>
                            </Center>
                        </Card.Section>
                        <Text p={10}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar pretium elementum.
                            Sed quis sapien et elit fermentum eleifend. Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit. Quisque fermentum vestibulum mauris. Suspendisse vel nisl hendrerit,
                            viverra mauris ut, bibendum dui. Proin congue urna non massa rutrum blandit. Donec
                            ullamcorper, ipsum sed porttitor commodo, diam diam porttitor velit, vel fermentum augue
                            elit consectetur dui.
                        </Text>
                    </Container>
                </Card>
            </AppShell.Main>
        </AppShell>
    )
}