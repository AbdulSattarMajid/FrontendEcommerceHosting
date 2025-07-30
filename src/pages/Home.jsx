import React, { lazy, Suspense } from 'react'
import HeroSection from '../Components/landingPageComponents/HeroSection'
import Explore from '../Components/landingPageComponents/Explore'

const MoreCategories = lazy(() => import('../Components/landingPageComponents/MoreCategories'))
const Testinomials = lazy(() => import('../Components/landingPageComponents/Testinomials'))
const WhyShopUs = lazy(() => import('../Components/landingPageComponents/WhyshopUs'))
const Footer = lazy(() => import('../Components/landingPageComponents/Footer'))

function Home() {
  return (
    <>
      <div className="overflow-x-hidden">
        <section className="h-screen">
          <HeroSection />
        </section>

        <section>
          <Explore />
        </section>

        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
          <section>
            <MoreCategories />
            <Testinomials />
            <WhyShopUs />
            <Footer />
          </section>
        </Suspense>
      </div>
    </>
  )
}


export default Home
