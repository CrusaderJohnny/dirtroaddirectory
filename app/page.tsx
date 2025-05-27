"use client"
import { Button, Center, Container, Flex, Text } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Center>
        <Container>
          <Text p={20}>Hello World, What the....</Text>
          <Flex direction="column" gap={20}>
            <Button component={Link} href="marketcards">Market Map</Button>
            <Button component={Link} href='map'>Map</Button>
            <Button component={Link} href='stickyHeaderAndCompTest'>Header</Button>
            <Button component={Link} href='index'>Index</Button>
          </Flex>
        </Container>
      </Center>
    </Container>
  );
}
