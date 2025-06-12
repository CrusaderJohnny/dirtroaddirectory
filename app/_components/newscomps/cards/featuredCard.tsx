import {Card, Image, Text, Title} from "@mantine/core";
import { ArticleInterface } from "@/app/_types/interfaces";
import Link from 'next/link';


export default function FeaturedCard( { article }: { article: ArticleInterface } ) {
    return (
        <Link href={`/article?articleId=${article.id}`} passHref>
            <Card withBorder radius="md" shadow='sm' p="md" w='100%' h='100%' className="cursor-pointer">
                <Title order={3} >{article.title}</Title>
                <Text size="sm" c="dimmed">{article.date}</Text>

                {/*Type 1*/}
                <Image src={article.imgLink} alt={article.title} h='60%' radius="md" />

                <Text p='sm'>{article.summery}</Text>
            </Card>
        </Link>
    );
};