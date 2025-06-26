"use client";
import {useForm} from "@mantine/form";
import {Button, Card, Text, Textarea, TextInput, useMantineTheme} from "@mantine/core";
import {DateInput} from "@mantine/dates";
import {VendorPostFormProps} from "@/app/_types/interfaces";
import ImageUploader from "@/app/_components/image-uploader/image-uploader";

export default function VendorPostForm({ vendorName, userId } : VendorPostFormProps) {
    const farmersVendorName = vendorName || "";
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
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', values.content);
        formData.append('userId', String(userId));

        if(values.image) {
            formData.append('image', values.image);
        }
        console.log('Sending FormData to server...');

        try {
            const response = await fetch('https://localhost:8080/articles', {
                method: 'POST',
                body: formData,
            });
            if(response.ok) {
                const responseData = await response.json();
                console.log("Post created successfully! ", responseData);
                form.reset();
                alert("Post created successfully!");
            } else {
                const errorData = await response.json();
                console.error("Failed to create post: ", errorData.error || response.statusText);
                alert(`Failed to create post: ${errorData.error || response.statusText}`);
            }
        } catch (error) {
            console.error("Network error or failed to send request: ", error);
            alert("An error occurred while trying to create the post. Please try again");
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