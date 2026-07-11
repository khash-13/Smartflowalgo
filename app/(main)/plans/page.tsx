import Pricing from '@/sections/main/Pricing'
import PricingBanner from '@/sections/other/HorizontalPricing'
import FreePlanBanner from '@/sections/other/PricingBanner'
import React from 'react'

function page() {
  return (
    <div className='flex flex-col gap-10 my-10'>
    <FreePlanBanner />
    <PricingBanner />
    </div>
  )
}

export default page