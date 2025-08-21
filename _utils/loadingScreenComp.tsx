import {AppShell, AppShellSection, Card, Center, Container, Flex, Loader, Text} from "@mantine/core";
import React from "react";

interface LoadingScreenComp {
    pageName: string;
}

export default function LoadingScreenComp( {pageName }: LoadingScreenComp ) {

    return(
        <AppShell>
            <AppShellSection>
                <Center h="400px">
                    <Container size="md" py="xl">
                        <Card>
                            <Flex
                                justify="center"
                                align="center"
                                direction="column"
                            >
                                <Text size="xl" fw={800} c="black">Loading {pageName}...</Text>
                                <Loader size={50} color="green"/>
                            </Flex>
                        </Card>
                    </Container>
                </Center>
            </AppShellSection>
        </AppShell>
    );
}