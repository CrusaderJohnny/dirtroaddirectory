// app/news/[articleId]/page.tsx  (or app/news/article-details/page.tsx)
// NO "use client"; directive here. This file will be a Server Component.
import {AppShell, AppShellHeader, AppShellMain} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import { Suspense } from 'react';
import ArticleDetailsContent from "@/app/_components/newscomps/articleDeatails/articleDetails"; // Import Suspense from React

// You can optionally create a loading.tsx file or use a simple div for fallback
// Example app/news/loading.tsx (optional)
// export default function Loading() {
//   return <div>Loading article details...</div>;
// }

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