import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Nav from '@/components/Nav'
import Behance from '@/components/Behance'
import Sketches from '@/components/Sketches'
import WebBuilds from '@/components/WebBuilds'
import Articles from '@/components/Articles'

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Nav />
      <Hero />
      <Articles />
      <Projects />
      <WebBuilds />
      <Behance />
      <About />
      <Sketches />
    </main>
  )
}
