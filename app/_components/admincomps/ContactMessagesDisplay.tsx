"use client";

import React, { useEffect, useState } from 'react';
import {
    Table, 
    Text,
    Title, 
    Center, 
} from '@mantine/core'; 
import { fetchContactMessages } from '../apicomps/fetchContactMessages';
import { ContactMessageInterface } from '../../_types/interfaces';

export default function ContactMessagesDisplay() {
    const [messages, setMessages] = useState<ContactMessageInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const data = await fetchContactMessages();
                setMessages(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getMessages(); 
    }, []); 

    if (loading) {
        return (
            <Center my="xl">
                <Text>Loading contact messages...</Text>
            </Center>
        );
    }

    if (error) {
        return (
            <Center my="xl">
                <Text c="red">Error: {error}</Text>
            </Center>
        );
    }

    return (
        <>
            <Center my="xl">
                <Title order={2}>Contact Messages</Title>
            </Center>

            <Center>
                {messages.length === 0 ? (
                    <Text>No contact messages found.</Text>
                ) : (
                    <Table striped highlightOnHover withTableBorder withColumnBorders>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>ID</Table.Th>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Email</Table.Th>
                                <Table.Th>Subject</Table.Th>
                                <Table.Th>Message</Table.Th>
                                <Table.Th>Received At</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {messages.map((msg) => (
                                <Table.Tr key={msg.id}>
                                    <Table.Td>{msg.id}</Table.Td>
                                    <Table.Td>{msg.name}</Table.Td>
                                    <Table.Td>{msg.email}</Table.Td>
                                    <Table.Td>{msg.subject || 'N/A'}</Table.Td>
                                    <Table.Td style={{ maxWidth: '300px', wordBreak: 'break-word' }}>{msg.message}</Table.Td>
                                    <Table.Td>{new Date(msg.created_at).toLocaleString()}</Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                )}
            </Center>
        </>
    );
}