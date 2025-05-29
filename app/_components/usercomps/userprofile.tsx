// "use client";
import {Avatar, Card, Center, Container, Text} from "@mantine/core";
import {auth, currentUser} from "@clerk/nextjs/server";

export default async function UserProfile() {

    const user = await currentUser();
    const {userId, redirectToSignIn} = await auth();

    if ( !userId ) {
        return redirectToSignIn();
    }
    else {
        return (
            <Container size="sm" bg="var(--mantine-color-gray-light)">
                <Card bg="#2c2929">
                    <Card.Section
                        h={160}
                        style={{
                            backgroundImage:
                                'url({user?.imageUrl})',
                            backgroundPosition: 'center'
                        }}/>
                    <Avatar
                        src="https://ih1.redbubble.net/image.5055610258.0655/flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg"
                        alt="User Profile image"
                        size={120}
                        radius={20}
                        mx="auto"
                        mt={-30}/>
                    <Center pt={20}>
                        <Text c="white">{user?.firstName} {user?.lastName}</Text>
                    </Center>
                    <Center>
                        <Text c="white">{user?.primaryEmailAddressId}</Text>
                    </Center>
                </Card>
            </Container>
        )
    }
}