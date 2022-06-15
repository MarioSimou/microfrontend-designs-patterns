import {getConfig} from '.'
export const getSignInURL = () => new URL('/sign-in', getConfig().signInBaseURL).href
export const getProfileVerifyURL = () => new URL('/api/v1/profile/verify', getConfig().signInBaseURL).href
export const getCookieDomain = () => getConfig().cookieDomain
