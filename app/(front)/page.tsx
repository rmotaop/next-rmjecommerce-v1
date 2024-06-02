/* eslint-disable @next/next/no-img-element */
import Slider from '@/components/Sliders/Slider'
import ProductItem from '@/components/products/ProductItem'
import productService from '@/lib/services/productService'
import { convertDocToObj } from '@/lib/utils'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'RMJ eCommerce V1',
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Nextjs, Server components, Next auth, daisyui, zustand',
}

export default async function Home() {
  const featuredProducts = await productService.getFeatured()
  const latestProducts = await productService.getLatest()
  return (
    <>
      <div className="mt-4">
        <div>
          <div className="bg-fixed ...">
            <h4 className="mt-2 text-xl py-2 w-full">Produtos em destaque</h4>
          </div>
          <div className="w-full grid pb-4">
            <Slider />
          </div>
        </div>

        <div>
          <h4 className=" text-xl">Produtos mais recentes</h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {latestProducts.map((product) => (
              <ProductItem
                key={product.slug}
                product={convertDocToObj(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
