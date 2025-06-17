"use client";
import {useForm} from "@mantine/form";
import {Box, Button, Card, FileInput, Image, Text, Textarea, TextInput, useMantineTheme} from "@mantine/core";
import {DateInput} from "@mantine/dates";
import {VendorPostFormProps} from "@/app/_types/interfaces";

export default function VendorPostForm({ vendorName, userId } : VendorPostFormProps) {
    const farmersVendorName = vendorName || "";
    const theme = useMantineTheme();


    const form = useForm({
        initialValues: {
            title: '',
            content: '',
            image: null as File | null,
        },
        validate: {
            title: (value) => (value.trim().length > 0 ? null : 'Title is required'),
            content: (value) => (value.trim().length > 0 ? null : 'Content is required'),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        const postData = {
            ...values,
            posterType: 'vendor',
            posterName: farmersVendorName,
            postedOn: new Date().toISOString(),
            userId: userId,
        };
        console.log('Vendor Post Data: ', postData);
        // Example for when server side logic is complete:
        // const response = await fetch('/api/create-post-vendor', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(postData),
        // });
        // if (response.ok) {
        //     console.log("Post created successfully!");
        //     form.reset(); // Reset form after successful submission
        // } else {
        //     console.error("Failed to create post.");
        // }
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

                <FileInput
                    label="Include an Image"
                    placeholder="Upload an image"
                    accept="image/png,image/jpeg,image/gif"
                    {...form.getInputProps('image')}
                    mb="md"
                    clearable
                />

                {form.values.image && (
                    <Box mb="md">
                        <Text size="sm" mb="xs">Preview</Text>
                        <Image
                            src={URL.createObjectURL(form.values.image)}
                            alt="Image Preview"
                            radius="md"
                            maw={300}
                            fit="contain"
                            style={{border: '1px solid #ccc', padding: '0.5rem'}}
                        />
                    </Box>
                )}

                <Button type="submit" fullWidth mt="lg">Create Vendor Post</Button>

            </form>
        </Card>
    )

}