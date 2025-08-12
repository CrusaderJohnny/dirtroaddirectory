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
  SegmentedControl, AppShellFooter,
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
import {
  fetchContactMessages,
  deleteContactMessage,
  fetchStarredMessageIds,
  starMessage,
  unstarMessage,
  fetchReadMessageIds,
  markMessageAsRead,
  markMessageAsUnread,
} from "@/app/_components/apicomps/fetchContactMessages";

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessageInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageInterface | null>(null);
  const [readMessages, setReadMessages] = useState<Set<number>>(new Set());
  const [starredMessages, setStarredMessages] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<"all" | "starred">("all");

  useEffect(() => {
    const loadInitialData = async () => {
        try {
            setLoading(true);
            const [messagesData, starredIds, readIds] = await Promise.all([
                fetchContactMessages(),
                fetchStarredMessageIds(),
                fetchReadMessageIds(), 
            ]);
            setMessages(messagesData);
            setStarredMessages(new Set(starredIds));
            setReadMessages(new Set(readIds)); 
        } catch (e) {
            setError((e as Error).message || "Failed to fetch messages.");
        } finally {
            setLoading(false);
        }
    };
    loadInitialData();
  }, []); // The empty dependency array means this runs only once on mount

  const filteredMessages = messages
    .filter((msg) =>
      `${msg.name} ${msg.email} ${msg.subject} ${msg.message}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((msg) => (filter === "starred" ? starredMessages.has(msg.id) : true));

  const handleViewDetails = async (message: ContactMessageInterface) => {
    setSelectedMessage(message);
    open();
    if (!readMessages.has(message.id)) {
      try {
        await markMessageAsRead(message.id);
        setReadMessages((prev) => new Set(prev).add(message.id));
      } catch (e) {
        console.error("Failed to mark message as read:", e);
      }
    }
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
  
  const handleStarToggle = async (id: number, isStarred: boolean) => {
    try {
      if (isStarred) {
        await unstarMessage(id);
      } else {
        await starMessage(id);
      }
      setStarredMessages((prev) => {
        const updated = new Set(prev);
        if (isStarred) updated.delete(id);
        else updated.add(id);
        return updated;
      });
    } catch (error) {
      alert(`Failed to update star status: ${error instanceof Error ? error.message : "An error occurred."}`);
    }
  };
  
  const handleReadToggle = async (id: number, isRead: boolean) => {
    try {
      if (isRead) {
        await markMessageAsUnread(id);
        setReadMessages((prev) => {
          const updated = new Set(prev);
          updated.delete(id);
          return updated;
        });
      } else {
        await markMessageAsRead(id);
        setReadMessages((prev) => {
          const updated = new Set(prev);
          updated.add(id);
          return updated;
        });
      }
    } catch (error) {
      alert(`Failed to update read status: ${error instanceof Error ? error.message : "An error occurred."}`);
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

            <Group justify="space-between" mb="lg" align="flex-start" wrap="wrap" gap="sm">
              <TextInput
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
                leftSection={<IconSearch size={16} />}
                radius="md"
                size="md"
                style={{ flexGrow: 1, minWidth: 250 }}
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
                          onClick={() => handleStarToggle(msg.id, isStarred)}
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

                      <Group gap="xs" style={{ flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                        <Text size="xs" c="dimmed">
                          {new Date(msg.created_at).toLocaleString()}
                        </Text>

                        {isRead && (
                          <ActionIcon
                            variant="light"
                            color="gray"
                            onClick={() => handleReadToggle(msg.id, isRead)}
                            title="Mark as Unread"
                          >
                            <IconMail size={18} />
                          </ActionIcon>
                        )}
                        {!isRead && (
                          <ActionIcon
                            variant="light"
                            color="gray"
                            onClick={() => handleReadToggle(msg.id, isRead)}
                            title="Mark as Read"
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
                <Text fw={700} mb="xs">
                  Subject: {selectedMessage.subject}
                </Text>
                <Text c="dimmed" mb="md" size="sm">
                  Received: {new Date(selectedMessage.created_at).toLocaleString()}
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
      <AppShellFooter>
        <Center>
          <Button variant={'light'} component={'a'} href={'/admin'}>
            Return to Admin Page
          </Button>
        </Center>
      </AppShellFooter>
    </AppShell>
  );
}
