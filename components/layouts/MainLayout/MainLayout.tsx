import { ReactElement } from 'react'
import Head from 'next/head'
import { AlertPreview } from 'components/ui';

interface Props {
  children: ReactElement | ReactElement[];
  title: string;
  description?: string;
  preview?: boolean;
}

export const MainLayout = ({ children, title, description = '', preview = false }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <main className='py-16 px-40'>
        {preview && <AlertPreview />}
        {children}
      </main>
    </>
  )
}
