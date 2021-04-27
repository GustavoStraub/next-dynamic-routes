import React, { ReactElement, useMemo } from 'react'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Instace } from '../../services/instance'

export default function user({ data }: any): ReactElement {

  return (
    <div>
      <div>
        <Link href='/'>
          <button>Voltar</button>
        </Link>
      </div>
      <div>
        Nome: {data.name}
     Abilities:
     {data.abilities.map((a, i) => {
        return <div key={i}>{i + 1}.{a.ability.name}</div>
      })}
      </div>
      <img height='200px' src={data.sprites.front_default} alt={data.name} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { pokemons } = ctx.params

  const { data } = await Instace.get(`pokemon/${pokemons}`)

  return {
    props: {
      data
    },
    revalidate: 60 * 60 * 24 // 24 horas
  }
}