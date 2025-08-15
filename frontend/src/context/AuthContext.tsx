// firebaseのSDKのauth機能を使って、ログインしているユーザー情報が欲しい。
// ここではuseAuthとAuthProviderをexport
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type User, onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/firebase"

// contextの
type AuthContextType = {
  user: User | null
}

// contextのアノテーション
const AuthContext = createContext<AuthContextType>({ user: null })

// useAuthでuser情報を取り出せるように
export const useAuth = () => useContext(AuthContext)

// 初回実行時にログインオブザーバーを起動。ログイン情報が切り替わる
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}
