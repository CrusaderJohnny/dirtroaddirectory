'use client'; // This directive makes this a client component

import React, { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button, Stack, Group, Text, Card } from '@mantine/core';
//import { notifications } from '@mantine/notifications'; will need to install
import { setRole, removeRole } from './_actions';
import {UserRoleActionsProps} from "@/app/_types/interfaces";

// Define the type for the action's return state
type ActionState = {
    message: string;
    success: boolean;
};

// Initial state for useFormState
const initialState: ActionState = {
    message: '',
    success: true,
};

// Component to display a simple pop-up message
function MessagePopup({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
    if (!message) return null;

    return (
        <Card
            shadow="md"
            padding="lg"
            radius="md"
            withBorder
            style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 1000,
                backgroundColor: type === 'success' ? '#d4edda' : '#f8d7da',
                color: type === 'success' ? '#155724' : '#721c24',
                borderColor: type === 'success' ? '#c3e6cb' : '#f5c6cb',
                width: 'auto',
                maxWidth: 300,
                cursor: 'pointer', // Make it clickable to close
            }}
            onClick={onClose}
        >
            <Group justify="space-between">
                <Text size="sm" fw={500}>{message}</Text>
                {/* You can add an explicit close button here if preferred */}
                <Text size="sm" onClick={onClose} style={{ cursor: 'pointer' }}>&times;</Text>
            </Group>
        </Card>
    );
}

// Component for the submit button to show pending state
function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Processing...' : label}
        </Button>
    );
}

export default function UserRoleActions({ userId}: UserRoleActionsProps) {
    // useFormState for setRole
    const [setRoleState, setRoleFormAction] = useFormState<ActionState, FormData>(setRole, initialState);
    // useFormState for removeRole
    const [removeRoleState, removeRoleFormAction] = useFormState<ActionState, FormData>(removeRole, initialState);

    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState<'success' | 'error'>('success');

    // Effect to show pop-up when setRoleState changes
    useEffect(() => {
        if (setRoleState.message) {
            setPopupMessage(setRoleState.message);
            setPopupType(setRoleState.success ? 'success' : 'error');
            const timer = setTimeout(() => {
                setPopupMessage(''); // Hide after 3 seconds
            }, 3000);
            return () => clearTimeout(timer); // Cleanup timer
        }
    }, [setRoleState]);

    // Effect to show pop-up when removeRoleState changes
    useEffect(() => {
        if (removeRoleState.message) {
            setPopupMessage(removeRoleState.message);
            setPopupType(removeRoleState.success ? 'success' : 'error');
            const timer = setTimeout(() => {
                setPopupMessage(''); // Hide after 3 seconds
            }, 3000);
            return () => clearTimeout(timer); // Cleanup timer
        }
    }, [removeRoleState]);

    const handleClosePopup = () => {
        setPopupMessage('');
    };

    return (
        <Stack>
            {/* Form for Make Admin */}
            <form action={setRoleFormAction}>
                <input type="hidden" value={userId} name="id" />
                <input type="hidden" value="admin" name="role" />
                <SubmitButton label="Make Admin" />
            </form>

            {/* Form for Make Moderator */}
            <form action={setRoleFormAction}>
                <input type="hidden" value={userId} name="id" />
                <input type="hidden" value="moderator" name="role" />
                <SubmitButton label="Make Moderator" />
            </form>

            {/* Form for Remove Role */}
            <form action={removeRoleFormAction}>
                <input type="hidden" value={userId} name="id" />
                <SubmitButton label="Remove Role" />
            </form>

            {/* Pop-up message display */}
            <MessagePopup message={popupMessage} type={popupType} onClose={handleClosePopup} />
        </Stack>
    );
}
