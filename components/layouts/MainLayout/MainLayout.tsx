import { ReactElement } from 'react'
import Head from 'next/head'

import styles from './MainLayout.module.scss'

interface Props {
  children: ReactElement | ReactElement[];
  title: string;
  description?: string;
}

export const MainLayout = ({ children, title, description = '' }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <main className={styles['main-layout']}>
        {children}
      </main>
    </>
  )
}
