// src/App.jsx (最终修复版)

// 导入所有需要的工具和组件
import './App.css';
import Glow from './Glow';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import AIBioGenerator from './AIBioGenerator';


function App() {
  return (
    // 使用 <> Fragment 来包裹所有顶级组件
    <>
      {/* 1. 渲染辉光背景特效 */}
      <Glow />

      {/* 2. 渲染你的主页内容 */}
      <div className="container">
        <header>
          <img className="avatar" src="https://i.pravatar.cc/150?img=3" alt="我的头像" />
          <h1>Yo, Bro Yang 👋</h1>
          <p className="subtitle">一名原神爱好者 & 终身QQ会员</p>
        </header>

        <main>
          {/* 打字机效果 */}
          <section id="about">
            <h2 data-text="About...">About me</h2>
            <TypeAnimation
              sequence={[
                '我是一名万花筒写轮眼天照哥...',
                1000,
                '我有满名可莉。',
                1000,
                '我痴迷王者荣耀上分。',
                1000,
                '我也对 三角洲 俄乌感兴趣。',
                2000,
              ]}
              wrapper="p"
              speed={50}
              style={{ fontSize: '1.1em', display: 'inline-block', lineHeight: '1.6' }}
              repeat={Infinity}
            />
          </section>

          {/* 在这里添加我们的新组件！ */}
          <AIBioGenerator />
          <section id="skills">
          {/* ... 技能卡片 ... */}
          </section>

          {/* 可拖拽的技能卡片 */}
          <section id="skills">
            <h2>My Skill</h2>
            <p style={{textAlign: 'center', color: '#888', marginTop: '-10px', marginBottom: '30px'}}>试着拖拽一下这些卡片！</p>
            <div className="skills-grid">
              {["Spark", "Hadoop", "Yarn", "Python", "Git", "Java", "Tesla", "CGU"].map(skill => (
                <motion.div
                  key={skill}
                  className="skill-card"
                  drag
                  dragConstraints={{ top: -20, left: -20, right: 20, bottom: 20 }}
                  dragElastic={0.8}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </section>

          <section id="contact">
            <h2>联系我</h2>
            <div className="contact-links">
              <a href="mailto:your_email@example.com">发送邮件</a>
              <a href="https://github.com/your_username" target="_blank" rel="noopener noreferrer">我的 GitHub</a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;