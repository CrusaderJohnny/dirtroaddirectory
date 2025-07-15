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
    if (!await checkRole('admin')) {
        console.error('Not Authorized: User is not an admin.')
        throw new Error('Not Authorized')
    }

    try {
        const userId = formData.get('id') as string;
        const userInfo = await client.users.getUser(userId);
        const userName = userInfo.fullName;
        const newRole = formData.get('role');
        if(!userId || typeof newRole !== 'string') {
            console.error('Invalid form data: User ID or role missing/invalid');
            return {success: false, message: `Invalid form data provided`};
        }
        const res = await client.users.updateUserMetadata(userId, {
            publicMetadata: { role: newRole },
        })
        console.log(`Successfully updated role for user ${userName} to ${newRole}. New publicMetadata: `, res.publicMetadata);
        revalidatePath('/admin', 'page');
        return {success: true, message: `Successfully made user ${userName} a ${newRole}.`};
    } catch (err) {
        console.error('Error setting role:' ,err);
        return {success: false, message: `Error setting role: ${err || 'Unknown error'}`};
    }
}

export async function removeRole(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const client = await clerkClient()
    if (!await checkRole('admin')) {
        console.error('Not Authorized: User is not an admin.')
        throw new Error('Not Authorized')
    }

    try {
        const userId = formData.get('id') as string;
        const userInfo = await client.users.getUser(userId);
        const userName = userInfo.fullName;
        if(!userId) {
            console.error('Invalid form data: User ID missing');
            return {success: false, message: `User ID not provided`};
        }
        const res = await client.users.updateUserMetadata(userId, {
            publicMetadata: {role : null},
        });
        console.log(`Successfully removed role from ${userName}. New publicMetadata: ${res.publicMetadata}`);
        revalidatePath('/admin', 'page');
        return {success: true, message: `Successfully removed role for user ${userName}.`};
    } catch (err) {
        console.error('Error removing role:' ,err);
        return {success: false, message: `Error setting role: ${err || 'Unknown error'}`};
    }
}

export async function setIsMarket(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const client = await clerkClient();
    if (!await checkRole('admin')) {
        console.error('Not Authorized: User is not an admin.')
        return {success: false, message: `Not Authorized: User is not an admin.`};
    }
    try{
        const userId = formData.get('id') as string;
        const isMarketString = formData.get('isMarket') as string;
        const userInfo = await client.users.getUser(userId);
        const userName = userInfo.fullName;
        if(!userId) {
            console.error('Invalid form data: User ID or role missing/invalid');
            return {success: false, message: `User ID not provided`};
        }
        const isMarketBoolean = isMarketString === 'true';
        const res = await client.users.updateUserMetadata(userId, {
            publicMetadata: {
                isMarket: true,
            },
        });
        console.log(`Successfully set ${userName} market status to ${isMarketBoolean}. New publicMetadata: `, res.publicMetadata);
        revalidatePath('/admin', 'page');
        return {success: true, message: `Successfully updated user: ${userName} Market status to ${isMarketBoolean}.`};
    } catch (err) {
        console.error('Error setting isMarket:' ,err);
        return {success: false, message: `Error setting isMarket: ${err || 'Unknown error'}`};
    }
}

export async function removeIsMarket(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const client = await clerkClient();
    if (!await checkRole('admin')) {
        console.error('Not Authorized: User is not an admin.')
        return {success: false, message: `Not Authorized: User is not an admin.`};
    }
    try {
        const userId = formData.get('id') as string;
        const userInfo = await client.users.getUser(userId);
        const userName = userInfo.fullName;
        if(!userId) {
            console.error('Invalid form data: User ID or role missing/invalid');
            return {success: false, message: `User ID not provided`};
        }
        const res = await client.users.updateUserMetadata(userId, {
            publicMetadata: {
                isMarket: null,
            },
        });
        console.log(`Successfully removed isMarket from ${userName}. New publicMetadata: `, res.publicMetadata);
        revalidatePath('/admin', 'page');
        return {success: true, message: `Successfully removed isMarket from ${userName}.`};
    } catch (err) {
        console.error('Error removing isMarket:' ,err);
        return {success: false, message: `Error removing isMarket: ${err || 'Unknown error'}`};
    }
}

export async function setIsVendor(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const client = await clerkClient();
    if (!await checkRole('admin')) {
        console.error('Not Authorized: User is not an admin.')
        return {success: false, message: `Not Authorized: User is not an admin.`};
    }
    try {
        const userId = formData.get('id') as string;
        const userInfo = await client.users.getUser(userId);
        const userName = userInfo.fullName;
        const isVendorString = formData.get('isVendor') as string;
        if(!userId) {
            console.error('Invalid form data: User ID or role missing/invalid');
            return {success: false, message: `User ID not provided`};
        }
        const isVendorBoolean = isVendorString === 'true';
        const res = await client.users.updateUserMetadata(userId, {
            publicMetadata: {
                isVendor: true,
            },
        });
        console.log(`Successfully set user: ${userName} to vendor status: ${isVendorBoolean}. New publicMetadata: `, res.publicMetadata)
        revalidatePath('/admin', 'page');
        return {success: true, message: `Successfully set user: ${userName} to vendor status: ${isVendorBoolean}.`};
    } catch (err) {
        console.error('Error Setting isVendor:' ,err);
        return {success: false, message: `Error setting isVendor: ${err || 'Unknown error'}`};
    }
}

export async function removeIsVendor(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const client = await clerkClient();
    if (!await checkRole('admin')) {
        console.error('Not Authorized: User is not an admin.')
        return {success: false, message: `Not Authorized: User is not an admin.`};
    }
    try {
        const userId = formData.get('id') as string;
        const userName = formData.get('name') as string;
        if(!userId) {
            console.error('Invalid form data: User ID or role missing/invalid');
            return {success: false, message: `User ID not provided`};
        }
        const res = await client.users.updateUserMetadata(userId, {
            publicMetadata: {
                isVendor: null,
            },
        });
        console.log(`Successfully removed isVendor from ${userName}. New publicMetadata: `, res.publicMetadata);
        revalidatePath('/admin', 'page');
        return {success: true, message: `Successfully removed isVendor from ${userName}.`};
    } catch (err) {
        console.error('Error removing isVendor:' ,err);
        return {success: false, message: `Error removing isVendor: ${err || 'Unknown error'}`};
    }
}