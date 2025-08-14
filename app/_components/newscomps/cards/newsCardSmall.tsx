import {Card, Image, Text, Title} from "@mantine/core";
import {ArticleInterface} from "@/app/_types/interfaces";
import Link from 'next/link';


export default function NewsCardSmall({article}: { article: ArticleInterface }) {

    return (
        <Link href={`/articleSubPage?articleId=${article.post_id}`} passHref>
            <Card withBorder shadow="sm" radius="md" p="md" w="auto" h="100%" className="cursor-pointer">
                <Title order={3}>{article.title}</Title>
                <Image
                    src={article.image}
                    alt={article.title}
                    h={250}
                    w="auto"
                    fit="contain"
                />
                <Text size="sm" c="dimmed">{article.created_at.toString()}</Text>
            </Card>
        </Link>
    );
}