import {  createMachine } from "xstate";
import fetchMachine from "./Machines/fetchMachine";
import sendMachine from "./Machines/sendMachine";

/**
 * 以下是 XState 中内置的 actions：
 * send：发送事件到状态机，并驱动状态转移
 * raise：从嵌套的状态机中向父级状态机发送事件
 * assign：更新状态机的 context 状态
 * log：向控制台输出调试信息
 * choose：根据当前状态机的 context 或事件触发条件，选择执行不同的转移路径
 * delay：用于在一定时间后触发一个事件，通常用于执行定时任务
 * cancel：取消之前启动的 send、invoke、spawn 或 delay 操作
 * invoke：定义异步边界，并执行一些副作用操作，例如调用 API 或启动一个定时器等
 * init：用于在状态机启动时初始化状态和 context 值
 * done：将状态机的当前状态标记为终止状态，并在出现合适的状态转移时终止状态机执行
 */
const parallelMachine = createMachine({
    id: 'parallel-machine',
    type: 'parallel',
    states: {
      fetchMachine:  fetchMachine as any,
      sendMachine: sendMachine as any
    },
    on: {
      // 在执行任何事件时执行指定的Actions
      // 这里的"doSomeAction"是一个自定义的Action
      '*': { actions: ['doSomeAction'] }
    }
  }).withConfig({
    actions: {
        doSomeAction: (context, event) => {
            // fetchMachine.send(event.type)
            console.log(`Received event ${event.type}`);
        }
    }
  });

export default parallelMachine