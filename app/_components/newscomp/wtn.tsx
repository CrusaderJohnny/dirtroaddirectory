import {Card, Container, Stack, Title, useMantineTheme} from "@mantine/core";
import CurrentUpdate from "@/app/_components/newscomp/currentUpdate";
import ContactOrNewPost from "@/app/_components/newscomp/contactOr-newPost";
import {useEffect, useState} from "react";

export default function WhatTheNews() {
    const [isAdmin, setAdmin] = useState(false);
    const theme = useMantineTheme();
    useEffect(() => {
        setTimeout(() => setAdmin(true), 1000);
    }, []);
    return (
        <Container fluid
        >
            <Stack
                justify="space-evenly"
                align={"center"}
            >
                <Title>
                    Whats new with the Local Farmers Markets!
                </Title>
                <Card
                    shadow="md"
                    withBorder
                    padding="lg"
                    bg={`linear-gradient(to right, ${theme.colors.gray[4]}, ${theme.colors.gray[5]})`}
                >
                    <CurrentUpdate/>
                </Card>
                <Container>
                    <ContactOrNewPost isAdmin={isAdmin}/>
                </Container>
            </Stack>
        </Container>
    )
}