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
  Loader,
  Group,
  Modal,
  ActionIcon,
} from "@mantine/core";
import { IconSearch, IconEye, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import { ContactMessageInterface } from "../../_types/interfaces";

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessageInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageInterface | null>(null);

  const fetchContactMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:8080/contact");
      if (!response.ok) {
        setError(`HTTP error! status: ${response.status}`);
        return;
      }
      const data: ContactMessageInterface[] = await response.json();
      data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setMessages(data);
    } catch (e) {
      setError(`Failed to fetch contact messages: ${e instanceof Error ? e.message : 'Failed to fetch contact messages.'}`);
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactMessages();
  }, []);

  const filteredMessages = messages.filter((msg) =>
    `${msg.name} ${msg.email} ${msg.subject} ${msg.message}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (message: ContactMessageInterface) => {
    setSelectedMessage(message);
    open();
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8080/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      } else {
        const errData = await res.json();
        alert(`Failed to delete: ${errData.message}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred while deleting.");
    }
  };

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
          placeholder="Search by name, email, subject, or message"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          radius="md"
          size="md"
          mb="lg"
        />

        {filteredMessages.length === 0 ? (
          <Center>
            <Text>No contact messages found matching your search.</Text>
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
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredMessages.map((message) => (
                  <Table.Tr key={message.id}>
                    <Table.Td>{message.name}</Table.Td>
                    <Table.Td>{message.email}</Table.Td>
                    <Table.Td>{message.subject}</Table.Td>
                    <Table.Td>{message.message.substring(0, 50)}...</Table.Td>
                    <Table.Td>{new Date(message.created_at).toLocaleString()}</Table.Td>
                    <Table.Td>
                      <Group gap="xs" justify="center" wrap="nowrap">
                        <ActionIcon
                          variant="light"
                          color="blue"
                          onClick={() => handleViewDetails(message)}
                          title="View Details"
                        >
                          <IconEye size={18} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="red"
                          onClick={() => handleDelete(message.id)}
                          title="Delete Message"
                        >
                          <IconTrash size={18} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        )}
      </Paper>

      {/* Message Details Modal */}
      <Modal opened={opened} onClose={close} title="Message Details" centered size="lg">
        {selectedMessage && (
          <ScrollArea h={400}>
            <Text fw={700} mb="xs">From: {selectedMessage.name} &lt;{selectedMessage.email}&gt;</Text>
            <Text fw={700} mb="xs">Subject: {selectedMessage.subject}</Text>
            <Text c="dimmed" mb="md" size="sm">Received: {new Date(selectedMessage.created_at).toLocaleString()}</Text>
            <Text style={{ whiteSpace: 'pre-wrap' }}>{selectedMessage.message}</Text>
          </ScrollArea>
        )}
      </Modal>
    </Container>
  );
}
