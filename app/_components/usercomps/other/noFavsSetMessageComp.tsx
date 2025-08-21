import {Card, Center, Container, Flex, Text} from "@mantine/core";
import React from "react";

interface NoFavsSetMessageCompProps {
    favType: string;
}

export default function NoFavsSetMessageComp({ favType }: NoFavsSetMessageCompProps) {

    return(
        <Center h="400px">
            <Container size="md" py="xl">
                <Card>
                    <Flex justify="center" align="center" direction="column">
                        <Text size="xl" fw={500} c="black">No current favorite {favType}.</Text>
                        <Text>Visit the &#34;View All&#34; tab to set favorites</Text>
                    </Flex>
                </Card>
            </Container>
        </Center>
    );
}