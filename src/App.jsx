import React from 'react'
import Hero from './components/hero'
import About from './components/About'
import Navbar from './components/Navbar'
import Features from './components/Features'
import Achievement from './components/Achievement'
import Contact from './components/Contact'

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Achievement />
      <Contact />
    </main>
  )
}

export default App