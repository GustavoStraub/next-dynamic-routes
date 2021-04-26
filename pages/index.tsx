import React, { ReactElement } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { Instace } from '../services/instance'

export default function Home({ data }: any): ReactElement {

  return (
    <>
      {data?.results.map(((pokemon, i) => {
        return <div key={i}>
          <Link href={`/pokemons/${pokemon.name}`}>
            {pokemon.name}
          </Link>
        </div>
      }))}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await Instace.get('pokemon')

  return {
    props: {
      data
    },
    revalidate: 60 * 60 * 8,
  }
}