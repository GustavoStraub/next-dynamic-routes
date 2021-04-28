import React, { ReactElement, useMemo } from 'react'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Instace } from '../../services/instance'
import Head from 'next/head'
import style from './Pokemons.module.css'
import { CheckType } from '../../utils/CheckType'

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function pokemons({ data }: any): ReactElement {


  console.log(data)
  return (
    <div className={style.Wrapper}>
      <Head>
        <title>Pokemon | {capitalize(data.name)}</title>
      </Head>
      <Link href='/'>
        <button className={style.Back}>{'<'}</button>
      </Link>
      <div className={style.Card}>
        <div className={style.Left}>
          {data.name}
          <img height='200px' src={data.sprites.front_default} alt={data.name} />
          <div className={style.typeWrapper}>
            {data.types.map((t, i) => {
              return <div key={i} className={style.types} style={{ background: CheckType(t.type.name) }}>
                {t.type.name}
              </div>
            })}
          </div>
        </div>

        <div className={style.Right}>
          <div className={style.AbilityWrapper}>
            Abilities:
          {data.abilities.map((a, i) => {
            return <div key={i}>{i + 1}. {a.ability.name}</div>
          })}
          </div>

          <div className={style.stats}>
            {data.stats.map((atribute, i) => {
              return <div key={i}>
                {atribute.stat.name.replace("-", " ")}: {atribute.base_stat}
              </div>
            })}
          </div>
         Weight: {data.weight / 10}kg
        </div>
      </div>
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