import { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { signOut } from 'firebase/auth'
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

const WS_URL = "http://localhost:8000/ws"

type post_data = {
  post_uuid: string,
  send_user: string,
  send_user_icon_url: string,
  message: string
}


function Home() {

  const [submitted, setSubmitted] = useState(false)
  const [inputText, setInputText] = useState("")
  const [posts, setPosts] = useState<post_data[]>([])
  const [error, setError] = useState("")
  const ws = useRef<WebSocket | null>(null)
  const { user } = useAuth()
  const defaultIcon = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f402.svg";

  // ロード時にwsに接続する
  useEffect(() => {
    const socket = new WebSocket(WS_URL)
    ws.current = socket

    socket.onopen = () => {
      console.log("Socket is connecting.")
    }
    socket.onclose = () => {
      console.log("Socket is closing.")
    }

    socket.onmessage = (event) => {
      const recieve_post: post_data = JSON.parse(event.data)
      setPosts((prev) => [...prev, recieve_post])
    }

    return () => {
      socket.close()
    }
  }, [])

  // 送信処理
  const sendPost = async () => {
    // 空文字回避
    if (inputText.trim() == "") return

    try {
      const newPost: post_data = {
        post_uuid: uuidv4(),
        send_user: user?.displayName ?? "名無し",
        send_user_icon_url: user?.photoURL ?? defaultIcon,
        message: inputText
      }

      ws.current?.send(JSON.stringify(newPost))
      setSubmitted(true)
      setInputText("")
      // 成功時: 2秒後に送信しましたを消す
      setTimeout(() => { setSubmitted(false) }, 2000);
    } catch (err) {
      //失敗時: errorを出す
      alert(`送信に失敗しました。接続を確認してください。\n${err}`)
      setError("送信に失敗")
    }
  }

  return (
    <>
      <div>
        <header>
          <p>home</p>
          <p>{user?.displayName ?? "名無しさん"}</p>
          <img src={user?.photoURL ?? defaultIcon} alt="userIcon" />
          <button onClick={() => signOut(auth)}>ログアウト</button>
        </header>

        <div id="sendForm">
          <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
          <button id="sendButton" onClick={sendPost}>send</button>
          {submitted && <p>送信完了！</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        <div id="posts">
          <h3>投稿一覧</h3>
          {posts.map((post) => (
            <p key={post.post_uuid}><img src={post.send_user_icon_url} alt="userIcon" />{post.send_user}: {post.message}</p>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home