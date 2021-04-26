import axios from 'axios'
import { GetStaticProps } from 'next'
import { useMemo } from 'react'
import Link from 'next/link'

export default function Home({ data }) {

  const User = useMemo(() => (
    data?.map(((user, i) => {
      return <div key={i}>
        <Link href={`/users/${user.Username}`}>
          {user.Username}
        </Link>
      </div>
    }))
  ), [data])

  return (
    <>
      { User}
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