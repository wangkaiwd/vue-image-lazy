## `Vue`实战：图片懒加载组件
> **注意** ： 文中 "加载区域" = 可视区域(父容器高度) * preload(用户使用时配置项中传入) = 可视区域(父容器高度) + 预加载区域
> ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/2020-10-14-16-56.png)

当访问页面时，如果一次性请求当前页面中的所有图片，会占用很大的资源。而图片懒加载所实现的功能，就是只加载用户加载区域的图片，而加载区域外的图片并不会进行资源请求，当页面滚动时会对当前加载区域的内容继续进行加载。

其`HTML`加载过程如下：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20201014105103.png)


已加载的图片为用户已经浏览过的内容，处于`loading`的图片是用户当前正在浏览的内容，之后会替换为图片的真实路径，而还未加载的图片处于可视区域下方，没有`src`属性，只有在用户浏览时才会进行加载。

在了解了图片懒加载的大致工作流程后，我们开始使用`Vue`自己实现一个图片懒加载组件。

### 组件使用方式分析
这里我们设计一下用户将如何使用我们实现的组件：
```javascript
import Vue from 'vue';
import LazyLoad from '@/components/lazy-load';

Vue.use(LazyLoad, {
  preload: 1.3, // 加载区域相对于可视区域的比例，即加载区域 = 容器高度(可视区域) * preload
  error: require('@/assets/imgs/error.png'), // 图片加载失败时显示
  loading: require('@/assets/imgs/loading.png') // 图片加载过程中显示
});
```

上述代码中，我们使用`Vue.use`来使用`LazyLoad`组件，说明该组件是一个`Vue`插件。在页面中的使用方式如下： 
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
class Lazy {
  constructor (Vue, options) {
    this.Vue = Vue;
    this.options = options;
  }
  // 为每个img元素绑定bind钩子函数
  add (el, binding) {
    this.Vue.nextTick(()=> {
    
    })
  }
  // 销毁时绑定unbind函数
  destroy () {
    
  }
}

export default Lazy;
```
需要注意由于我们绑定的是自定义指令的`bind`钩子函数，在钩子函数执行的时候会获取不到绑定指令的元素。通过`Vue.nextTick`方法，可以确保逻辑在`DOM`渲染完毕后执行，准确获取到页面中的元素

### 首次加载图片
要想渲染可视区域中对应的图片，逻辑如下：
* 获取`el`(绑定自定义指令的元素)的父容器元素
* 将所有`el`收集起来
* 判断收集的`el`是否在加载区域内，以及是否被加载过
* 加载"加载区域"内没有被加载过的图片

代码如下：
```js
// lazy.js
import ReactiveListener from '@/components/lazy-load/listener';

class Lazy {
  constructor (Vue, options) {
    this.Vue = Vue;
    this.options = options;
    this.listenerQueue = [];
    this.parent = undefined;
    // 将原型上的方法绑定到自身的属性上
    this.lazyHandler = this.lazyHandler.bind(this);
  }

  add (el, binding) {
    // 确保能获取到dom元素
    this.Vue.nextTick(() => {
      // 获取父容器元素
      this.parent = this.getScrollParent(el);
      // ReactiveListener 包含绑定指令的每一项元素的信息
      const listener = new ReactiveListener({
        el,
        src: binding.value,
        parent: this.parent,
        lazyOptions: this.options
      });
      // 将收集队列
      this.listenerQueue.push(listener);
      // 加载队列中收集的元素
      this.lazyHandler();
    });
  }

  lazyHandler () {
    this.listenerQueue.forEach(listener => {
      // 加载区域内并且没有被加载过的文件需要加载
      if (listener.checkInView() && (listener.state === 'init')) {
        listener.load();
      }
    });
  }

  getScrollParent (el) {
    let parent = el.parentNode;
    while (parent && parent !== window) {
      // 返回一个对象，该对象包含在应用激活的样式表和解析这些值可能包含的任何基础计算后的一个元素的所有CSS属性值。
      // 单独的CSS属性值通过对象提供的APIs或者通过CSS属性名索引访问
      const { overflow, overflowY } = getComputedStyle(parent);
      if (/scroll|auto/.test(overflow) || /scroll|auto/.test(overflowY)) {break;}
      parent = parent.parentNode;
    }
    return parent;
  }
}

export default Lazy;
```
在`Lazy`类中，我们会通过递归调用`el.parentNode`，来不停的查找其父元素，直到找到设置了`overflow`属性的元素。该元素就是我们要找的容器元素，要加载的图片会在容器元素内滚动。

在`lazyHandler`中我们检查所有收集的`listener`是否在加载区域内以及是否加载过，对于加载区域内没有加载过的元素调用`load`方法。

`listener`是`ReactiveListener`的实例，用来描述每一个被加载图片的信息，其内部实现如下：
```js
class ReactiveListener {
  constructor (options) {
    const { lazyOptions } = options;
    this.el = options.el;
    this.src = options.src;
    this.parent = options.parent;
    this.preload = lazyOptions.preload;
    this.loading = lazyOptions.loading;
    this.error = lazyOptions.error;
    this.state = 'init'; // init, pending, success, failure
  }
  
  // 检查元素是否在加载区域内
  checkInView () {
    const { top, height } = this.parent.getBoundingClientRect();
    const { top: elTop } = this.el.getBoundingClientRect();
    return elTop - height * this.preload < top;
  }
  // 加载图片
  load () {
    this.state = 'pending';
    this.el.src = this.loading;
    this.loadImage(() => {
      this.state = 'success'
      this.el.src = this.src
    },() => {
      this.state = 'failure'
      this.el.src = this.error
    })
  }
  // 模拟图片异步加载过程
  loadImage (resolve, reject) {
    const image = new Image();
    image.src = this.src;
    image.addEventListener('load', resolve);
    image.addEventListener('error', reject);
  }
}

export default ReactiveListener;
```
`checkInView`方法内部判断了图片是否在加载区域内，其计算逻辑如下图：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/2020-10-14-15-08.png)
当 图片距离视口的`top` - 父容器 * 预加载比例 < 父容器距离视口的`top` 时，说明图片在加载区域内部，需要加载。加载区域会低于父容器底部的一定位置，这样会在用户的可视区域外再提供一些预加载区域，用于多加载一些图片，从而提升用户体验。

在图片加载时，我们通过创建一个`Image`实例。为`image`设置`src`属性后，通过监听`load`以及`error`事件来模拟其加载过程，便于真实图片在加载中显示`loading`状态图片以及加载失败显示`error`状态图片。

### 容器滚动时加载
当用户滚动父容器时，可视区域发生了变化，此时我们需要对所有收集的`listener`中处于未加载状态的图片进行加载：
```javascript
import ReactiveListener from '@/components/lazy-load/listener';

class Lazy {
  constructor (Vue, options) {
    // omit some code...
    // 将原型上的方法绑定到自身的属性上
    this.lazyHandler = this.lazyHandler.bind(this);
  }

  add (el, binding) {
    // 确保能获取到dom元素
    this.Vue.nextTick(() => {
      this.parent = this.getScrollParent(el);
      if (!this.hasBindScroll) {
        this.parent.addEventListener('scroll', this.lazyHandler);
        this.hasBindScroll = true;
      }
      // omit some code ...  
    });
  }
  lazyHandler () {
    this.listenerQueue.forEach(listener => {
      if (listener.checkInView() && (listener.state === 'init')) {
        listener.load();
      }
    });
  }
}
```
`hasBindScroll`用来防止对`parent`多次绑定`scroll`，在首次绑定之后就会设置为`true`。

在父容器滚动的时候执行`lazyHandler`方法，用于加载"加载区域"内的图片。需要注意的是：要提前绑定`lazyHandler`的`this`指向，否则`this`将会指向`parent`。

每次滚动的时候，都会执行`lazyHandler`中的逻辑，当图片内容较多时，性能会比较差，这里我们可以使用节流函数来进行优化。即用户滚动期间，我们可以设置间隔时间，在特定间隔时间内，只会执行一次`lazyHandler`函数，极大的减少了函数执行次数:
```javascript
import ReactiveListener from '@/components/lazy-load/listener';

class Lazy {
  constructor (Vue, options) {
    // omit some code ...
    // 指定this指向并且每200ms执行一次
    this.lazyHandler = this.throttle(this.lazyHandler.bind(this), 200);
  }
  // omit some code ...

  lazyHandler () {
    this.listenerQueue.forEach(listener => {
      if (listener.checkInView() && (listener.state === 'init')) {
        listener.load();
      }
    });
  }

  throttle (fn, wait = 0) {
    let timerId = null;
    return function (...args) {
      if (timerId) {return;}
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, wait);
    };
  }
}

export default Lazy;

```

到这里，我们就可以通过`chrome`浏览器控制台看到笔者在文章开始时截图的效果了。

### 结语
在文末对实现组件所需要的知识点以及其文档链接进行整理，方便进行查阅和回顾
* [`Vue.use`](https://cn.vuejs.org/v2/api/index.html#Vue-use): 安装一个`Vue.js`插件。如果插件是一个对象，它必须暴露一个`install`方法。如果它是一个函数，它将会作为安装方法来对待。
* [`Vue.nextTick`](https://cn.vuejs.org/v2/api/index.html#Vue-nextTick): 在下一次`DOM`更新循环之后执行延迟回调。在你已经更改一些数据之后，立即使用它来获取`DOM`更新后的数据。
* [`Vue`自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html#ad): 复用在普通`DOM`上的一些底层访问。 
* [`Element.getBoundingClientRect`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect): 返回一个元素的大小以及相对于视口的位置
* [`getComputedStyle`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle): 返回包含一个元素所有`CSS`属性值的一个对象，对象中的属性值是在应用激活样式表以及解析这些值可能包含的基础计算之后的值

参考资料：
* [`vue-lazyload`](https://github.com/hilongjw/vue-lazyload)
