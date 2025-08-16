'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
    Paper,
    TextInput,
    Button,
    Flex,
    Text,
    Loader,
    Box,
    ScrollArea,
    useMantineTheme, ActionIcon,
} from '@mantine/core';
import {MarketsInterface, Message, VendorsInterface} from "@/app/_types/interfaces";
import {IconArrowsMaximize, IconArrowsMinimize, IconMessageCircle, IconX} from "@tabler/icons-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Main ChatbotOverlay
const ChatbotOverlay: React.FC = () => {
    // State to control chat pop up
    const [isChatReal, setIsChatReal] = useState(false);
    // State for the current user input
    const [input, setInput] = useState<string>("");
    // State to indicate if the assistant is currently generating a response
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // State to indicate if initial system message was loaded
    const hasAddedSystemMessage = useRef<boolean>(false);
    // Ref for auto-scrolling to the bottom of the chat
    const scrollViewAreaRef = useRef<HTMLDivElement>(null);
    // State for enlarging chat
    const [isLarge, setIsLarge] = useState<boolean>(false);

    // Get Mantine theme for custom styling
    const theme = useMantineTheme();

    const [markets, setMarkets] = useState<MarketsInterface[]>([]);
    const [vendors, setVendors] = useState<VendorsInterface[]>([]);

    // State to hold the chat messages
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hello! I'm FarmHand, an AI to help you find information. How can I help you today?" },
    ]);

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const response = await fetch('/api/markets');
                if(!response.ok) {
                    console.error(`HTTP error! Status: ${response.status}`);
                }
                const data: MarketsInterface[] = await response.json();
                setMarkets(data);
            } catch (error) {
                console.error("Error fetching markets:", error);
            }
        };
        const fetchVendorData = async () => {
            try {
                const response = await fetch('/api/vendors');
                if(!response.ok) {
                    console.error(`HTTP error! Status: ${response.status}`);
                }
                const data: VendorsInterface[] = await response.json();
                setVendors(data);
            } catch (error) {
                console.error("Error fetching vendors:", error);
            }
        };
        fetchMarketData();
        fetchVendorData();
    }, []);

    useEffect(() => {
        if(markets.length > 0 && vendors.length > 0 && !hasAddedSystemMessage.current) {
            const date = new Date();
            const systemMessage: Message = {
                role: "system",
                content: `
                    You are a specialized AI assistant that provides information about farmers' markets and vendors.
                    You must ONLY use the provided JSON data to answer user questions.
                    If a user asks for information that is not in the data, politely state that you do not have that information.
                    Do not guess, make up, or hallucinate information.
                    Here is the data you must use:\n\nMarkets: ${JSON.stringify(markets)}\nVendors: ${JSON.stringify(vendors)}
                    Here is today's date as well: ${date}.
                `
            };
            setMessages(prevMessages => [systemMessage, ...prevMessages]);
            hasAddedSystemMessage.current = true;
        }
    }, [markets, vendors]);

    /**
     * Handles sending a user message to the chatbot.
     * Updates chat history, makes the API call, and processes streaming responses.
     * @param userMessage The message sent by the user.
     */
    const sendMessage = async (userMessage: string) => {
        // Prevent sending empty messages
        if (!userMessage.trim()) return;
        // Add the user's message to the chat history
        const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
        setMessages(newMessages);
        setInput(""); // Clear the input field
        setIsLoading(true); // Set loading state to true

        try {
            // Make the API call to Azure OpenAI for chat completions
            const apiUrl = `${window.location.origin}/api/chat`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({messages: newMessages}),
            });
            if(!response.ok) {
                let errorMessage = 'An Unknown error occurred.';
                const contentType = response.headers.get('content-type');

                if(contentType && contentType.includes('application/json')) {
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.error || `Server error: ${response.status}`;
                    } catch (jsonParseError) {
                        console.error("Failed to parse JSON error response: ", jsonParseError);
                        errorMessage = `Server responded with status ${response.status}, but JSON was invalid`;
                    }
                }
                setMessages(prev => [...prev, {role: 'assistant', content: `Error: ${errorMessage}` }]);
                setIsLoading(false);
                return;
            }
            const reader = response.body?.getReader();
            if(!reader) {
                console.error("Failed to get readable stream from response");
                setMessages(prev => [...prev, {role: 'assistant', content: "Error: Failed to get streaming response."}]);
                setIsLoading(false);
                return;
            }
            let assistantResponse = "";
            setMessages(prev => [...prev, { role: "assistant", content: ""}]);
            while (true) {
                const { done, value } = await reader.read();
                if(done) break;
                const chunk = new TextDecoder().decode(value);
                assistantResponse += chunk;

                setMessages(prev => {
                    const lastMessage = prev[prev.length-1];
                    if(lastMessage.role === 'assistant') {
                        return [...prev.slice(0,-1), {...lastMessage, content: assistantResponse}];
                    }
                    return prev;
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            // Display an error message to the user if the API call fails
            setMessages(prev => [...prev, { role: "assistant", content: `Error: ${error instanceof Error ? error.message : String(error)}` }]);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    // Effect to scroll to the bottom of the chat whenever messages change
    useEffect(() => {
        if(isChatReal && scrollViewAreaRef.current) {
            scrollViewAreaRef.current.scrollTo({
                top: scrollViewAreaRef.current.scrollHeight,
                behavior: 'smooth',
            })
        }
    }, [messages, isChatReal]);

    // Handle Enter key press in the input field
    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isLoading) {
            await sendMessage(input);
        }
    };

    return (
        <>
            <ActionIcon
                variant="filled"
                color={theme.colors.primaryGreen[4]}
                size="xl"
                radius="xl"
                onClick={() => setIsChatReal((prev) => !prev)}
                style={{
                    position: 'fixed',
                    bottom: '1rem',
                    right: '1rem',
                    zIndex: 51,
                    boxShadow: theme.shadows.xl,
                }}
            >
                {isChatReal ? <IconX size={24} /> : <IconMessageCircle size={24} />}
            </ActionIcon>
            {isChatReal && (
            <Paper
                shadow="xl"
                radius="lg"
                p="md"
                style={{
                    position: 'fixed',
                    width: isLarge ? '80vw' : '26rem',
                    height: isLarge ? '80vh' : '35rem',
                    top: isLarge ? '50%' : 'auto',
                    left: isLarge ? '50%' : 'auto',
                    bottom: isLarge ? 'auto' : '1rem',
                    right: isLarge ? 'auto' : '1rem',
                    transform: isLarge ? 'translate(-50%, -50%)' : 'none',
                    zIndex: 50,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    transition: 'width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease, transform 0.3s ease',
                }}
            >
                {/* Header with expand/minimize and close buttons */}
                <Flex
                    justify="flex-end"
                    gap="xs"
                    p="sm"
                    style={{ position: 'absolute', top: 0, right: 0, zIndex: 52 }}
                >
                    {/* Expand/Minimize Button */}
                    <ActionIcon
                        variant="subtle"
                        color="gray"
                        size="md"
                        radius="xl"
                        onClick={() => setIsLarge((prev) => !prev)}
                        aria-label={isLarge ? "Minimize chat window" : "Maximize chat window"}
                    >
                        {isLarge ? <IconArrowsMinimize size={18} /> : <IconArrowsMaximize size={18} />}
                    </ActionIcon>

                    {/* Close Button */}
                    <ActionIcon
                        variant="subtle"
                        color="red"
                        size="md"
                        radius="xl"
                        onClick={() => {
                            setIsChatReal(false);
                            setIsLarge(false);
                        }}
                        aria-label="Close chat window"
                    >
                        <IconX size={18} />
                    </ActionIcon>
                </Flex>
                {/* Chat messages display area using Mantine ScrollArea */}
                <ScrollArea
                    style={{ flexGrow: 1, padding: '1rem' }}
                    viewportRef={scrollViewAreaRef}
                >
                    {messages.map((msg, index) => (
                        msg.role !== 'system' && (
                        <Flex
                            key={index}
                            mb="sm"
                            justify={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                        >
                            <Box
                                style={{
                                    display: 'inline-block',
                                    padding: theme.spacing.sm,
                                    borderRadius: theme.radius.xl,
                                    maxWidth: '80%',
                                    wordBreak: 'break-word',
                                    boxShadow: theme.shadows.xs,
                                    backgroundColor: msg.role === 'user' ? theme.colors.primaryGreen[5] : theme.colors.accentRed[0],
                                    color: msg.role === 'user' ? theme.white : theme.colors.gray[8],
                                    ...(msg.role === 'user' ? {
                                        borderBottomRightRadius: 0,
                                        paddingLeft: theme.spacing.sm,
                                        paddingRight: theme.spacing.sm,
                                    } : {
                                        borderBottomLeftRadius: 0,
                                        paddingLeft: theme.spacing.md,
                                        paddingRight: theme.spacing.md,
                                    }),
                                    '& p': {
                                        margin: 0,
                                    },
                                    '& a': {
                                        color: msg.role === 'user' ? theme.white : theme.colors.blue[6],
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {msg.content}
                                </ReactMarkdown>
                            </Box>
                        </Flex>
                        )
                    ))}
                    {/* Loading indicator */}
                    {isLoading && (
                        <Flex justify="flex-start" mb="sm">
                            <Text
                                style={{
                                    display: 'inline-block',
                                    padding: theme.spacing.sm,
                                    borderRadius: theme.radius.xl,
                                    backgroundColor: theme.colors.gray[2],
                                    color: theme.colors.gray[8],
                                    boxShadow: theme.shadows.xs,
                                    borderBottomLeftRadius: 0,
                                }}
                            >
                                <Loader size="sm" mr="xs" /> Typing...
                            </Text>
                        </Flex>
                    )}
                </ScrollArea>

                {/* Input and send button area */}
                <Box
                    p="md" // p-4
                    style={{ borderTop: '1px solid var(--mantine-color-gray-2)', backgroundColor: 'var(--mantine-color-gray-0)' }}
                >
                    <TextInput
                        placeholder="Type your message..."
                        value={input}
                        onChange={(event) => setInput(event.currentTarget.value)}
                        onKeyDown={handleKeyPress}
                        disabled={isLoading}
                        size="md"
                        radius="md"
                        styles={(theme) => ({
                            input: {
                                borderColor: theme.colors.gray[3],
                                '&:focusWithin': {
                                    borderColor: theme.colors.primaryGreen[4],
                                    boxShadow: `0 0 0 1px ${theme.colors.blue[5]}`,
                                },
                            },
                        })}
                    />
                    <Button
                        mt="md"
                        fullWidth
                        onClick={() => sendMessage(input)}
                        disabled={isLoading}
                        variant="filled"
                        color={theme.colors.primaryGreen[6]}
                        size="lg"
                        radius="md"
                        style={{
                            boxShadow: theme.shadows.sm,
                        }}
                    >
                        Send Message
                    </Button>
                </Box>
            </Paper>
            )}
        </>
    );
};

export default ChatbotOverlay;
