// frontend/src/pages/Login.tsx
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate()
    const handleLogin = async () => {
        const provider = new GoogleAuthProvider()
        try {
            await signInWithPopup(auth, provider)
            navigate("/Home")
        } catch (err) {
            alert(`ログインに失敗しました。\n${err}`)
        }
    }

    return (
        <div>
            <h1>campus-noteにようこそ。</h1>
            <h2>ログインして始める</h2>
            <button onClick={handleLogin}>Googleでログイン</button>
        </div>
    )
}
