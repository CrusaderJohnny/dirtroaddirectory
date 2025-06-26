"use client";

import {ImageUploaderProps} from "@/app/_types/interfaces";
import {Box, Button, Image, Text, useMantineTheme} from "@mantine/core";
import {useEffect, useState} from "react";
import {CldUploadButton, CloudinaryUploadWidgetResults} from "next-cloudinary";

export default function ImageUploader({
    onImageUploadAction,
    initialImage,
    signatureEndpoint,
    label = "Include an Image",
    uploadButtonText = "Upload Image",
}: ImageUploaderProps) {
    const theme = useMantineTheme();
    const [imageUrl, setImageUrl] = useState<string | null>(initialImage || null);

    useEffect(() => {
        setImageUrl(initialImage || null);
    }, [initialImage]);

    const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
        if (typeof result.info === 'object' && result.info !== null && 'secure_url' in result.info) {
            const uploadUrl = result.info.secure_url as string;
            setImageUrl(uploadUrl);
            onImageUploadAction(uploadUrl);
        }
    };

    const handleClearImage = () => {
        setImageUrl(null);
        onImageUploadAction(null);
    };
    return (
        <Box mb="md">
            <Text size="sm" mb="xs">{label}</Text>
            <CldUploadButton
                signatureEndpoint={signatureEndpoint}
                onSuccess={handleUploadSuccess}
                onQueuesEnd={(_result, {widget}) => {
                    widget.close();
                }}
                >
                {uploadButtonText}
            </CldUploadButton>
            {imageUrl && (
                <Button
                    variant={'subtle'}
                    color={theme.colors.accentRed[4]}
                    onClick={handleClearImage}
                    mt={'xs'}
                    >
                    Clear Image
                </Button>
            )}
            {imageUrl && (
                <Box mt={'md'}>
                    <Text size={'sm'} mb={'xs'}>Preview</Text>
                    <Image
                        src={imageUrl}
                        alt={"Image Preview"}
                        radius={'md'}
                        maw={300}
                        fit={'contain'}
                        style={{border: '1px solid #ccc', padding: '0.5rem'}}
                    />
                </Box>
            )}
        </Box>
    )
}