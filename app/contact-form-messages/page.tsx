"use client";

import React, { useEffect, useState } from "react";
import {
  Title,
  Text,
  Center,
  Table,
  ScrollArea,
  TextInput,
  Paper,
  Container,
  Group,
  Loader,
  Space,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { ContactMessageInterface } from "../_types/interfaces";

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessageInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchContactMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:8080/contact");
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

  const filteredMessages = messages.filter((msg) =>
    `${msg.name} ${msg.email} ${msg.subject}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Center my="xl">
        <Loader />
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
    <Container size="lg" py="xl">
      <Paper shadow="md" radius="md" p="xl" withBorder bg="white">
        <Title order={2} mb="sm">
          Contact Messages
        </Title>

        <TextInput
          placeholder="Search by name, email, or subject"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          radius="md"
          size="md"
          mb="lg"
        />

        {filteredMessages.length === 0 ? (
          <Center>
            <Text>No contact messages found.</Text>
          </Center>
        ) : (
          <ScrollArea h={500} scrollbarSize={6}>
            <Table striped highlightOnHover withTableBorder withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Subject</Table.Th>
                  <Table.Th>Message</Table.Th>
                  <Table.Th>Date</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredMessages.map((message) => (
                  <Table.Tr key={message.id}>
                    <Table.Td>{message.name}</Table.Td>
                    <Table.Td>{message.email}</Table.Td>
                    <Table.Td>{message.subject}</Table.Td>
                    <Table.Td>{message.message}</Table.Td>
                    <Table.Td>
                      {new Date(message.created_at).toLocaleString()}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        )}
      </Paper>
    </Container>
  );
}
