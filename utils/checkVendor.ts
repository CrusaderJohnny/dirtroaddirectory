import { auth } from '@clerk/nextjs/server';

export const checkVendor = async () => {
    const { sessionClaims } = await auth()
    return sessionClaims?.metadata.isVendor === true
}