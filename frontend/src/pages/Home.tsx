import { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import PostForm from "../components/PostForm";
import type { post_data } from "../types/post_data";
import PostsList from "../components/PostsList";

const WS_URL = "http://localhost:8000/ws"


function Home() {

  const [submitted, setSubmitted] = useState(false)
  const [posts, setPosts] = useState<post_data[]>([])
  const [error, setError] = useState("")
  const ws = useRef<WebSocket | null>(null)
  const { user } = useAuth()

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
  const sendPost = async (inputText: string) => {
    try {
      const newPost: post_data = {
        post_uuid: uuidv4(),
        send_user: user?.displayName ?? "名無し",
        send_user_icon_url: user!.photoURL,
        message: inputText
      }
      ws.current?.send(JSON.stringify(newPost))
      setSubmitted(true)
      setTimeout(() => { setSubmitted(false) }, 2000); // 送信成功を2秒後に消す
    } catch (err) {
      alert(`送信に失敗しました。接続を確認してください。\n${err}`)
      setError("送信に失敗")
    }
  }

  return (
    <>
      <div>
        <Header />

        <PostForm onSendPost={sendPost} submitted={submitted} error={error} />

        <PostsList posts={posts}/>
      </div>
    </>
  )
}

export default Home