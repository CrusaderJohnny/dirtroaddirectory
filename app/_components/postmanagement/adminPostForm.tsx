"use client";
import {isNotEmpty, useForm} from "@mantine/form";
import {
    Box,
    Button,
    FileInput,
    Image,
    Loader,
    LoadingOverlay,
    Notification, Radio, Select,
    Text,
    Textarea,
    TextInput
} from "@mantine/core";
import {DateInput} from "@mantine/dates";
import {
    AdminPostFormProps,
    MarketsInterface,
    VendorsInterface
} from "@/app/_types/interfaces";
import {useEffect, useState} from "react";
import markets from '../../_res/markets.json';
import vendors from '../../_res/vendors.json';

export default function AdminPostForm({user} : AdminPostFormProps) {
    const [selectedPosterType, setSelectedPosterType] = useState<'market' | 'vendor' | null>(null);
    const [selectedPosterID, setSelectedPosterID] = useState<string | null>(null);

    const [marketOptions, setMarketOptions] = useState<MarketsInterface[]>([]);
    const [vendorOptions, setVendorOptions] = useState<VendorsInterface[]>([]);
    const [isLoadingOptions, setIsLoadingOptions] = useState<boolean>(true);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submissionMessage, setSubmissionMessage] = useState<{type: 'success' | 'error'; message: string} | null>(null);

    const form = useForm({
        initialValues: {
            title: '',
            content: '',
            image: null as File | null,
        }, validate: {
            title: isNotEmpty('Title is required'),
            content: isNotEmpty('Content is required'),
        },
    });

    useEffect(() => {
        const fetchingOptions = async () => {
            setIsLoadingOptions(true);
            try {
                setMarketOptions(markets as MarketsInterface[]);
                setVendorOptions(vendors as VendorsInterface[]);
                //fake time out to simulate server load
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                console.error("Error loading local options:",error);
                setSubmissionMessage({type: 'error', message: `Error loading local options ${error instanceof Error ? error.message : 'Unknown error'}`});
            } finally {
                setIsLoadingOptions(false);
            }
        };
        void fetchingOptions();
    }, []);

    //  useEffect for when we have server set up and can talk with back end
    // useEffect(() => {
    //     const fetchOptions = async () => {
    //         setIsLoadingOptions(true);
    //         try{
    //             const [marketResponse, vendorResponse] = await Promise.all([
    //                 fetch('/api/admin/markets'),
    //                 fetch('/api/admin/vendors'),
    //             ]);
    //             if(!marketResponse.ok || !vendorResponse.ok){
    //                 const marketError = await marketResponse.text();
    //                 const vendorError = await vendorResponse.text();
    //                 setSubmissionMessage({
    //                     type: 'error',
    //                     message: `Failed to load markets/vendors: Market Status: ${marketResponse.status}: ${marketError} | Vendor Status: ${vendorResponse.status}: ${vendorError}`,
    //                 })
    //                 setIsLoadingOptions(false);
    //                 return;
    //             }
    //             const markets: MarketOption[] = await marketResponse.json();
    //             const vendors: VendorOption[] = await vendorResponse.json();
    //             setMarketOptions(markets);
    //             setVendorOptions(vendors);
    //         } catch (error) {
    //             console.error(`Error fetching options: ${error}`);
    //             setSubmissionMessage({ type: 'error', message: `Failed to fetch markets and vendors: ${error instanceof Error ? error.message : 'Unknown error'}. Please check API.` });
    //         } finally {
    //             setIsLoadingOptions(false);
    //         }
    //     };
    //     void fetchOptions();
    // }, []);
    //just cuz u forget all the time, this empty dependency array means this use effect runs once on mount

    const handleSubmit = async (values: typeof form.values) => {
        setSubmissionMessage(null);
        if(!selectedPosterType || !selectedPosterID){
            setSubmissionMessage({type: 'error', message: 'Please select a post type and a specific market/vendor.'});
            return;
        }
        setIsSubmitting(true);
        try {
            let imageUrl: string | null = null;

            if(values.image){
                // Example of a conceptual upload:
                // const formData = new FormData();
                // formData.append('image', values.image);
                // const uploadResponse = await fetch('/api/upload-image', { method: 'POST', body: formData });
                // if (!uploadResponse.ok) throw new Error('Image upload failed');
                // const uploadResult = await uploadResponse.json();
                // imageUrl = uploadResult.url;
                //placeholder file reader function to demonstrate
                //converts the image to data url and previews locally
                const reader = new FileReader();
                reader.readAsDataURL(values.image);
                await new Promise<void>((resolve) => {
                    reader.onloadend = () => {
                        imageUrl = reader.result as string;
                        resolve();
                    };
                });
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
            };

            console.log('Admin post data: ', postData);

            const response = await fetch(`/api/admin/admin-post`, {
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
            setSelectedPosterID(null);
            setSelectedPosterType(null);
        } catch (error) {
            console.error('Error creating post: ', error);
            setSubmissionMessage({type: 'error', message: `Failed to create post: ${error}`});
        } finally {
            setIsSubmitting(false);
        }
    };

    const getPosterName = () => {
        if(!selectedPosterType || !selectedPosterID){
            return 'Not selected';
        }
        if(selectedPosterType === 'market'){
            const market = marketOptions.find(m => m.id === selectedPosterID);
            return market ? market.label : 'Unknown Market';
        } else if(selectedPosterType === 'vendor'){
            const vendor = vendorOptions.find(v => v.id === parseInt(selectedPosterID));
            return vendor ? vendor.name : 'Unknown Vendor';
        }
        return 'Not Selected';
    };

    return (
        <Box maw={600} mx='auto' pos='relative'>
            <LoadingOverlay
                visible={isSubmitting || isLoadingOptions}
                loaderProps={{children : isLoadingOptions ? <Loader/> : <Text>Submitting post...</Text>}}
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
                        data={marketOptions.map(m => ({ value: m.id, label: m.label }))}
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
                    accept={'image/png, image/jpeg, image/gif, image/webp'}
                    {...form.getInputProps('image')}
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
        </Box>
    )
}