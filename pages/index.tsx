import React, { ReactElement } from 'react'
import axios from 'axios'
import { GetStaticProps } from 'next'
import { useMemo } from 'react'
import Link from 'next/link'

interface Props {
  data: UserProps[];
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
export default function Home({ data }: Props): ReactElement {

  return (
    <>
      {data?.map(((user, i) => {
        return <div key={i}>
          <Link href={`/users/${user.Username}`}>
            {user.Username}
          </Link>
        </div>
      }))}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get('http://localhost:4000/users')

  return {
    props: {
      data
    },
    revalidate: 60 * 60 * 8,
  }
}