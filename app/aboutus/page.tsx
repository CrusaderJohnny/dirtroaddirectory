"use client";
import {
    AppShell,
    AppShellHeader,
    AppShellMain
} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import AboutUs from "@/app/_components/about_us_components/about_us";

export default function Page() {
    return(
        <AppShell>
            <AppShellHeader
                component={NavMT}/>
            <AppShellMain style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
                <AboutUs/>
            </AppShellMain>
        </AppShell>
    )
}