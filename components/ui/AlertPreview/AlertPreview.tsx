import Link from "next/link"

export const AlertPreview = () => {
  return (
    <div className="fixed top-2 left-1 z-50 w-96 bg-white border-2 border-gray-400 shadow-md rounded-md flex gap-x-4 py-2 px-2">
      <div className=" w-1 bg-yellow-500 rounded-full"/>
      <p>
        Estas viendo una version preliminar, para ver la versión actual presiona
        {' '}
        <Link href="/api/exit-preview" className="underline text-blue-600">
          aquí
        </Link>
      </p>
    </div>
  )
}
