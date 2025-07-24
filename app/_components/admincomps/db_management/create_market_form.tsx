'use client'
import React, { useState,useEffect } from 'react';
import { Button, Checkbox, Group, TextInput, Textarea, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { isNotEmpty } from '@mantine/form';
import {MarketsInterface} from "@/app/_types/interfaces";
import { postMarket } from '@/app/_components/apicomps/marketpost';

// Define props for the form component
interface CreateMarketFormProps {
    onSubmissionSuccess: () => void; // Callback to notify parent component that a market was successfully posted
    onCancel: () => void; // Callback for when the user cancels
}

export default function CreateMarketForm() {

    const [editingMarket, setEditingMarket] = useState<MarketsInterface | undefined>(undefined);

    const form = useForm({
        mode: 'uncontrolled', // 'uncontrolled' is good for simple forms or when integrating with external state
        initialValues: {
        image: '',
        label: '',
        description: '',
        link: '',
        lat: 0.0,
        lng: 0.0,
        },

        // Define validation rules for each field
        validate: {
        image: (value) => (value && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value) ? 'Invalid URL for website link' : null), // Optional URL validation for image link
        label: isNotEmpty('Market Name is required'), // Label cannot be empty
        link: (value) => (value && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value) ? 'Invalid URL for website link' : null), // Optional URL validation for link
            lat: (value) => {
                if (value === null || value === undefined) {
                    return 'Latitude is required'; // Catches cases where NumberInput might return null/undefined
                }
                if (typeof value !== 'number' || isNaN(value)) {
                    return 'Latitude must be a number';
                }
                if (value < -90 || value > 90) {
                    return 'Latitude must be between -90 and 90';
                }
                return null;
            },
            lng: (value) => {
                if (value === null || value === undefined) {
                    return 'Longitude is required'; // Catches cases where NumberInput might return null/undefined
                }
                if (typeof value !== 'number' || isNaN(value)) {
                    return 'Longitude must be a number';
                }
                if (value < -180 || value > 180) {
                    return 'Longitude must be between -180 and 180';
                }
                return null;
            },
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            // For now, only handle POST functionality (creating a new market)
            const newMarket = await postMarket(values); // Call your new postMarket function
            console.log('New market created successfully:', newMarket);
            form.reset(); // Clear the form after successful submission
        } catch (error) {
            console.error('Error creating market:', error);
            // You might want to show an error notification to the user here
            // e.g., notifications.show({ message: 'Failed to create market', color: 'red' });
        }
    };

    // Populate form fields when a 'market' prop is provided (for editing)
    useEffect(() => {
        if (editingMarket) {
        form.setValues({
            image: editingMarket.image,
            label: editingMarket.label,
            description: editingMarket.description || '',
            link: editingMarket.link || '',
            lat: editingMarket.lat !== null ? Number(editingMarket.lat) : undefined, // Convert Decimal to Number, handle null
            lng: editingMarket.lng !== null ? Number(editingMarket.lng) : undefined, // Convert Decimal to Number, handle null
        });
        } else {
        // Reset form for a new market when 'market' prop is not provided or becomes null
        form.reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingMarket]); // Depend on 'market' prop

    const handleSave = () => {

    }

    const handleCancel = () => {
            
    }


    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
            withAsterisk
            label="Market Name"
            placeholder=""
            key={form.key('label')}
            {...form.getInputProps('label')}
            mb="md" // Margin bottom
        />

        <TextInput
            withAsterisk
            label="Image Link (URL)"
            placeholder=""
            key={form.key('image')}
            {...form.getInputProps('image')}
            mb="md"
        />

        <Textarea
            label="Content"
            placeholder="Detailed description about the market..."
            key={form.key('description')}
            {...form.getInputProps('description')}
            rows={5}
            mb="md"
        />

        <TextInput
            label="Website Link (URL)"
            placeholder=""
            key={form.key('link')}
            {...form.getInputProps('link')}
            mb="md"
        />

        <Group grow mb="md"> {/* Group for lat/lng to be side-by-side */}
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


        <Group justify="flex-end" mt="xl"> {/* Increased margin for buttons */}
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button type="submit">{editingMarket && editingMarket.id ? 'Update Market' : 'Create Market'}</Button>
        </Group>
        </form>
    );
}