import React, { ReactElement, useMemo, useState } from 'react'
import Link from 'next/link'
import { useFetch } from '../hooks/useFetch'
import { Card } from '../components/Card'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({ }: any): ReactElement {

  const { data } = useFetch('pokemon?limit=1118')

  const [Filter, setFilter] = useState('')

  const Pokemons = data?.results.filter((Pokemon) => {
    return Pokemon.name.toLowerCase().includes(Filter.toLowerCase())
  })

  function resetField() {
    setFilter('')
  }

  const PokemonList = useMemo(
    () =>
      Pokemons?.map(((pokemon, i) => {
        return (
          <Link key={pokemon.url} href={`/pokemons/${pokemon.name}`}>
            <div>
              <Card name={pokemon.name} url={pokemon.url} />
            </div>
          </Link>
        )
      }))
    ,
    [Filter, data]
  );
  return (
    <>
    <Head><title>Pokedex</title></Head>
      <input
        className={styles.Search}
        type='text'
        onChange={e => setFilter(e.target.value)}
        value={Filter}
        placeholder='Search a Pokemon'
      />
      <button className={styles.ResetButton} onClick={resetField}>Clear field</button>
      <div className={styles.List}>
        {PokemonList}
      </div>
    </>
  )
}
