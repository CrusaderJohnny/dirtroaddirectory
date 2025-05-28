"use client";
import {Avatar, Card, Center, Container, Text} from "@mantine/core";

export default function UserProfile() {
    const user = {
        firstName: 'John',
        lastName: 'Doe',
        email: '123testing@test.ca'
    }
    return (
        <Container size="sm" bg="var(--mantine-color-gray-light)">
            <Card bg="#2c2929">
                <Card.Section
                h={160}
                style={{backgroundImage:
                'url(https://d27p2a3djqwgnt.cloudfront.net/wp-content/uploads/2024/05/15165226/dirt-road-696x389.jpeg)',
                backgroundPosition: 'center'}}/>
                <Avatar src="https://ih1.redbubble.net/image.5055610258.0655/flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg" alt="User Profile image"
                size={120}
                radius={20}
                mx="auto"
                mt={-30}/>
                <Center pt={20}>
                <Text c="white">{user.firstName} {user.lastName}</Text>
                </Center>
                <Center>
                <Text c="white">{user.email}</Text>
                </Center>
            </Card>
        </Container>
    )
}