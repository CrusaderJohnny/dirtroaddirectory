// app/vendors/page.tsx
// NO "use client"; directive here. This file will be a Server Component.
import {AppShell, AppShellHeader} from '@mantine/core';
import NavMT from "@/app/_components/navcomps/navmt";
import { Suspense } from 'react';
import VendorsContent from "@/app/_components/vendorcomps/vendorContent"; // Import Suspense from React

// Optional: You can create a loading.tsx file in app/vendors
// app/vendors/loading.tsx
// export default function Loading() {
//   return <div>Loading vendor information...</div>;
// }

export default function VendorsPage() {
  return (
      <AppShell>
        <AppShellHeader component={NavMT}/>
        {/* Wrap the client component that uses useSearchParams in Suspense */}
        <Suspense fallback={<div>Loading vendor information...</div>}>
          <VendorsContent />
        </Suspense>
      </AppShell>
  );
}