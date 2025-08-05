import { auth } from '@clerk/nextjs/server';

export const getUUID = async () => {
    const { userId } = await auth()
    return userId
}