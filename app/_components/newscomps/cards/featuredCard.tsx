import {Card, Image, Text, Title, Flex} from "@mantine/core";
import {ArticleInterface} from "@/app/_types/interfaces";
import Link from 'next/link';
import ConvertDate from "@/app/_components/newscomps/convertDate";

export default function FeaturedCard({article}: { article: ArticleInterface }) {
    return (
        <Link href={`/articleSubPage?articleId=${article.post_id}`} passHref>
            <Card withBorder radius="md" shadow="sm" p="md" w="100%" h="100%" bg="#ece2d2" className="cursor-pointer">
                <Title
                    order={3}
                    style={{
                        fontFamily: "Georgia, serif",
                        color: "#1f4d2e",
                        fontWeight: 800
                    }}
                >{article.title}</Title>
                <Image
                    src={article.image}
                    alt={article.title}
                    h={300}
                    w="auto"
                    fit="contain"
                />
                <Flex justify='space-between'>
                    {/*If article.market_label = null, it will not display*/}
                    <Text size="sm" fw={700}>{article.market_label}</Text>
                    <Text
                        size="sm"
                        c="gray.6"
                        style={{
                            fontWeight: 550,
                        }}
                    >
                        <ConvertDate inputtedDate={article.created_at.toString()} />
                    </Text>
                </Flex>
                <Text
                    p="sm"
                    style={{
                        fontFamily: "Georgia, serif",
                        color: "black",
                        fontWeight: 800
                    }}
                >{article.summary}</Text>
            </Card>
        </Link>
    );
}
