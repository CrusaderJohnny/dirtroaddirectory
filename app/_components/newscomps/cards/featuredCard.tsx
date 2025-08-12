import {Card, Image, Text, Title} from "@mantine/core";
import { ArticleInterface } from "@/app/_types/interfaces";
import Link from 'next/link';


export default function FeaturedCard( { article }: { article: ArticleInterface } ) {
    return (
        <Link href={`/articleSubPage?articleId=${article.post_id}`} passHref>
            <Card withBorder radius="md" shadow='sm' p="md" w='100%' h='100%' bg='gray.1' className="cursor-pointer">
                <Title order={3} >{article.title}</Title>

                <Image
                    src={article.image}
                    alt={article.title}
                    h={350}
                    w="auto"
                    fit="contain"
                />

                <Text p='sm'>{article.summary}</Text>
            </Card>
        </Link>
    );
};