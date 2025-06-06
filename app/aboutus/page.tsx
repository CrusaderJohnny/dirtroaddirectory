"use client";
import {AppShell, Card, Container, Image, Text} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";

export default function Page() {
    return(
        <AppShell>
            <AppShell.Header
                component={NavMT}/>
            <AppShell.Main>
                <Card
                    shadow="md"
                    withBorder
                    padding="lg"
                >
                    <Image
                        radius="md"
                        w={"auto"}
                        h={"auto"}
                        fit="contain"
                        src={"https://d27p2a3djqwgnt.cloudfront.net/wp-content/uploads/2024/05/15165226/dirt-road.jpeg"}
                        alt="Dirt Road Directory"/>
                    <Container>
                        <Text p={10}>
                            Welcome to the Dirt Road Directory. We are Students working to develop an online farmers market finder website.
                            We hope to foster more local shopping by facilitating an easier way to find what people want!
                        </Text>
                        <Text p={10}>
                            The Goal is the allow anyone to find a market that is near them, as well as see what they have on offer.
                            Knowing the market has what you want saves time and effort from going to several just to find one,
                            Changing a day long trip for one item, into an easy, one stop shop for them!
                        </Text>
                    </Container>
                </Card>
            </AppShell.Main>
        </AppShell>
    )
}