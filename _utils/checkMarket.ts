import { auth } from '@clerk/nextjs/server';

export const checkMarket = async () => {
    const { sessionClaims } = await auth()
    return sessionClaims?.metadata.isMarket === true
}