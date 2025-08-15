'use client'
import React, { useState } from 'react';
import {
    Button,
    Group,
    TextInput,
    Textarea,
    NumberInput,
    Text,
    Box,
    Divider,
    Stack
} from '@mantine/core';
import { useForm, isNotEmpty } from '@mantine/form';
import { MarketsInterface } from "@/app/_types/interfaces";
import { notifications } from '@mantine/notifications';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import ImageUploader from "@/app/_components/image-uploader/image-uploader";

interface MarketOwnerEditFormProps {
    initialMarket: MarketsInterface;
}

export default function MarketOwnerEditForm({ initialMarket }: MarketOwnerEditFormProps) {
    const [isSaving, setIsSaving] = useState(false);
    
    // Initialize form with the specific market data passed from the server
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            ...initialMarket,
            // user initialMarket as initialValues but convert lat and lng to numbers
            lat: Number(initialMarket.lat),
            lng: Number(initialMarket.lng),
        },
        validate: {
            image: (value) => (value && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value) ? 'Invalid URL for website link' : null),
            label: isNotEmpty('Market Name is required'),
            link: (value) => (value && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value) ? 'Invalid URL for website link' : null),
            lat: (value) => {
                if (value === null || value === undefined) return 'Latitude is required';
                if (typeof value !== 'number' || isNaN(value)) return 'Latitude must be a number';
                if (value < -90 || value > 90) return 'Latitude must be between -90 and 90';
                return null;
            },
            lng: (value) => {
                if (value === null || value === undefined) return 'Longitude is required';
                if (typeof value !== 'number' || isNaN(value)) return 'Longitude must be a number';
                if (value < -180 || value > 180) return 'Longitude must be between -180 and 180';
                return null;
            },
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setIsSaving(true);
        try {
            const response = await fetch(`/api/markets/${initialMarket.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values as MarketsInterface),
            });
            const updatedMarket = await response.json();
            //await marketsAPI.updateMarket(initialMarket.id, values as MarketsInterface);
            notifications.show({
                title: 'Success!',
                message: `Your market "${updatedMarket.label}" has been updated.`,
                color: 'blue',
                autoClose: 5000,
            });
        } catch (error) {
            console.error('Error saving market:', error);
            notifications.show({
                title: 'Error!',
                message: `Failed to update your market: ${error instanceof Error ? error.message : 'Unknown error'}`,
                color: 'red',
                autoClose: false,
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteClick = async () => {
        if (window.confirm(`Are you sure you want to delete your market "${initialMarket.label}"? This action cannot be undone.`)) {
            setIsSaving(true);
            try {
                await fetch(`/api/markets/${initialMarket.id}`, {
                    method: "DELETE",
                });
                //await marketsAPI.deleteMarket(initialMarket.id);
                notifications.show({
                    title: 'Deleted!',
                    message: `Your market "${initialMarket.label}" deleted successfully.`,
                    color: 'orange',
                    autoClose: 5000,
                });
                // Redirect user after deletion
                window.location.href = '/dashboard';
            } catch (error) {
                console.error('Error deleting market:', error);
                notifications.show({
                    title: 'Error!',
                    message: `Failed to delete your market: ${error instanceof Error ? error.message : 'Unknown error'}`,
                    color: 'red',
                    autoClose: false,
                });
            } finally {
                setIsSaving(false);
            }
        }
    };

    return (
        <Box p="lg" style={{ maxWidth: '500px', margin: 'auto' }}>
            <Text size="lg" mb="sm" fw={700}>Edit Your Market</Text>
            <Divider my="xs" label={`Market: ${initialMarket.label}`} labelPosition="center" />
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        withAsterisk
                        label="Market Name"
                        placeholder=""
                        key={form.key('label')}
                        {...form.getInputProps('label')}
                    />
                    <ImageUploader
                        onImageUploadAction={(url) => form.setFieldValue('image', url ?? '')} // Set to empty string if null
                        signatureEndpoint={"/api/sign-cloudinary-params"}
                        initialImage={form.values.image}
                    />
                    <Textarea
                        label="Content"
                        placeholder="Detailed description about your market..."
                        key={form.key('description')}
                        {...form.getInputProps('description')}
                        rows={5}
                    />
                    <TextInput
                        label="Website Link (URL)"
                        placeholder=""
                        key={form.key('link')}
                        {...form.getInputProps('link')}
                    />
                    <Group grow>
                        <NumberInput
                            withAsterisk
                            label="Latitude"
                            placeholder="e.g., 51.0447"
                            key={form.key('lat')}
                            {...form.getInputProps('lat')}
                            decimalScale={6}
                        />
                        <NumberInput
                            withAsterisk
                            label="Longitude"
                            placeholder="e.g., -114.0719"
                            key={form.key('lng')}
                            {...form.getInputProps('lng')}
                            decimalScale={6}
                        />
                    </Group>
                    <Group justify="flex-end" mt="xl">
                        <Button variant="outline" onClick={() => form.reset()} disabled={isSaving}>
                            Reset
                        </Button>
                        <Button
                            variant="filled"
                            color="red"
                            onClick={handleDeleteClick}
                            leftSection={<IconTrash size={16} />}
                            disabled={isSaving}
                        >
                            Delete Market
                        </Button>
                        <Button type="submit" leftSection={<IconEdit size={16} />} disabled={isSaving}>
                            Update Market
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Box>
    );
}