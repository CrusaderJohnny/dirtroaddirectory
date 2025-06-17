"use client"; 
import React, { useEffect, useState } from 'react';
import { Title, Text, Center, Table, ScrollArea } from '@mantine/core'; 
import { ContactMessageInterface } from '../_types/interfaces'; 

export default function ContactMessagesPage() {
    const [messages, setMessages] = useState<ContactMessageInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContactMessages = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch('http://localhost:8080/contact'); 
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: ContactMessageInterface[] = await response.json();
                setMessages(data);
            } catch (e: any) {
                setError(`Failed to fetch contact messages: ${e.message}`);
                console.error("Fetch error:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchContactMessages();
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
        <Center>
            <div style={{ maxWidth: 1200, width: '100%', padding: '20px' }}>
                <Center my="xl">
                    <Title order={2}>Contact Messages</Title>
                </Center>

                {messages.length === 0 ? (
                    <Center>
                        <Text>No contact messages found.</Text>
                    </Center>
                ) : (
                    <ScrollArea>
                        <Table striped highlightOnHover withTableBorder withColumnBorders>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>ID</Table.Th>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Email</Table.Th>
                                    <Table.Th>Subject</Table.Th>
                                    <Table.Th>Message</Table.Th>
                                    <Table.Th>Date</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {messages.map((message) => (
                                    <Table.Tr key={message.id}>
                                        <Table.Td>{message.id}</Table.Td>
                                        <Table.Td>{message.name}</Table.Td>
                                        <Table.Td>{message.email}</Table.Td>
                                        <Table.Td>{message.subject}</Table.Td>
                                        <Table.Td>{message.message}</Table.Td>
                                        <Table.Td>{new Date(message.created_at).toLocaleString()}</Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </ScrollArea>
                )}
            </div>
        </Center>
    );
}