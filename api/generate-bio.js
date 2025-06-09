// api/generate-bio.js

import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OpenAI } from 'openai';

// 创建 OpenAI 客户端实例
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 让 Vercel 使用 Edge Runtime，速度更快
export const config = {
  runtime: 'edge',
};

// 这是 API 的主函数
export default async function handler(req) {
  // 这是我们给 AI 的指令 (Prompt)
  const prompt = `
    你是一个专业的个人简介撰写助手。
    请为一个充满激情、热爱探索新技术的 Web 前端开发者生成一段大约 50 字的、富有创意和吸引力的个人简介。
    必须包含以下关键词：React, Next.js, AI, 创造力。
    风格要求：现代、略带科技感、积极向上。
    请直接输出简介内容，不要包含任何额外的前缀或标题。
  `;

  // 调用 OpenAI API
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // 你也可以换成 gpt-4
    stream: true, // 开启流式响应
    messages: [{ role: 'user', content: prompt }],
  });

  // 将 OpenAI 的响应转换为 Vercel AI SDK 的标准流
  const stream = OpenAIStream(response);

  // 将流作为响应返回给前端
  return new StreamingTextResponse(stream);
}