import {Card, Image, Text, Title, Box, Flex, Spoiler} from "@mantine/core";
import { ArticleInterface } from "@/app/_types/interfaces";
import {useState} from "react";


export default function NewsCardLarge( { article }: { article: ArticleInterface } ) {

    const [expanded, setExpanded] = useState(false);

    return(
        <Box>
            <Card withBorder radius="md" p="md" w='100%' h='100%' className="cursor-pointer">
                <Title order={3} >{article.title}</Title>
                <Text size="sm" c="dimmed">{article.date}</Text>
                <Flex justify="center">
                    <Image src={article.imgLink} alt={article.title} radius="md" />
                </Flex>
                <Spoiler
                    maxHeight={200}
                    showLabel="See More"
                    hideLabel="See Less"
                    expanded={expanded}
                    onExpandedChange={setExpanded}
                    transitionDuration={500}
                >
                    {article.content}
                </Spoiler>
            </Card>
        </Box>
    );
}







