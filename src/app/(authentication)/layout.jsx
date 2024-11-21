import "../globals.css"
import { GeistSans } from "geist/font/sans"

import NextAuthProvider from "@/components/auth/sessionprovider"

export const metadata = {
	title: "PR",
	description: "Painel de gerenciamento",
}

export default function AuthLayout({ children }) {
	return (
		<html lang="pt-BR">
			<head>
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
				<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
			</head>
			<body className={`${GeistSans.className} bg-[#09090B] w-full min-h-screen flex scroll-smooth`} suppressHydrationWarning>
				<NextAuthProvider>
			    	{children}
				</NextAuthProvider>
			</body>
		</html>
	)
}
