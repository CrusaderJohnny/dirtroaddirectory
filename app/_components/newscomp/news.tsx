import { Title, Flex, Center, Text, Container, Box, useMantineTheme } from '@mantine/core';
import CurrentUpdate from "./currentUpdate";
import UpdateList from "./updateList";


export default function NewsPage() {
    const theme = useMantineTheme()

    return(
        <>
            <Center>
                <Title
                    order={2}
                    c="Black"
                >
                    What&#39;s New!
                </Title>
            </Center>
            <Flex
                style={{
                    minHeight: '80vh',
                    height: '80vh',
                }}
            >
                {/* Box for current currentUpdate.js */}

                <Container
                    style={{
                        width: '75%',
                        backgroundColor: theme.colors.gray[4],
                        borderRadius: '5%',
                        padding: '2%',
                        marginTop: '1%',
                        height: '70%',
                        maxWidth: '60%',
                        maxHeight: '80%',
                    }}
                >

                    <CurrentUpdate />

                    {/*Create Component for vendors to email and request to post their updates*/}
                    {/*Place it below CurrentUpdate in it's own gray box*/}
                    Place Holder
                </Container>


                {/* Box for updatesList.js */}
                <Container
                    style={{
                        width: '25%',
                        borderRadius: '5%',
                        backgroundColor: theme.colors.gray[4],
                        padding: '2%',
                        marginRight: '2%',
                        maxWidth: '20%',
                        height: '90%',
                        maxHeight: '90%',
                    }}
                >
                    <UpdateList />
                </Container>
            </Flex>
        </>

    );
}

