"use client";
import {AppShell, Card, Container, Image, Text, Title, Grid, Divider, Space} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";

export default function Page() {
    return(
        <AppShell>
            <AppShell.Header
                component={NavMT}/>
            <AppShell.Main style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
                <Container size="xl" px={0}>
                <Card radius={0} withBorder style={{ position: "relative" }}>
                    <Image
                        radius="md"
                        h={300}
                        fit="cover"
                        src={"https://d27p2a3djqwgnt.cloudfront.net/wp-content/uploads/2024/05/15165226/dirt-road.jpeg"}
                        alt="Dirt Road Directory"/>
                    <Container size="md" style={{ position: "absolute", top: 100, left: 0, right: 0, textAlign: "center", color: "white" }}>
                        <Title order={1} fw={800} size="3rem"> Dirt Road Directory </Title>
                        <Text size="lg">Connecting Communities with Local Farmers Markets</Text>
                    </Container>
                </Card>
                </Container>

                <Container size="md" py="xl">
                    <Card shadow="sm" withBorder radius="md" p="lg" style={{ backgroundColor: "#ffffff" }}>
                        <Title order={2} ta="center" c="green.8" mb="sm"> About Us </Title>
                        <Divider my="sm" />
                        <Text size="md" c="gray.8" mb="md">
                            We are a group of students passionate about building a better connection between communities and local farmers.
                            This platform is our way of supporting Alberta’s local vendors and making it easier for people to shop fresh and local.
                        </Text>
                        <Text size="md" c="gray.8" mb="md">
                            Our directory helps you find markets close to you and see what’s available before visiting that means no more guessing or wasted trips.
                        </Text>
                        <Text size="md" c="gray.8">
                            Whether you're a shopper or a vendor, Dirt Road Directory is designed to make your local market experience more efficient and enjoyable.
                        </Text>
                    </Card>

                    <Space h="xl" />
                    
                    <Grid gutter="xl">
                        <Grid.Col span={{ base: 12, sm: 4 }}>
                            <Card shadow="sm" withBorder radius="md" p="md" style={{ backgroundColor: "#e6f4ea" }}>
                                <Title order={4} c="green.7" mb="xs">Local Focus</Title>
                                <Text size="sm" c="gray.7">
                                    We highlight Alberta-based vendors and encourage local economic growth.
                                </Text>
                            </Card>
                        </Grid.Col>
                        
                        <Grid.Col span={{ base: 12, sm: 4 }}>
                            <Card shadow="sm" withBorder radius="md" p="md" style={{ backgroundColor: "#e6f0ff" }}>
                                <Title order={4} c="blue.7" mb="xs">Student Project</Title>
                                <Text size="sm" c="gray.7">
                                    Developed by students at SAIT to solve real-world problems through tech.
                                </Text>
                            </Card>
                        </Grid.Col>
                        
                        <Grid.Col span={{ base: 12, sm: 4 }}>
                            <Card shadow="sm" withBorder radius="md" p="md" style={{ backgroundColor: "#fff4e6" }}>
                                <Title order={4} c="orange.7" mb="xs">Simplified Shopping</Title>
                                <Text size="sm" c="gray.7">
                                    Discover what’s at each market so you can plan better and shop smarter.
                                </Text>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Container>
            </AppShell.Main>
        </AppShell>
    )
}