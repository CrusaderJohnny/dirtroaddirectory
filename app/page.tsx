"use client"
import { Button, Center, Container, Text } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Center>
        <Container>
          <Text p={20}>Hello World, What the....</Text>
          <Button component={Link} href="marketcards">Market Map</Button>
          <Button component={Link} href='map'>Map</Button>
          <Button component={Link} href='stickyHeaderAndCompTest'>Header</Button>
          <Button component={Link} href='index'>Index</Button>
        </Container>
      </Center>
    </Container>
  );
}
