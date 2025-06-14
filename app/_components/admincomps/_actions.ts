'use server'

import { checkRole } from '@/utils/roles'
import { clerkClient } from '@clerk/nextjs/server'
import {revalidatePath} from "next/cache";

type ActionState = {
    message: string;
    success: boolean;
};

export async function setRole(prevStat: ActionState, formData: FormData): Promise<ActionState> {
    const client = await clerkClient()

    // Check that the user trying to set the role is an admin
    if (!checkRole('admin')) {
        console.error('Not Authorized: User is not an admin.')
        throw new Error('Not Authorized')
    }

    try {
        const userId = formData.get('id') as string;
        const newRole = formData.get('role');
        if(!userId || typeof newRole !== 'string') {
            console.error('Invalid form data: User ID or role missing/invalid');
            return {success: false, message: `Invalid form data provided`};
        }
        const res = await client.users.updateUserMetadata(userId, {
            publicMetadata: { role: newRole },
        })
        console.log(`Successfully updated role for user ${userId} to ${newRole}. New publicMetadata: `, res.publicMetadata);
        revalidatePath('/admin', 'page');
        return {success: true, message: `Successfully made user ${userId} a ${newRole}.`};
    } catch (err) {
        console.error('Error setting role:' ,err);
        return {success: false, message: `Error setting role: ${err || 'Unknown error'}`};
    }
}

export async function removeRole(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const client = await clerkClient()
    if (!checkRole('admin')) {
        console.error('Not Authorized: User is not an admin.')
        throw new Error('Not Authorized')
    }

    try {
        const userId = formData.get('id') as string;
        if(!userId) {
            console.error('Invalid form data: User ID missing');
            return {success: false, message: `User ID not provided`};
        }
        const res = await client.users.updateUserMetadata(userId, {
            publicMetadata: {role : null},
        });
        console.log(`Successfully removed role from ${userId}. New publicMetadata: ${res.publicMetadata}`);
        revalidatePath('/admin', 'page');
        return {success: true, message: `Successfully removed role for user ${userId}.`};
    } catch (err) {
        console.error('Error removing role:' ,err);
        return {success: false, message: `Error setting role: ${err || 'Unknown error'}`};
    }
}