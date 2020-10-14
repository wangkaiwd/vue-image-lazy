## `Vue`实战：图片懒加载组件

在日常开发中，图片资源请求是一件比较耗费资源的事情。当每次进入页面时，如果一次性请求当前页面中的所有图片，会占用很大的资源。而图片懒加载所实现的功能，就是只加载用户可视区域的图片，而可视区域外的图片并不会进行资源请求，当页面滚动到其它位置时会对当前可视区域的内容继续进行加载。

其`HTML`加载过程如下：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20201014105103.png)

已加载的图片为用户已经浏览过的内容，处于`loading`的图片是用户当前正在浏览的内容，之后会替换为图片的真实路径，而还未加载的图片处于可视区域下方，没有`src`属性，只有在用户浏览时才会进行加载。

在了解了图片懒加载的大致工作流程后，我们开始使用`Vue`自己实现一个图片懒加载组件。

### 组件使用方式分析
这里我们设计一下用户会如何使用我们是实现的组件：
```javascript
import Vue from 'vue';
import LazyLoad from '@/components/lazy-load';

Vue.use(LazyLoad, {
  preload: 1.3, // 可视区域相对于容器高度的比例，即可视区域 = 容器高度*preload
  error: require('@/assets/imgs/error.png'), // 图片加载失败时显示
  loading: require('@/assets/imgs/loading.png') // 图片加载过程中显示
});
```

上述代码中，我们使用`Vue.use`来使用`LazyLoad`组件，说名该组件是一个`Vue`插件。在页面中的使用方式如下： 
```vue
<template>
  <div class="container">
    <img class="img" v-for="(img,index) in images" v-lazy="img" :key="index" alt="">
  </div>
</template>
```
可以看到在`img`标签上，我们用到了`v-lazy`指令。这是`Vue`中的自定义指令，方便我们进行`dom`操作，以及封装一些可复用的逻辑。

### 组件安装
在之前我们提到过要使用`Vue.use`来使用组件，所以组件要暴露`install`方法。
```js
// index.js
import Lazy from '@/components/lazy-load/lazy';

const install = (Vue, options) => {
  const lazy = new Lazy(Vue,options);
  Vue.directive('lazy', {
    bind: lazy.add.bind(lazy),
    unbind: lazy.destroy.bind(lazy)
  });
};

export default install;
```
上边代码中`Lazy`是一个`class`，用来书写组件的逻辑，代码如下：
```js
import ReactiveListener from '@/components/lazy-load/listener';

class Lazy {
  constructor (Vue, options) {
    this.Vue = Vue;
    this.options = options;
  }
  // 为每个img元素绑定bind钩子函数
  add (el, binding) {
    
  }
  // 销毁时绑定unbind函数
  destroy () {
    
  }
}

export default Lazy;
```

### 首次加载图片

