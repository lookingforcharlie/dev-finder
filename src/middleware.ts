export { default } from 'next-auth/middleware'

export const config = { matcher: ['/your-rooms', '/browse', '/edit-room'] }

// middleware runs before the actual route logic starts to run
// You go to a page, that page starts loading or has a spinner, and then you get kicked out of that page to another page, it’s kind of jarring and abrupt, so middleware can help reduce that issue
