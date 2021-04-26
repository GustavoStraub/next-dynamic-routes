import React, { ReactElement, useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps } from 'next'

interface Props {
  data: UserProps;
}

type Character = {
  For: string;
  Img: string;
  Name: string;
  _id: string;
}

type UserProps = {
  _id: string;
  Characters: Character[];
  Username: string;
}

export default function user({ data }: Props): ReactElement {

  const CharactersList = useMemo(() => (
    data?.Characters.map(((Character: Character, i) => {
      return <div key={i}>
        <div>
          ID: {Character._id}
        </div>
        <div>
          Nome: {Character.Name}
        </div>
        <div>
          Força: {Character.For}
        </div>
        <img height='200px' src={Character.Img} alt={Character.Name} />
      </div>
    }))
  ), [data])

  return (
    <div>
      <div>
        <Link href='/'>
          <button>Voltar</button>
        </Link>
      </div>
      {data?.Username}
      {CharactersList}
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

  const { username } = ctx.params

  const { data } = await axios.get(`http://localhost:4000/users/${username}`)

  return {
    props: {
      data
    },
    revalidate: 60 * 60 * 24 // 24 horas
  }
}