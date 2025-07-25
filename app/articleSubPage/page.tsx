import {AppShell, AppShellHeader, AppShellMain} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import { Suspense } from 'react';
import ArticleDetailsContent from "@/app/_components/newscomps/articleDeatails/articleDetails";

export default function ArticleDetailsPage() {
    return (
        <AppShell
            header={{ height: '7vh' }}
        >
            <AppShellHeader component={NavMT}/>{/* NavMT seems to be a client component, which is fine outside Suspense */}
            <AppShellMain>
                {/* Wrap the client component that uses useSearchParams in Suspense */}
                <Suspense fallback={<div>Loading article details...</div>}>
                    <ArticleDetailsContent />
                </Suspense>
            </AppShellMain>
        </AppShell>
    );
}