"use client";

import React, { useEffect, useState } from "react";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Title,
  Text,
  Center,
  Paper,
  Container,
  Loader,
  TextInput,
  Group,
  Modal,
  ScrollArea,
  ActionIcon,
  Box,
} from "@mantine/core";
import { IconSearch, IconTrash, IconMail } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ContactMessageInterface } from "../../_types/interfaces";
import NavMT from "@/app/_components/navcomps/navmt";

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessageInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageInterface | null>(null);
  const [readMessages, setReadMessages] = useState<Set<number>>(new Set());

  const fetchContactMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/contact");
      if (!response.ok) {
        setError(`HTTP error! status: ${response.status}`);
        return;
      }
      const data = await response.json();
      data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setMessages(data);
    } catch (e) {
      setError("Failed to fetch contact messages.");
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactMessages();
  }, []);

  const filteredMessages = messages.filter((msg) =>
    `${msg.name} ${msg.email} ${msg.subject} ${msg.message}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (message: ContactMessageInterface) => {
    setSelectedMessage(message);
    setReadMessages((prev) => new Set(prev).add(message.id));
    open();
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8080/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
        setReadMessages((prev) => {
          const updated = new Set(prev);
          updated.delete(id);
          return updated;
        });
      } else {
        const errData = await res.json();
        alert(`Failed to delete: ${errData.message}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred while deleting.");
    }
  };

  return (
    <AppShell>
      <AppShellHeader>
        <NavMT />
      </AppShellHeader>

      <AppShellMain style={{ minHeight: "100vh" }}>
        <Container size="lg" py="xl">
          <Paper shadow="md" radius="md" p="xl" withBorder bg="white">
            <Title order={2} mb="sm">Contact Messages</Title>

            <TextInput
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              leftSection={<IconSearch size={16} />}
              radius="md"
              size="md"
              mb="lg"
            />

            {loading ? (
              <Center my="xl">
                <Loader />
              </Center>
            ) : error ? (
              <Center my="xl">
                <Text c="red">Error: {error}</Text>
              </Center>
            ) : filteredMessages.length === 0 ? (
              <Center>
                <Text>No contact messages found matching your search.</Text>
              </Center>
            ) : (
              <ScrollArea h={500}>
                {filteredMessages.map((msg) => {
                  const isRead = readMessages.has(msg.id);
                  return (
                    <Box
                      key={msg.id}
                      px="md"
                      py="sm"
                      className="message-row"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        borderBottom: "1px solid #eee",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease",
                      }}
                      onClick={() => handleViewDetails(msg)}
                    >
                      <Box style={{ flex: 1, fontWeight: isRead ? 400 : 700 }}>
                        {msg.name}
                      </Box>

                      <Box style={{ flex: 4 }}>
                        <Text size="sm" lineClamp={1} fw={isRead ? 400 : 700}>
                          {msg.subject} – {msg.message}
                        </Text>
                      </Box>

                      <Group
                        gap="xs"
                        className="message-actions"
                        style={{
                          flexShrink: 0,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Text size="xs" c="dimmed">
                          {new Date(msg.created_at).toLocaleString()}
                        </Text>

                        {isRead && (
                          <ActionIcon
                            variant="light"
                            color="gray"
                            onClick={() => {
                              setReadMessages((prev) => {
                                const updated = new Set(prev);
                                updated.delete(msg.id);
                                return updated;
                              });
                            }}
                            title="Mark as Unread"
                          >
                            <IconMail size={18} />
                          </ActionIcon>
                        )}

                        <ActionIcon
                          variant="light"
                          color="red"
                          onClick={() => handleDelete(msg.id)}
                          title="Delete"
                        >
                          <IconTrash size={18} />
                        </ActionIcon>
                      </Group>
                    </Box>
                  );
                })}
              </ScrollArea>
            )}
          </Paper>
        </Container>

        <Modal opened={opened} onClose={close} title="Message Details" centered size="lg">
          {selectedMessage && (
            <ScrollArea h={400}>
              <Text fw={700} mb="xs">From: {selectedMessage.name} &lt;{selectedMessage.email}&gt;</Text>
              <Text fw={700} mb="xs">Subject: {selectedMessage.subject}</Text>
              <Text c="dimmed" mb="md" size="sm">
                Received: {new Date(selectedMessage.created_at).toLocaleString()}
              </Text>
              <Text style={{ whiteSpace: "pre-wrap" }}>{selectedMessage.message}</Text>
            </ScrollArea>
          )}
        </Modal>
      </AppShellMain>
    </AppShell>
  );
}
