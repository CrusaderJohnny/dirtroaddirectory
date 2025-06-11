'use client';

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
} from '@mantine/core';
import { useForm, hasLength, isEmail } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import NavMT from '@/app/_components/navcomps/navmt';

export default function Page() {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: {
      name: hasLength({ min: 3 }, 'Name must be at least 3 characters'),
      email: isEmail('Invalid email address'),
      message: hasLength({ min: 5 }, 'Message must be at least 5 characters'),
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="Message Sent!" centered>
        <Text>Thank you for your message! We'll get back to you shortly.</Text>
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
                Have a question or want to join our platform? Reach out and we'll get back to you shortly.
              </Text>

              <form
                onSubmit={form.onSubmit(() => {
                  open();
                  form.reset();
                })}
              >
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
                    We'd love to feature your market in our directory. Use the form above to tell us more.
                  </Text>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="xs" radius="md" withBorder p="lg" style={{ backgroundColor: '#ece2d2' }}>
                  <Title order={4} mb="xs" c="dark.8">
                    Are You a Vendor?
                  </Title>
                  <Text size="sm" c="gray.7">
                    Want to showcase your products on our platform? Fill out the form and we'll reach out with next steps.
                  </Text>
                </Card>
              </Grid.Col>
            </Grid>
          </Container>
        </AppShell.Main>
      </AppShell>
    </>
  );
}
