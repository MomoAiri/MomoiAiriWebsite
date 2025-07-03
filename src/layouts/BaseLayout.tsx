import { ReactNode } from 'react'

interface BaseLayoutProps {
  children: ReactNode
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Momoi Airi Website</h1>
      </header>
      <main>{children}</main>
      <footer className="mt-8 text-center text-gray-500">
        © {new Date().getFullYear()} Momoi Airi
      </footer>
    </div>
  )
}