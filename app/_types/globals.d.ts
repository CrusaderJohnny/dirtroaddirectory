export {}

// Create a type for the roles
export type Roles = 'admin' | 'moderator'
export type isMarket = true

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles,
            isMarket?: boolean,
            marketName?: string,
            isVendor?: boolean,
            vendorName?: string,
        }
    }
}