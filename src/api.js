export function apiAuth(req) {
    return req.headers.get('x-api-key') === process.env.API_KEY
}