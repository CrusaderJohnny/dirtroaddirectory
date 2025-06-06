import {Container, Title, Button, Flex} from '@mantine/core';


interface ContactOrNewPostProps {
    isAdmin: boolean
}

export default function ContactOrNewPost({isAdmin}: ContactOrNewPostProps) {

    return (
        <>
            {isAdmin ? (
                // Container B when user is admin
                <Container
                    style={{
                        // backgroundColor: 'white',
                    }}
                >
                    <Flex justify="flex-end">
                        <Title order={2}
                               style={{
                                   fontFamily: 'Monospace',
                                   // alignSelf: 'flex-end',
                               }}
                        >
                            Welcome back Admin!
                        </Title>
                        <Button mx={10}>Edit Posts</Button>
                    </Flex>
                </Container>
            ) : (
                // Container A when user is not admin
                <Container>
                    <Flex
                        justify="flex-end"
                    >
                        <Title order={2}
                               style={{
                                   fontFamily: 'Monospace',
                                   alignSelf: 'flex-end',
                               }}
                        >
                            Want your story featured?
                        </Title>
                        <Button mx={10}>Contact Us</Button>
                    </Flex>
                </Container>
            )}
        </>
    );
}