function loadWebAssembly(filename, imports = {}) {
  return fetch(filename)
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.compile(buffer))
    .then(module => {
      imports.env = imports.env || {}
      Object.assign(imports.env, {
        memoryBase: 0,
        tableBase: 0,
        memory: new WebAssembly.Memory({
          initial: 256,
          maximum: 256
        }),
        table: new WebAssembly.Table({
          initial: 0,
          maximum: 0,
          element: 'anyfunc'
        })
      })
      return new WebAssembly.Instance(module, imports)
    })
}

loadWebAssembly('lab-webassembly.wasm')
  .then(instance => {
    function randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
          break;
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
          break;
        default:
          return 0;
          break;
      }
    }
    var xs=randomNum(100000000,1000000000)
    const srandnumber = instance.exports._srandnumber
    const beg = performance.now()
    console.log("随机数 "+xs+" 的奇偶为"+srandnumber(xs)+" (1为偶，0为奇)")
    const end = performance.now()


    labreturn.innerHTML = `
    <p>这是一片提供前端测试的区域。如果您能看到一些测试数据，那么恭喜您，您的浏览器支持最新的WebAssembly技术。<small>(<a href="https://zh.wikipedia.org/wiki/WebAssembly">什么是WebAssembly?</a>)</small></p>
    <p>这里的测试由js生成了个介于1亿到10亿之间的随机数提供给wasm小程序，wasm做了随机数次循环，并进行了奇偶判断并赋值，最后返回随机数的奇偶性。<small>(此处返回的数据不一定是你浏览器进行亿次数量级循环所耗费的时间，因为WebAssembly本身还有许多bug)</small></p>
    <p>随机数为${xs}\n 耗时 ${end-beg} ms\n</p>`;
  })


