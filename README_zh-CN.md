[English](/README.md) | [中文](/README_zh-CN.md)

# Fask "in TagTree of" check for TiddlyWiki5

一个非常快速的`kin::to[xxx]`的版本。

> 找出一个tiddler的来源，它是否在以xxx为根的标签树中？

## 用法

参见[demo site](https://tiddly-gittly.github.io/in-tagtree-of/)的交互式例子。

### 正常用法

`[[Ling]in-tagtree-of[Clancy]]`：检查`Ling`是否在以`Clancy`为根的标签树中。

`[all[tiddlers]!in-tagtree-of[Clancy]]`：使用`!`前缀，获得所有不在以`Clancy`为根的标签树中的条目。

### 高级用法

`[all[tiddlers]in-tagtree-of:inclusive[Clancy]]`：以`inclusive`为后缀，获得所有在以`Clancy'为根的标签树中的条目，包括`Clancy`本人。