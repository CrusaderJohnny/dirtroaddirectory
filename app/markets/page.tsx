import {AppShell, AppShellHeader, AppShellMain} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import { Suspense } from 'react';
import MarketsContent from "@/app/_components/marktecomponents/marketContent";

// You might want a simple loading component or just a div for fallback
// app/markets/loading.tsx (optional, but good practice for Suspense fallback)
// export default function Loading() {
//   return <div>Loading markets...</div>;
// }

export default function Page() {
    return (

        <AppShell>
            <AppShellHeader component={NavMT} />
            <AppShellMain>
                {/* Wrap the client component that uses useSearchParams in Suspense */}
                <Suspense fallback={<div>Loading markets...</div>}>
                    <MarketsContent />
                </Suspense>
            </AppShellMain>
        </AppShell>
    );
}