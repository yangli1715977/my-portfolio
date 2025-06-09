// api/generate-bio.js (兼容 Vercel AI SDK v3.x 的新版本)

import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai'; // 导入方式在新版本中是正确的，但用法变了

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
  // 从请求中获取 prompt，如果前端没有提供，则使用默认值
  // 为了安全和简单，我们暂时在后端硬编码 prompt
  const prompt = `
    你是一个专业的个人简介撰写助手。
    请为一个充满激情、热爱探索新技术的 Web 前端开发者生成一段大约 50 字的、富有创意和吸引力的个人简介。
    必须包含以下关键词：React, Next.js, AI, 创造力。
    风格要求：现代、略带科技感、积极向上。
    请直接输出简介内容，不要包含任何额外的前缀或标题。
  `;
  
  try {
    // 调用 OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true, // 开启流式响应
      messages: [{ role: 'user', content: prompt }],
    });

    // 将 OpenAI 的响应转换为 Vercel AI SDK 的标准流
    // 【重大变化在这里！】
    const stream = OpenAIStream(response);

    // 将流作为响应返回给前端
    return new StreamingTextResponse(stream);

  } catch (error) {
    // 错误处理
    console.error("Error calling OpenAI API:", error);
    return new Response("An error occurred while generating the bio.", { status: 500 });
  }
}