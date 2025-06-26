"use client";
import {useForm} from "@mantine/form";
import {
    Button,
    Card,
    LoadingOverlay,
    Notification,
    Text,
    Textarea,
    TextInput,
    useMantineTheme
} from "@mantine/core";
import {DateInput} from "@mantine/dates";
import {VendorPostFormProps} from "@/app/_types/interfaces";
import ImageUploader from "@/app/_components/image-uploader/image-uploader";
import {useState} from "react";

export default function VendorPostForm({ vendorName, userId } : VendorPostFormProps) {
    const farmersVendorName = vendorName || "";

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submissionMessage, setSubmissionMessage] = useState<{type: 'success' | 'error'; message: string} | null>(null);
    const theme = useMantineTheme();

    const form = useForm({
        initialValues: {
            title: '',
            content: '',
            image: null as string | null,
        },
        validate: {
            title: (value) => (value.trim().length > 0 ? null : 'Title is required'),
            content: (value) => (value.trim().length > 0 ? null : 'Content is required'),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setSubmissionMessage(null);
        setIsSubmitting(true);
        try {
            const postData = {
                user_id: userId,
                title: values.title,
                content: values.content,
                summary: values.content.substring(0, 50),
                is_featured: false,
                image: values.image,
            };

            console.log('Market post data: ', postData);

            const response = await fetch(`https://localhost:8080/articles`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(postData),
            });

            if(!response.ok){
                const errorData = await response.json();
                setSubmissionMessage({
                    type: 'error',
                    message: `Failed to create post: ${errorData}`,
                });
                setIsSubmitting(false);
                return;
            }

            setSubmissionMessage({type: 'success', message: 'Post successfully created!'});
            form.reset();
        } catch (error) {
            console.error('Error creating post: ', error);
            setSubmissionMessage({type: 'error', message: `Failed to create post: ${error}`});
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card
            maw={800}
            shadow="lg"
            radius="md"
            withBorder w={"70rem"}
            bg={theme.colors.primaryGreen[0]}
            style={{borderRadius: theme.radius.md, boxShadow: theme.shadows.md, border: `1px solid ${theme.colors.primaryGreen[2]}`}}
        >

            <LoadingOverlay
                visible={isSubmitting}
                loaderProps={{children : <Text>Submitting post...</Text>}}
                zIndex={1000}
                overlayProps={{radius: 'sm', blur: 2}}
            />

            {submissionMessage && (
                <Notification
                    title={submissionMessage.type === 'success' ? 'Success' : 'Error'}
                    color={submissionMessage.type === 'success' ? 'teal' : 'red'}
                    onClose={() => setSubmissionMessage(null)}
                    mb='md'
                >
                    {submissionMessage.message}
                </Notification>
            )}


            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Text size="lg" w={700} mb="md">
                    Create a New Vendor Post
                </Text>

                <TextInput
                    label="Posted By"
                    value={farmersVendorName}
                    readOnly
                    mb="md"
                    styles={{input : {cursor: 'default'}}}
                    description="This is automatically filled from your registered name"
                />

                <DateInput
                    label="Posted On"
                    value={new Date()}
                    readOnly
                    mb="md"
                    clearable={false}
                    styles={{input : {cursor: 'default'}}}
                    description="The current date will be used for this post"
                />

                <TextInput
                    label="Event Title"
                    placeholder="Enter event title"
                    {...form.getInputProps('title')}
                    mb="md"
                    required
                />

                <Textarea
                    label="Event Details"
                    placeholder="Let everyone know whats happening"
                    minRows={5}
                    {...form.getInputProps('content')}
                    mb="md"
                    required
                />

                <ImageUploader
                    onImageUploadAction={(url) => form.setFieldValue('image', url)}
                    signatureEndpoint={"/api/sign-cloudinary-params"}
                />

                <Button type="submit" fullWidth mt="lg">Create Vendor Post</Button>

            </form>
        </Card>
    )

}