import {Card, Flex, Image, Text, Title} from "@mantine/core";
import {ArticleInterface} from "@/app/_types/interfaces";
import Link from 'next/link';
import ConvertDate from "@/app/_components/newscomps/convertDate";


export default function NewsCardSmall({article}: { article: ArticleInterface }) {

    return (
        <Link href={`/articleSubPage?articleId=${article.post_id}`} passHref>
            <Card withBorder shadow="sm" radius="lg" p="md" w="auto" h="100%" className="cursor-pointer" style={{backgroundColor: '#fefcf9'}}>
                <Title
                    order={4}
                    c="black"
                    style={{
                        fontFamily: "Georgia, serif",
                        fontWeight: 800
                    }}
                >
                    {article.title}</Title>
                <Image
                    src={article.image}
                    alt={article.title}
                    h={250}
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
            </Card>
        </Link>
    );
}