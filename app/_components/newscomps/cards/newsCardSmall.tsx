import {Box, Card, Image, Text, Title} from "@mantine/core";
import { ArticleInterface } from "@/app/_types/interfaces";
import Link from 'next/link';


export default function NewsCardSmall( { article }: { article: ArticleInterface } ) {

    return(
        <Link href={`/articleSubPage?articleId=${article.id}`} passHref>
            <Card withBorder shadow='sm' radius="md" p="md" w='100%' h='70%' className="cursor-pointer">
                <Title order={3} >{article.title}</Title>
                <Box h='75%'>
                    <Image src={article.imgLink} alt={article.title} h='100%' w='100%' radius="md" />
                </Box>
                <Text size="sm" c="dimmed">{article.date}</Text>
            </Card>
        </Link>
    );
}