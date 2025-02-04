export default function Home() {
  return (
    <main className="flex flex-col items-center gap-y-2">
      <h1>Роли</h1>
      <div className="flex gap-x-5">
        <a
          href="/register"
          className="text-center block w-[200px] bg-blue-500 p-4 rounded-[10px] hover:cursor-pointer active:bg-blue-800 transition-colors"
          type="submit"
        >
          Регистрация
        </a>
        <a
          href="signin"
          className=" text-center block w-[200px] bg-blue-500 p-4 rounded-[10px] hover:cursor-pointer active:bg-blue-800 transition-colors"
          type="submit"
        >
          Вход
        </a>
      </div>
    </main>
  );
}
