// src/AIBioGenerator.jsx
import { useState } from 'react';
import './AIBioGenerator.css'; // 我们稍后创建这个 CSS 文件

export default function AIBioGenerator() {
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);




  const generateBio = async () => {
    setBio('');
    setIsLoading(true);
  
    try {
      // 【重大变化】将 fetch 请求改为 POST
      const response = await fetch('/api/generate-bio', {
        method: 'POST', // <-- 指定方法为 POST
        headers: {
          'Content-Type': 'application/json', // <-- 告知服务器我们发送的是 JSON
        },
        // body: JSON.stringify({ prompt: "你的自定义 prompt" }) // 如果你想从前端传 prompt，可以这样写
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // ... 后续处理流数据的代码保持不变 ...
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunk = decoder.decode(value);
        setBio((prev) => prev + chunk);
      }
  
    } catch (error) {
      console.error('生成简介时出错:', error);
      setBio(`生成失败: ${error.message}。请检查 API 控制台。`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-generator">
      <button onClick={generateBio} disabled={isLoading} className="ai-button">
        {isLoading ? 'AI 思考中...' : '🤖 让 AI 给我写个新简介'}
      </button>
      <div className="ai-bio-output">
        {/* 如果 bio 为空，则显示提示信息 */}
        {bio || <p className="placeholder">点击按钮，见证 AI 的创造力 ✨</p>}
      </div>
    </div>
  );
}