import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Nav from '@/components/Nav'

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Nav />
      <Hero />
      <Projects />
      <About />
    </main>
  )
}