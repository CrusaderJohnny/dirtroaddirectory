"use client";

import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {
    Card, Text, TextInput, Textarea, Button,
    Select, Notification, useMantineTheme
} from "@mantine/core";
import {ArticleInterface} from "@/app/_types/interfaces";


export default function ArticlePutForm() {
    const theme = useMantineTheme();

    const [articles, setArticles] = useState<ArticleInterface[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const form = useForm({
        initialValues: {
            title: '',
            content: '',
            imgLink: '',
            featured: false,
            summary: ''
        }
    });

    // Fetch articles on mount
    useEffect(() => {
        const loadArticles = async () => {
            try {
                const response= await fetch('/api/articles');
                const data: ArticleInterface[] = await response.json();
                setArticles(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setMessage({type: 'error', message: error.message});
                } else {
                    setMessage({type: 'error', message: 'An unknown error occurred'});
                }
            }
        };


        loadArticles();
        console.log(articles);
    }, []);

    // Update form when article is selected
    const handleSelect = (id: string | null) => {
        if (!id) return;

        setSelectedId(id);
        const selected = articles.find(a => a.post_id === Number(id));
        if (selected) {
            form.setValues({
                title: selected.title,
                content: selected.content,
                imgLink: selected.image,
                featured: selected.isFeatured,
                summary: selected.summary
            });
        }
    };

    // Submit update
    const handleSubmit = async (values: typeof form.values) => {
        if (!selectedId) return;

        try {
            const res = await fetch(`api/articles/${selectedId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: values.title,
                    content: values.content,
                    image: values.imgLink,
                    is_featured: values.featured ? 1 : 0,
                    summary: values.summary
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to update article');
            }

            setMessage({type: 'success', message: 'Article updated successfully!'});
        } catch (error: unknown) {
            console.error("Update failed:", error);

            if (error instanceof Error) {
                setMessage({type: 'error', message: error.message});
            } else {
                setMessage({type: 'error', message: 'Update failed'});
            }
        }
    };

    return (
        <Card
            maw={800}
            shadow="lg"
            radius="md"
            withBorder
            w={"70rem"}
            bg={theme.colors.primaryGreen[0]}
            style={{
                borderRadius: theme.radius.md,
                boxShadow: theme.shadows.md,
                border: `1px solid ${theme.colors.primaryGreen[2]}`
            }}
        >
            {message && (
                <Notification
                    title={message.type === "success" ? "Success" : "Error"}
                    color={message.type === "success" ? "teal" : "red"}
                    onClose={() => setMessage(null)}
                    mb="md"
                >
                    {message.message}
                </Notification>
            )}

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Text size="lg" w={700} mb="lg">
                    Edit Existing Articles
                </Text>

                <Select
                    label="Select an Article"
                    placeholder="Choose article"
                    data={articles.map(article => ({
                        value: article.post_id.toString(),
                        label: `${article.title} (ID: ${article.post_id})`
                    }))}
                    value={selectedId}
                    onChange={handleSelect}
                    searchable
                    clearable
                    mb="md"
                />

                <TextInput
                    label="Title"
                    placeholder="Enter post title"
                    {...form.getInputProps("title")}
                    required
                    mb="md"
                />

                <Textarea
                    label="Content"
                    placeholder="Enter content"
                    {...form.getInputProps("content")}
                    required
                    minRows={4}
                    mb="md"
                />

                <TextInput
                    label="Image URL"
                    placeholder="https://..."
                    {...form.getInputProps("imgLink")}
                    mb="md"
                />

                <Select
                    label="Featured"
                    data={[
                        {value: "true", label: "Yes"},
                        {value: "false", label: "No"}
                    ]}
                    value={form.values.featured.toString() ?? "false"}
                    onChange={(val) => form.setFieldValue("featured", val === "true")}
                    mb="md"
                />

                <Textarea
                    label="Summary"
                    placeholder="Short summary"
                    {...form.getInputProps("summary")}
                    minRows={2}
                    mb="md"
                />

                <Button type="submit" fullWidth disabled={!selectedId}>
                    Update Article
                </Button>
            </form>
        </Card>
    );
}
