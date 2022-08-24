// vue cli/vite
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
      // 设置某些组件不转换为 vw 等适配
      selectorBlackList: ["favor"]
    }
  }
};
