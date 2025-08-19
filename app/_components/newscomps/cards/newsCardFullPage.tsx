import {Card, Image, Button, Title, Box, Flex, Spoiler, Divider, BackgroundImage} from "@mantine/core";
import { ArticleInterface } from "@/app/_types/interfaces";
import {useState} from "react";
import ConvertDate from "@/app/_components/newscomps/convertDate";


export default function NewsCardFullPage({ article }: { article: ArticleInterface } ) {

    const [expanded, setExpanded] = useState(false);

    return(
        <Box>
            <Card p={0} radius="md" withBorder={false} shadow="sm">
                <BackgroundImage
                    src={article.image}
                    radius="md"
                    h="20rem"
                    w='auto'
                    style={{
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                >
                    <Flex
                        justify="center"
                        align="flex-end"
                        h="100%"
                        style={{
                            background:
                                'linear-gradient(to top, rgba(0, 0, 0, 0.6) 30%, rgba(0, 0, 0, 0) 100%)',
                        }}
                    >
                        <Box p="md" w="100%" style={{ textAlign: 'center', color: 'white' }}>
                            <Title order={2}>
                                {article.title}
                            </Title>
                        </Box>
                    </Flex>
                </BackgroundImage>
            </Card>


            <Card
                withBorder
                radius="md"
                p="md"
                w='100%'
                h='10%'
                my='md'
                className="cursor-pointer"
                style={{
                    backgroundColor: '#ebfbee',
                }}
            >
                <Flex justify='space-between'>
                    {/*If article.market_label = null, it will not display*/}
                    <Title order={4} fw={700}>{article.market_label}</Title>
                    <Title order={4} c="dimmed">
                        <ConvertDate inputtedDate={article.created_at.toString()} />
                    </Title>
                </Flex>
                <Divider/>

                <Spoiler
                    maxHeight={200}
                    showLabel="See More"
                    hideLabel="See Less"
                    expanded={expanded}
                    onExpandedChange={setExpanded}
                    transitionDuration={500}
                >
                    <Box
                        pb='md'
                    >
                        {article.summary}
                    </Box>
                    {article.content}
                </Spoiler>
                <Divider/>

            </Card>

            <Card
                withBorder
                radius="md"
                p="md"
                w='100%'
                h='10%'
                my='md'
                className="cursor-pointer"
                style={{
                    backgroundColor: '#ebfbee',
                }}
            >

                <Divider
                    size="sm"
                    labelPosition="center"
                    color='gray'
                    label={
                        <>
                            <Image
                                src='https://media.istockphoto.com/id/1170724138/vector/farmers-market-hand-drawn-lettering.jpg?s=1024x1024&w=is&k=20&c=EI--kDMvBM9pvC9jFJcaoepQHcDbTxp-De6fgIVqy_8='
                                h={40}
                                w='auto'
                                fit='contain'
                                radius='md'
                                alt="Farmers Market Logo"
                            />
                            <Title
                                order={5}
                                pl='sm'
                            >
                                Dirt Road Directory
                            </Title>
                        </>
                    }
                />
                <Flex
                    justify="center"
                    align="center"
                    py='md'
                >
                    <Button component="a" href="./" >
                        Other Articles
                    </Button>

                </Flex>
            </Card>
        </Box>
    );
}







