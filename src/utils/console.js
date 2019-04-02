// 加载控制台
 const loadScript = (url, callback) => {
    const script = document.createElement('script')
    script.onload = () => callback()
    script.src = url
    document.body.appendChild(script)
   }
   
   loadScript(
   'https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js',
    () => {
   // eslint-disable-next-line
   new VConsole()
    })


export default loadScript;