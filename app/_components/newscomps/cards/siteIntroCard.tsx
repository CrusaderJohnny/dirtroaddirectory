import {Card, Title, Image, Container} from "@mantine/core";
import React from "react";


export default function SiteIntroCard() {
    const outlineColor = 'black';
    return (
        <Card radius={0} p={0} className="cursor-pointer" bg={'transparent'}>
            <Image
                radius="md"
                h={300}
                fit="cover"
                src={"https://images.unsplash.com/photo-1684775622591-cb57271f141e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                alt="Source from Unsplash.com"/>
            <Container size="md" style={{
                position: "absolute",
                top: 120,
                left: 0,
                right: 0,
                textAlign: "center",
                color: "white"
            }}>
                <Title
                    order={1}
                    fw={600}
                    size="3rem"
                    style={{
                        textShadow:
                            `-1px -1px 0 ${outlineColor},  
                            1px -1px 0 ${outlineColor},
                            -1px 1px 0 ${outlineColor},
                            1px 1px 0 ${outlineColor}`
                    }}
                >
                    Explore Local Farmers Markets
                </Title>
            </Container>
        </Card>
    );
}