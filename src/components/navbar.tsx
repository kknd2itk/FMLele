import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"

export const Navbar = () => {
  const router = useRouter()
  const [accountMenu, setAccountMenu] = useState(false)
  const { data: session } = useSession()

  return (
    <nav className="flex justify-between items-center mx-16 px-4 h-[10vh]">
      <Link href={"/"} className="font-black text-lg text-cyan-600">
        Fishindo
      </Link>
      <div className="flex flex-row gap-6">
        <ul className="flex flex-row gap-6 items-center font-medium">
          <Link
            href={"/"}
            className="border-2 border-transparent hover:border-b-cyan-300 py-2"
          >
            Beranda
          </Link>
          <Link
            href={"/marketplace"}
            className=" border-2 border-transparent hover:border-b-cyan-300 py-2"
          >
            Marketplace
          </Link>
          <Link
            href={"/forum"}
            className="border-2 border-transparent hover:border-b-cyan-300 py-2"
          >
            Forum
          </Link>
          {session ? (
            <li
              className="relative cursor-pointer "
              onClick={() => {
                setAccountMenu(!accountMenu)
              }}
            >
              <h3 className="border border-cyan-800 text-cyan-800 px-6 py-3 rounded-md font-medium hover:bg-gradient-to-br hover:text-white hover:bg-cyan-500 transition delay-0 ease-in">
                Hello, {session?.user?.name}
              </h3>
              <div
                className={
                  accountMenu
                    ? "flex flex-col border absolute w-full rounded-lg top-14 left-0 z-10 "
                    : "hidden"
                }
              >
                <ul className="bg-white text-[#222]">
                  <Link
                    href={"/dashboard"}
                    className="flex border border-transparent px-3 py-2 w-11/12 mx-3 my-2 hover:border-cyan-800 rounded-md"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={"/dashboard/profile"}
                    className="flex border border-transparent px-3 py-2 w-11/12 mx-3 my-2 hover:border-cyan-800 rounded-md"
                  >
                    My Profile
                  </Link>
                  <li className="flex justify-center items-center my-2">
                    <button
                      className="bg-red-500 w-11/12 text-white p-3 rounded-lg font-medium border border-red-500 hover:bg-white hover:text-red-500"
                      onClick={() => {
                        signOut()
                      }}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <li>
              <button
                className="border border-cyan-800 text-cyan-800 px-6 py-3 cursor-pointer rounded-md font-medium hover:bg-gradient-to-br hover:text-white hover:bg-cyan-500 transition delay-0 ease-in"
                onClick={() => {
                  signIn()
                }}
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}