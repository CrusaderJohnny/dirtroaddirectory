"use client";

import {
  AppShell,
  Card,
  Container,
  Title,
  Text,
  TextInput,
  Textarea,
  Button,
  Grid,
  Space,
  Modal,
  Accordion,
} from '@mantine/core';
import { useForm, hasLength, isEmail } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import NavMT from '@/app/_components/navcomps/navmt';

const API_BASE_URL = 'http://localhost:8080';

export default function Page() {
  const [opened, { open, close }] = useDisclosure(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: hasLength({ min: 3 }, 'Name must be at least 3 characters'),
      email: isEmail('Invalid email address'),
      message: hasLength({ min: 5 }, 'Message must be at least 5 characters'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setSubmitError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to send message.' }));
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      open();
      form.reset();
    } catch (error) {
      console.error('Error sending message to API:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Message Sent!" centered>
        <Text>Thank you for your message! We&apos;ll get back to you shortly.</Text>
      </Modal>

      <Modal opened={!!submitError} onClose={() => setSubmitError(null)} title="Submission Error" centered>
        <Text c="red">{submitError}</Text>
        <Button onClick={() => setSubmitError(null)}>Close</Button>
      </Modal>

      <AppShell>
        <AppShell.Header component={NavMT} />

        <AppShell.Main style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
          <Container size="md" py="xl">
            <Card shadow="sm" radius="md" withBorder p="lg" style={{ backgroundColor: '#ffffff' }}>
              <Title order={2} ta="center" mb="sm" c="dark.8">
                Contact Us
              </Title>
              <Text ta="center" mb="md" c="gray.7">
                Have a question or want to join our platform? Reach out and we&apos;ll get back to you shortly.
              </Text>

              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Grid gutter="md">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Your Name"
                      placeholder="Enter your name"
                      required
                      key={form.key('name')}
                      {...form.getInputProps('name')}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Email Address"
                      placeholder="you@example.com"
                      required
                      key={form.key('email')}
                      {...form.getInputProps('email')}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <TextInput
                      label="Subject (Optional)"
                      placeholder="e.g., Inquiry about Markets"
                      key={form.key('subject')}
                      {...form.getInputProps('subject')}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <Textarea
                      label="Your Message"
                      placeholder="Type your message here..."
                      minRows={4}
                      required
                      key={form.key('message')}
                      {...form.getInputProps('message')}
                    />
                  </Grid.Col>
                </Grid>

                <Space h="lg" />
                <Button type="submit" fullWidth>
                  Send Message
                </Button>
              </form>
            </Card>

            <Space h="xl" />

            <Grid gutter="xl">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="xs" radius="md" withBorder p="lg" style={{ backgroundColor: '#ece2d2' }}>
                  <Title order={4} mb="xs" c="dark.8">
                    Are You a Farmers Market?
                  </Title>
                  <Text size="sm" c="gray.7">
                    We&apos;d love to feature your market in our directory. Use the form above to tell us more.
                  </Text>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="xs" radius="md" withBorder p="lg" style={{ backgroundColor: '#ece2d2' }}>
                  <Title order={4} mb="xs" c="dark.8">
                    Are You a Vendor?
                  </Title>
                  <Text size="sm" c="gray.7">
                    Want to showcase your products on our platform? Fill out the form and we&apos;ll reach out with next steps.
                  </Text>
                </Card>
              </Grid.Col>
            </Grid>

            <Space h="xl" />
            <Title order={3} ta="center" mb="md" c="dark.8">
              Frequently Asked Questions
            </Title>

            <Accordion
              variant="separated"
              radius="md"
              chevronPosition="right"
              styles={{
                item: {
                  borderRadius: '10px',
                  backgroundColor: '#f2ebe5',
                  color: '#3d3d3d',
                  marginBottom: '8px',
                },
                control: {
                  color: '#3d3d3d',
                  fontSize: '0.95rem',
                  padding: '0.75rem 1rem',
                },
                chevron: {
                  color: '#3d3d3d',
                },
                panel: {
                  backgroundColor: '#ffffff',
                  color: '#555',
                  padding: '0.85rem 1rem',
                },
              }}
            >
              <Accordion.Item value="approved-market">
                <Accordion.Control>
                  What’s the difference between Approved and Public Farmers’ Markets?
                </Accordion.Control>
                <Accordion.Panel>
                  Approved farmers’ markets follow strict regulations by Alberta Agriculture, including vendor mix and food handling standards. Public markets may operate independently, which can lead to differences in product sources and food safety.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="vendor-courses">
                <Accordion.Control>
                  Do I need special training to sell food at markets?
                </Accordion.Control>
                <Accordion.Panel>
                  Yes, depending on the product type, you may need Food Safety certification. Prepared food vendors often require Food Handling permits, which can be obtained through online or in-person courses provided by local health authorities.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="insurance">
                <Accordion.Control>
                  Do I need insurance to sell at a market?
                </Accordion.Control>
                <Accordion.Panel>
                  Liability insurance is typically required for all vendors. It protects against customer injury claims or product issues. Some markets provide group plans, while others require you to obtain individual coverage before participating.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="vendor-issues">
                <Accordion.Control>
                  What if I have a dispute with my market manager?
                </Accordion.Control>
                <Accordion.Panel>
                  You should always try to resolve issues with your market manager directly. If the conflict escalates or remains unresolved, you may reach out to AFMA or relevant municipal authorities for mediation and further action.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="alcohol-license">
                <Accordion.Control>
                  What license do I need to sell alcohol at a market?
                </Accordion.Control>
                <Accordion.Panel>
                  Vendors selling alcoholic beverages require an AGLC license specific to their product (beer, wine, spirits). The market must also approve alcohol sales, and compliance with sampling, labeling, and public safety rules is mandatory.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Container>
        </AppShell.Main>
      </AppShell>
    </>
  );
}
