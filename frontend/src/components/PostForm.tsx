import { useState } from "react"

type PostFormProps = {
    onSendPost: (message: string) => void,
    submitted: boolean,
    error: string
}

// propsをアノテーション
export default function PostForm({ onSendPost, submitted, error }: PostFormProps) {
    const [inputText, setInputText] = useState("")
    // 送信処理
    const handlePost = () => {
        if (inputText.trim() !== "") {
            onSendPost(inputText)
            setInputText("")
        }
    }

    // 送信処理
    return (
        <div id="PostForm">
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
            <button id="sendButton" onClick={handlePost}>post</button>
            {submitted && <p>送信完了！</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}