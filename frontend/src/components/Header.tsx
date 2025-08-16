import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";

const defaultIcon = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f402.svg";

export default function Header() {
    const { user } = useAuth()

    return (
        <header>
            <p>home</p>
            <p>{user?.displayName ?? "名無しさん"}</p>
            <img src={user?.photoURL ?? defaultIcon} alt="userIcon" />
            <button onClick={() => signOut(auth)}>ログアウト</button>
        </header>
    )
}