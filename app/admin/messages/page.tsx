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
  Button,
  SegmentedControl,
} from "@mantine/core";
import {
  IconSearch,
  IconTrash,
  IconMail,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ContactMessageInterface } from "../../_types/interfaces";
import NavMT from "@/app/_components/navcomps/navmt";
import { fetchContactMessages, deleteContactMessage } from "@/app/_components/apicomps/fetchContactMessages";

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessageInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessageInterface | null>(null);
  const [readMessages, setReadMessages] = useState<Set<number>>(new Set());
  const [starredMessages, setStarredMessages] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<"all" | "starred">("all");

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await fetchContactMessages();
      setMessages(data);
    } catch (e) {
      setError((e as Error).message || "Failed to fetch contact messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const filteredMessages = messages
    .filter((msg) =>
      `${msg.name} ${msg.email} ${msg.subject} ${msg.message}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((msg) => (filter === "starred" ? starredMessages.has(msg.id) : true));

  const handleViewDetails = (message: ContactMessageInterface) => {
    setSelectedMessage(message);
    setReadMessages((prev) => new Set(prev).add(message.id));
    open();
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;

    try {
      await deleteContactMessage(id);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      setReadMessages((prev) => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
      setStarredMessages((prev) => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
    } catch (err) {
      alert((err as Error).message || "An error occurred while deleting.");
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
            <Title order={2} mb="sm">
              Contact Messages
            </Title>

            <Group justify="space-between" mb="lg">
              <TextInput
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
                leftSection={<IconSearch size={16} />}
                radius="md"
                size="md"
              />

              <SegmentedControl
                value={filter}
                onChange={(val) => setFilter(val as "all" | "starred")}
                data={[
                  { label: "All", value: "all" },
                  { label: "Starred", value: "starred" },
                ]}
              />
            </Group>

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
                  const isStarred = starredMessages.has(msg.id);
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
                      {/* Star + Name block */}
                      <Box
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontWeight: isRead ? 400 : 700,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ActionIcon
                          variant="light"
                          color="yellow"
                          title={isStarred ? "Unstar" : "Star"}
                          onClick={() => {
                            setStarredMessages((prev) => {
                              const updated = new Set(prev);
                              if (isStarred) updated.delete(msg.id);
                              else updated.add(msg.id);
                              return updated;
                            });
                          }}
                        >
                          {isStarred ? <IconStarFilled size={18} /> : <IconStar size={18} />}
                        </ActionIcon>
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
                        style={{ flexShrink: 0 }}
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
            <>
              <ScrollArea h={400}>
                <Text fw={700} mb="xs">
                  From: {selectedMessage.name} &lt;{selectedMessage.email}&gt;
                </Text>
                <Text fw={700} mb="xs">Subject: {selectedMessage.subject}</Text>
                <Text c="dimmed" mb="md" size="sm">
                  Received:{" "}
                  {new Date(selectedMessage.created_at).toLocaleString()}
                </Text>
                <Text style={{ whiteSpace: "pre-wrap" }}>
                  {selectedMessage.message}
                </Text>
              </ScrollArea>

              <Group justify="end" mt="md">
                <Button
                  component="a"
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                    selectedMessage.subject || ""
                  )}`}
                  variant="outline"
                  radius="xl"
                  color="blue"
                  leftSection={<IconMail size={18} />}
                >
                  Reply
                </Button>
              </Group>
            </>
          )}
        </Modal>
      </AppShellMain>
    </AppShell>
  );
}
