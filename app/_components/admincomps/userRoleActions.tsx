'use client'; // This directive makes this a client component

import React, { useEffect, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import {Button, Stack, Group, Text, Card} from '@mantine/core';
import {setRole, removeRole, setIsMarket, removeIsMarket, setIsVendor, removeIsVendor} from './_actions';
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
        <Button ml={'5rem'} w={'10rem'} type="submit" disabled={pending}>
            {pending ? 'Processing...' : label}
        </Button>
    );
}

export default function UserRoleActions({ userId, buttonType }: UserRoleActionsProps) {
    // useFormState for setRole
    const [setRoleState, setRoleFormAction] = useActionState<ActionState, FormData>(setRole, initialState);
    // useFormState for removeRole
    const [removeRoleState, removeRoleFormAction] = useActionState<ActionState, FormData>(removeRole, initialState);
    const [setIsMarketState, setIsMarketFormAction] = useActionState<ActionState, FormData>(setIsMarket, initialState);
    const [removeIsMarketState, removeIsMarketFormAction] = useActionState<ActionState, FormData>(removeIsMarket, initialState);
    const [setIsVendorState, setIsVendorFormAction] = useActionState<ActionState, FormData>(setIsVendor, initialState);
    const [removeIsVendorState, removeIsVendorFormAction] = useActionState<ActionState, FormData>(removeIsVendor, initialState);

    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState<'success' | 'error'>('success');

    const showPopupEffect = (state: ActionState) => {
        if(state.message){
            setPopupMessage(state.message);
            setPopupType(state.success ? 'success' : 'error');
            const timer = setTimeout(() => {
                setPopupMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    };

    useEffect(() => showPopupEffect(setRoleState), [setRoleState]);
    useEffect(() => showPopupEffect(removeRoleState), [removeRoleState]);
    useEffect(() => showPopupEffect(setIsMarketState), [setIsMarketState]);
    useEffect(() => showPopupEffect(removeIsMarketState), [removeIsMarketState]);
    useEffect(() => showPopupEffect(setIsVendorState), [setIsVendorState]);
    useEffect(() => showPopupEffect(removeIsVendorState), [removeIsVendorState]);

    const handleClosePopup = () => {
        setPopupMessage('');
    };

    if(buttonType ==='Admin') {
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
                <MessagePopup message={popupMessage} type={popupType} onClose={handleClosePopup} />
            </Stack>
        )
    }

    if(buttonType ==='Market') {
        return (
            <Stack>
                {/* Form to Set Market, hopefully */}
                <form action={setIsMarketFormAction}>
                    <input type="hidden" value={userId} name="id" />
                    <input type="hidden" value="true" name="isMarket" />
                    <SubmitButton label={"Make Market"} />
                </form>

                {/* Remove Is Market */}
                <form action={removeIsMarketFormAction}>
                    <input type="hidden" value={userId} name="id" />
                    <SubmitButton label={'Remove Market'} />
                </form>
                <MessagePopup message={popupMessage} type={popupType} onClose={handleClosePopup} />
            </Stack>
        )
    }
    if(buttonType ==='Vendor') {
        return (
            <Stack w={'15rem'}>
                {/* Set Is Vendor */}
                <form action={setIsVendorFormAction}>
                    <input type="hidden" value={userId} name="id" />
                    <input type="hidden" value="true" name="isVendor" />
                    <SubmitButton label="Make Vendor" />
                </form>

                {/* Remove Is Vendor */}
                <form action={removeIsVendorFormAction}>
                    <input type="hidden" value={userId} name="id" />
                    <SubmitButton label={'Remove Vendor'}/>
                </form>

                {/* Pop-up message display */}
                <MessagePopup message={popupMessage} type={popupType} onClose={handleClosePopup} />
            </Stack>
        )
    }
}
