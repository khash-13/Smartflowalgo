import Pricing from '@/pages/main/Pricing'
import PricingBanner from '@/pages/other/HorizontalPricing'
import FreePlanBanner from '@/pages/other/PricingBanner'
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