import Link from "next/link";

export default function Home() {
  return (
    <main className='flex flex-col items-center gap-y-2'>
      <h1>Роли</h1>
      <div className='flex gap-x-5 w-full max-w-[400px]'>
        <Link
          href='/registration'
          className='w-full text-center block bg-blue-500 p-4 rounded-[10px] hover:cursor-pointer active:bg-blue-800 transition-colors'
          type='submit'
        >
          Регистрация
        </Link>
        <Link
          href='/login'
          className=' text-center block w-full bg-blue-500 p-4 rounded-[10px] hover:cursor-pointer active:bg-blue-800 transition-colors'
          type='submit'
        >
          Вход
        </Link>
      </div>
    </main>
  );
}
