'use client'

import useLayoutService from '@/lib/hooks/useLayout'
import Link from 'next/link'
import useSWR from 'swr'

const Sidebar = () => {
  const { toggleDrawer } = useLayoutService()
  const { data: categories, error } = useSWR('/api/products/categories')

  if (error) return error.message
  if (!categories) return 'Carregando...'

  return (
    <ul className="menu p-4 pt-14 w-80 min-h-full bg-base-200 text-base-content">
      <li>
        <h2 className="sm:text-base text-xl">Compre por departamento</h2>
      </li>
      {categories.map((category: string) => (
        <li key={category}>
          <Link href={`/search?category=${category}`} onClick={toggleDrawer}>
            {category}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Sidebar
