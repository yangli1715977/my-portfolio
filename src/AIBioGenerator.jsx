// src/AIBioGenerator.jsx
import { useState } from 'react';
import './AIBioGenerator.css'; // 我们稍后创建这个 CSS 文件

export default function AIBioGenerator() {
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateBio = async () => {
    setBio(''); // 清空旧内容
    setIsLoading(true);

    try {
      // 请求我们刚刚创建的后端 API
      const response = await fetch('/api/generate-bio');
      if (!response.ok) {
        throw new Error('网络响应错误');
      }

      // 处理流式数据
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunk = decoder.decode(value);
        // 实时更新 bio 状态，形成打字机效果
        setBio((prev) => prev + chunk);
      }
    } catch (error) {
      console.error('生成简介时出错:', error);
      setBio('生成失败，请稍后再试。');
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