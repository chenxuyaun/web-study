# 20230608
## jest
### 安装
```
yarn add --dev jest ts-jest @types/jest
```
### 构建jest配置文件
```
yarn ts-jest config:init
```
### 示例
```方法
export const introduceMyself = (first: string, last: string) => `Hello ${first} ${last}`;

```
```测试
import { introduceMyself } from "../src";

describe("introduceMyself", ()=>{
    it("should introduce me", ()=>{
        expect(introduceMyself("J", "H")).toEqual("Hello J H")
    })
})
```
## create-nx-workspace
        Nx 是一个智能的、快速的、可扩展的，单代码库优先和强大的插件集成的构建系统。
### 创建工作区
```
npx create-nx-workspace [项目名称]
```
### 代码生成
```
nx generate <collection:generator>
```
# 20230608
## 数学微分
```
dy=f'(x)dx
```
f(x)约等f(x0)+f(x0)*(x-x变量)
## 线性表
### 顺序结构
### 链式存储结构
#### 单链表
#### 静态链表
#### 循环链表
#### 双向链表
## 设计模式
### 策略模式
### 单一职责模式