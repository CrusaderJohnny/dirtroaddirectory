"use client";
import {isNotEmpty, useForm} from "@mantine/form";
import {
    Box,
    Button, Card,
    FileInput,
    Image,
    Loader,
    LoadingOverlay,
    Notification, Radio, Select,
    Text,
    Textarea,
    TextInput, useMantineTheme
} from "@mantine/core";
import {DateInput} from "@mantine/dates";
import {
    AdminPostFormProps,
    MarketsInterface,
    VendorsInterface
} from "@/app/_types/interfaces";
import {useEffect, useState} from "react";

export default function AdminPostForm({user} : AdminPostFormProps) {
    const [selectedPosterType, setSelectedPosterType] = useState<'market' | 'vendor' | null>(null);
    const [selectedPosterID, setSelectedPosterID] = useState<string | null>(null);

    const [marketOptions, setMarketOptions] = useState<MarketsInterface[]>([]);
    const [vendorOptions, setVendorOptions] = useState<VendorsInterface[]>([]);
    const [isLoadingOptions, setIsLoadingOptions] = useState<boolean>(true);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submissionMessage, setSubmissionMessage] = useState<{type: 'success' | 'error'; message: string} | null>(null);

    const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
    const [imageUploadError, setImageUploadError] = useState<string | null>(null);

    const theme = useMantineTheme();

    const form = useForm({
        initialValues: {
            title: '',
            content: '',
            image: null as File | null,
            isFeatured: false,
            summary: '',
        }, validate: {
            title: isNotEmpty('Title is required'),
            content: isNotEmpty('Content is required'),
        },
    });

    const handleImageFileChange = (file: File | null) => {
        form.setFieldValue('image', file);
        setImageUploadError(null);
    };

    //  useEffect for when we have server set up and can talk with back end
    useEffect(() => {
        const fetchOptions = async () => {
            setIsLoadingOptions(true);
            try{
                const [marketResponse, vendorResponse] = await Promise.all([
                    fetch('http://localhost:8080/markets'),
                    fetch('http://localhost:8080/vendors'),
                ]);
                if(!marketResponse.ok || !vendorResponse.ok){
                    const marketError = await marketResponse.text();
                    const vendorError = await vendorResponse.text();
                    setSubmissionMessage({
                        type: 'error',
                        message: `Failed to load markets/vendors: Market Status: ${marketResponse.status}: ${marketError} | Vendor Status: ${vendorResponse.status}: ${vendorError}`,
                    })
                    setIsLoadingOptions(false);
                    return;
                }
                const markets: MarketsInterface[] = await marketResponse.json();
                const vendors: VendorsInterface[] = await vendorResponse.json();
                setMarketOptions(markets);
                setVendorOptions(vendors);
            } catch (error) {
                console.error(`Error fetching options: ${error}`);
                setSubmissionMessage({ type: 'error', message: `Failed to fetch markets and vendors: ${error instanceof Error ? error.message : 'Unknown error'}. Please check API.` });
            } finally {
                setIsLoadingOptions(false);
            }
        };
        void fetchOptions();
    }, []);
    //just cuz u forget all the time, this empty dependency array means this use effect runs once on mount

    // Cleanup for URL.createObjectURL when component unmounts or image changes
    // This is important to prevent memory leaks from client-side previews
    useEffect(() => {
        if (form.values.image) {
            const previewUrl = URL.createObjectURL(form.values.image);
            return () => {
                URL.revokeObjectURL(previewUrl);
            };
        }
    }, [form.values.image]);

    const handleSubmit = async (values: typeof form.values) => {
        setSubmissionMessage(null);
        setImageUploadError(null);
        if(!selectedPosterType || !selectedPosterID){
            setSubmissionMessage({type: 'error', message: 'Please select a post type and a specific market/vendor.'});
            return;
        }
        setIsSubmitting(true);
        setIsUploadingImage(false);
        let imageUrl: string | null = null;
        try {
            if(values.image){
                setIsUploadingImage(true);
                const formData = new FormData();
                formData.append('image', values.image);
                const uploadResponse = await fetch('/azure-components/upload-image', {
                    method: 'POST',
                    body: formData,
                });
                let uploadResponseData;
                try {
                    uploadResponseData = await uploadResponse.json();
                } catch (jsonError) {
                    uploadResponseData = {message: `non-json response or empty body: ${jsonError}`};
                    console.warn("failed to parse image upload response as json: ", jsonError);
                }

                if(!uploadResponse.ok) {
                    const errorMessage = uploadResponseData.error || uploadResponseData.message || JSON.stringify(uploadResponseData);
                    setImageUploadError(`Image upload failed: ${errorMessage}`);
                    setIsSubmitting(false);
                    setIsUploadingImage(false);
                    return;
                }
                imageUrl = uploadResponseData.url;
            }

            const postData = {
                title: values.title,
                content: values.content,
                imageUrl: imageUrl, //null if no image or the URL after proper upload
                posterType: selectedPosterType,
                posterId: selectedPosterID,
                postedOn: new Date().toISOString(),
                adminUserId: user.id,
                adminUserName: user.username || user.firstName || user.primaryEmailAddressId, //pulls username first, then first name then primary email address if others are null
                isFeatured: false,
                summary: values.content.substring(0,100) + "...",
            };

            console.log('Admin post data: ', postData);

            const response = await fetch(`https://localhost:8080/articles`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(postData),
            });
            let postResponseData;
            try{
                postResponseData = await response.json();
            } catch (jsonError) {
                postResponseData = {message: `Failed to parse post data: ${jsonError}`};
                console.warn("failed to parse post data as json: ", jsonError);
            }

            if(!response.ok){
                const errorMessage = postResponseData.error || postResponseData.message || JSON.stringify(postResponseData);
                setSubmissionMessage({
                    type: 'error',
                    message: `Failed to create post: ${errorMessage}`,
                });
                return;
            }
            setSubmissionMessage({type: 'success', message: 'Post successfully created!'});
            form.reset();
            setSelectedPosterID(null);
            setSelectedPosterType(null);
        } catch (error) {
            console.error('Error creating post: ', error);
            setSubmissionMessage({type: 'error', message: `Failed to create post: ${error}`});
        } finally {
            setIsSubmitting(false);
            setIsUploadingImage(false);
        }
    };

    const getPosterName = () => {
        if(!selectedPosterType || !selectedPosterID){
            return 'Not selected';
        }
        if(selectedPosterType === 'market'){
            const market = marketOptions.find(m => m.id === parseInt(selectedPosterID));
            return market ? market.label : 'Unknown Market';
        } else if(selectedPosterType === 'vendor'){
            const vendor = vendorOptions.find(v => v.id === parseInt(selectedPosterID));
            return vendor ? vendor.name : 'Unknown Vendor';
        }
        return 'Not Selected';
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
                visible={isSubmitting || isLoadingOptions || isUploadingImage}
                loaderProps={{children : isLoadingOptions ? <Loader/> : isUploadingImage ? <Text>Uploading image...</Text> : <Text>Submitting post...</Text>}}
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
            {imageUploadError && (
                <Notification
                    title={'Image Upload Error'}
                    color={'red'}
                    onClose={() => setImageUploadError(null)}
                    mb={'md'}>
                    {imageUploadError}
                </Notification>
            )}

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Text size='lg' w={700} mb='lg'>
                    Admin Post Creation
                </Text>
                <TextInput
                    label='Posted by (Admin)'
                    value={user.username || user.firstName || user.primaryEmailAddressId || 'Admin'}
                    readOnly
                    mb='md'
                    styles={{ input: {cursor: 'default'}}}
                />

                <Radio.Group
                    label="Post on behalf of:"
                    value={selectedPosterType}
                    onChange={(value) => {
                        setSelectedPosterType(value as 'market' | 'vendor');
                        setSelectedPosterID(null);
                    }}
                    mb='md'
                >
                    <Radio value='market' label='Market' />
                    <Radio value='vendor' label='Vendor' />
                </Radio.Group>

                {selectedPosterType === 'vendor' && (
                    <Select
                        label="Select Vendor"
                        placeholder="Choose a vendor"
                        data={vendorOptions.map(v => ({ value: v.id.toString(), label: v.name }))}
                        value={selectedPosterID}
                        onChange={setSelectedPosterID}
                        searchable
                        clearable
                        mb='md'
                        disabled={isLoadingOptions}
                        required
                    />
                )}

                {selectedPosterType === 'market' && (
                    <Select
                        label="Select Market"
                        placeholder="Choose a market"
                        data={marketOptions.map(m => ({ value: m.id.toString(), label: m.label }))}
                        value={selectedPosterID}
                        onChange={setSelectedPosterID}
                        searchable
                        clearable
                        mb='md'
                        disabled={isLoadingOptions}
                        required
                    />
                )}

                <TextInput
                    label='Post on behalf of:'
                    value={getPosterName()}
                    readOnly
                    mb='md'
                    styles={{ input: {cursor: 'default'}}}
                />

                <DateInput
                    label="Posted on:"
                    value={new Date()}
                    readOnly
                    mb='md'
                    clearable={false}
                    styles={{ input: {cursor: 'default'}}}
                />

                <TextInput
                    label="Post Title"
                    placeholder={"Enter Post Title"}
                    {...form.getInputProps('title')}
                    mb={'md'}
                    required
                />

                <Textarea
                    label={"Post Content"}
                    placeholder={"Enter Post Content"}
                    minRows={5}
                    {...form.getInputProps('content')}
                    mb={'md'}
                    required
                />

                <FileInput
                    label={"Include image (Optional)"}
                    placeholder={"Upload an image file"}
                    accept={'image/*'}
                    value={form.values.image}
                    onChange={handleImageFileChange}
                    mb={'md'}
                />

                {form.values.image && (
                    <Box mb={'md'}>
                        <Text size={'sm'} mb={'xs'}>
                            Image Preview
                        </Text>
                        <Image
                            src={URL.createObjectURL(form.values.image)}
                            alt={'Image Preview'}
                            radius={'md'}
                            maw={200}
                        />
                    </Box>
                )}
                <Button type={'submit'} disabled={isSubmitting || !selectedPosterID}>
                    Create Post
                </Button>
            </form>
        </Card>
    )
}