import React, { ReactElement, useMemo } from 'react'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Instace } from '../../services/instance'

import style from './Pokemons.module.css'

export default function pokemons({ data }: any): ReactElement {

  return (
    <>
      <Link href='/'>
        <button className={style.Back}>Voltar</button>
      </Link>
      <div className={style.Card}>
        <div className={style.Left}>
          Nome: {data.name}
          <img height='200px' src={data.sprites.front_default} alt={data.name} />
        </div>
        <div className={style.Right}>
          Abilities:
          {data.abilities.map((a, i) => {
          return <div key={i}>{i + 1}.{a.ability.name}</div>
        })}
        </div>
      </div>
    </>
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