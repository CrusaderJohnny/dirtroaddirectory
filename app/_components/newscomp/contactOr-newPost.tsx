import {Container, Title, Text, Button, Flex} from '@mantine/core';
import Link from "next/link";


interface ContactOrNewPostProps {
    isAdmin: boolean
}

export default function ContactOrNewPost({ isAdmin }: ContactOrNewPostProps) {

    return (
        <>
            {isAdmin ? (
                // Container B when user is admin
                <Container>
                    <Title order={2}>Welcome back Admin!</Title>
                    <Flex>
                        <Text>Click to create</Text>
                        <Button
                            component={Link}
                            href="/admin"
                            mx={10}>New Post</Button>
                    </Flex>
                </Container>
            ) : (
                // Container A when user is not admin
                <Container>
                    <Title order={2}>Are you a Vendor?</Title>
                    <Flex>
                        <Text>Want your post on our page?</Text>
                        <Button
                            component={Link}
                            href="/contact"
                            mx={10}>Contact Us</Button>
                    </Flex>
                </Container>
            )}
        </>
    );
}