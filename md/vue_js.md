# Vue.js 

## 表单

* 可以用v-model指令在表单控件元素上创建双向数据绑定

            ViewModel    
View  →   DOM listeners  →    Model    
      ←   Data Bindings  ←    
↓              ↓                ↓   
↓              ↓                ↓   
DOM           Vue      Plain JavaScript Object

* v-model 会根据控件类型自动选取正确的方式来更新元素

### 输入框

```html
<div>
      <p>input 元素:</p>
      <input v-model="message" placeholder="编辑我..." />
      <p>消息是: {{message}}</p>

      <p>textarea 元素:</p>
      <p style="white-space:pre">{{message2}}</p>
      <textarea v-model="message2" placeholder="多行文本输入..."></textarea>
    </div>
```

### 复选框



## 事件处理器

* 事件监听使用 v-on 指令
* 直接写表达式
* 写methods, 然后绑定方法
* 写methods, 然后直接调用

### 事件修饰符

为v-on提供事件修饰符来处理DOM事件细节

* .stop
* .prevent
* .capture
* .self
* .once

```html
<!-- 阻止点击事件冒泡 -->
<a v-on:click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 修饰符可串联 -->
<a v-on:click.stop.prevent="doThat"></a>
<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
<!-- 添加事件监听时 使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>
<!-- 只当事件在钙元素本身(而不是子元素)触发时触发回调-->
<div v-on:click.self="doThat">...</div>

<!--click事件只能点击一次, 2.1.4版本新增 -->
<a v-on:click.once="doThis"></a>
```

### 按键修饰符

为v-on 在监听键盘事件时添加按键修饰符

```html
<!-- 只有在keyCode是13时调用 vm.submit()-->
<input v-on:keyup.13="submint">

<!-- 使用按键别名 -->
<input v-on:keyup.enter="submint">
<!-- 缩写写法 -->
<input @keyup.enter="submint">

<!-- 组合键 Alt + C -->
<input @Keyup.alt.67="clear">
<!-- 组合键 Crtl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

按键的别名:

* .enter
* .tab
* .delete   (捕获"删除"和"退格"键)
* .esc
* .space
* .up
* .down
* .left
* .right
* .ctrl
* .alt
* .shift
* .meta


## 样式绑定 

### class 属性绑定

* v-bind:class 设置对象, 从而静态切换对象

 <p v-bind:class="{[样式名]:[控制变量],[样式名2]:[控制变量2]}">aaaaa</p>

```html
<p v-bind:class="{'ght':alexa%2==0,'ght2':alexa%2!=0}">aaaaa</p>
```

* 直接传入一个对象
* 可以传入一个数组
* 可以使用三元表达式

### style 内联样式

* 可以直接设定样式
* 可以传入对象
* 也可以传入列表


## 监听属性

```html
<button @click="alexa++">给王庚的岁数加1</button>
```

```js
  watch: {
    alexa: function (nval, oval) {
      this.sites[1].age = nval
      console.log(this.sites[1].name + '的年龄改变: ' + oval + ' 变为 ' + nval + '!')
    }
  }
```

* 发现每点一次按钮, 年龄增长了, 同时, 貌似页面也会被刷新一次, 因为之前的那个管道也会被执行一次

```html
    <p>{{use|send|three("第二个参数",5+5)}}</p>
```

* 同时监听两个输入框, 修改一个, 会更新另一个

```html
    <div>
      千米:
      <input type="text" v-model="kilometers" />
      米:
      <input type="text" v-model="meters" />
    </div>
```


```js
watch: {
    kilometers: function (val) {
      this.kilometers = val
      this.meters = this.kilometers * 1000
    },
    meters: function (val) {
      this.kilometers = val / 1000
      this.meters = val
    }
  }
```

## 计算属性

* 关键字: computed

### computed VS methods

* 效果一样
* computed 是基于 依赖缓存, 只有相关依赖发生改变时才会重新取值
* methods 在重新渲染的时候, 函数总会重新调用执行
* computed性能更好

```js

var vm = new Vue({
  computed: {
    xxx: {
      // getter
      get: function () {
        return this.name + ' -- ' + this.url
      },
      // setter
      set: function (newVaule) {
        var names = newVaule.split(' ')
        this.name = names[0]
        this.url = names[names.length - 1]
      }
    }
  }
})

vm.xxx = '郭海涛 xxx.xxx.cn'
console.log(vm)
document.write('name: ' + vm.name)
document.write('<br>')
document.write('url: ' + vm.url)

// 貌似直接在<template> 中写下面的会报错
<h1>vm.name = {{vm.name}}</h1>
```




## 条件与循环

### 循环语句

#### v-for

* 坑: 现在版本貌似必须要有 :key
* 按照下面的写法, 页面会报警, 说key可能有重复

```js
    <ol>
      <li v-for="site in sites" v-bind:key="site">{{site.name}}</li>
    </ol>
```

* 最好写成下面这样的, 第二个参数是键名

```js
    <ol>
      <li v-for="(site,index) in sites" v-bind:key="index">{{site.name}}</li>
    </ol>
```

* 展示对象

```js
<ul v-for="(value,n) in site" v-bind:key="n">{{n}}:{{value }}</ul>
```

* 多个参数

```js

    <ol>
      <li v-for="(site,x,index) in sites" v-bind:key="index">
        <ol>
          {{index}}:{{x}}
          <ul v-for="(value,n,index) in site" v-bind:key="index">{{index}}:{{n}}:{{value }}</ul>
        </ol>
      </li>
    </ol>

// 显示结果

// :0
// 0:name:郭海涛
// 1:age:100
// :1
// 0:name:王庚
// 1:age:10
```

* 迭代整数

```js
 <p v-for="n in 10" v-bind:key="n">{{n}}</p>
```

### 条件判断 

#### v-if

```js

    <p v-if="use">v-if可以显示</p>
    <template v-if="use">
      <h2>22 site:{{site}}</h2>
      <h2>22 url:{{url}}</h2>
      <h2>22 {{details()}}</h2>
    </template>

    <!-- Handlebars 模板 -->
    <!-- {{#if use}}
    <h1>YES</h1>
    {{/if}}-->

```

#### v-else

```js
<div v-if="Math.random() > 0.5">大于</div>
<div v-else>小于等于</div>
```

#### v-else-if

```js
    <div v-if="number > 0.5">大于</div>
    <div v-else-if="number == 0.5">等于</div>
    <div v-else>小于</div>
```

#### v-show

根据条件展示元素

```js
<h1 v-show="use">Hello!</h1>
```

## 起步

* 语法格式

```js
var vm = new Vue({
    // 选项
})
```

一个`<template>`中貌似只能有一个id, 其他的找不到, 

* 模板语法

```js

// 文本的数据绑定
{{变量名}} 

// Html
<div v-html="变量名"></div>

// 属性 此处针对class, 可添加样式
<p v-bind:class="{'ght':use}">aaaaa</p>

// 参数
<pre><a v-bind:href="url">百度</a></pre>
// v-on:监听事件
 <pre><a v-bind:href="url" v-on:click="toLog('百度')">百度</a></pre>

// 表达式
{{5+5}}<br>
{{ ok ? 'YES' : 'NO' }}<br>
{{ message.split('').reverse().join('') }}

// 指令 v-前缀
<p v-if="use">v-if可以显示</p>

// 修饰符 没看懂??
// <form v-on:submit.prevent="onSubmit"></form>
// .prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：

// 用户输入  需要一个变量
<input v-model="myname" />
<pre><a v-bind:href="url" v-on:click="toLog(myname)">我的名字:{{myname}}</a></pre>

// 过滤器 类似Linux的管道
<p>{{use|send}}</p>
filters: {
    send: function (use) {
      if (use) {
        return '发送成功!'
      } else {
        return '发送失败!'
      }
    }
  }

// 三个参数
<p>{{use|send|three("第二个参数",5+5)}}</p>

  filters: {
    send: function (use) {
      if (use) {
        return '发送成功!'
      } else {
        return '发送失败!'
      }
    },
    three: function (arg1, agr2, agr3) {
      console.log(arg1, agr2, agr3)
      return '发送?'
    }
  }
// 结果:  发送成功! 第二个参数 10

// 缩写
// v-bind 缩写
<a v-bind:href="url">完整写法</a>
<a :href="url">缩写</a>

// v-on 缩写
<a v-on:click="send()">完整写法</a>
<a @click="send()">缩写</a>

```





## 目录结构

* {项目名称}
  * build: 项目构建(webpack)相关代码
  * config: 配置目录, 包括 端口号 等. 
  * node_modules: npm 加载的项目依赖模块
  * src: 开发目录
    * assets: 放置图片, 如logo等
    * components: 放置组件文件, 
    * App.vue: 项目入口文件, 可直接将组件写在这里,而不适用 components目录
    * main.js: 项目的核心文件
  * static: 静态资源目录, 如图片, 字体等
  * test: 初始测试目录, 可删除
  * .xxxx文件: 配置文件, 包括语法配置, git配置等
  * index.html: 首页入口文件, 可以添加一些meta信息或统计代码
  * package.json: 项目配置文件
  * README.md: 项目的说明文档


## 搭建 vscode + vue 环境

* 安装 node.js
* 安装 npm
* 安装 cnpm 
  * $ npm install -g cnpm --registry=https://registry.npm.taobao.org
* 安装 vue-cli 脚手架大建工局
  * $npm install -g vue-cli
* cd {项目所在目录}
* vue init {模板项目:webpack} {项目名称}
* cd {项目名称}
* npm run dev