"use client";
import {UserProfile, useUser} from "@clerk/nextjs";
import {Center, Container, Text} from "@mantine/core";

export default function Page() {
    const {isSignedIn, isLoaded} = useUser();
    if (!isLoaded) {
        return (
            <Container>
                <Center>
                    <Text>
                        Loading...
                    </Text>
                </Center>
            </Container>
        )
    }

    if(!isSignedIn) {
        return (
            <Container>
                <Center>
                    <Text>
                        Sign in to view your profile page.
                    </Text>
                </Center>
            </Container>
        )
    }
    return (
        <Container>
            <Center>
                <UserProfile />
            </Center>
        </Container>
    )
}