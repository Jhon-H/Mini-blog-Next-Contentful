import Link from 'next/link'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { AlertPreview } from 'components/ui'

interface Props {
  preview: boolean;
}

const Error404Page = ({ preview }: Props) => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      { preview && <AlertPreview /> }
  
      <div className='flex items-center gap-x-4 h-14 w-fit'>
        <strong className='text-5xl font-bold'>404</strong>
        <div className='border-l border-gray-600 h-full'/>
        <p className='text-sm'>Esta página no fue encontrada.</p>
      </div>
      
      <Link href="/" className='mt-4 text-lg underline text-blue-600'>
        Ir al inicio
      </Link>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  return {
    props: {
      preview
    }
  }
}

export default Error404Page