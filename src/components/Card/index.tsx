import axios from 'axios'
import React, { ReactElement, useEffect, useState } from 'react'
import { usePhotos } from '../../hooks/useFetch'
import style from './Card.module.scss'

interface Props {
  url: string;
  name: string;
}

export function Card({ url, name }: Props): ReactElement {

  const { data } = usePhotos(url)

  return (
    <div className={style.Card}>
      {data ?
        <>
          <p>{name}</p>
          <img className={style.Image} src={data} />
        </> :
        <div className={style.loading}>
          <p>loading....</p>
        </div>
      }

    </div>
  )
}
