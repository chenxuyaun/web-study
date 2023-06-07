import { createMachine, interpret, send } from 'xstate'; 
const sendMachine = createMachine({
    id: "sendMachine",
    initial: 'idle',
    states: {
      idle: {
        on: {
          START: 'loading'
        }
      },
      loading: {
        entry: send('FETCH', { to: 'api' }),
        on: {
          RESOLVE: 'success',
          REJECT: 'failure'
        }
      },
      success: {},
      failure: {}
    }
  });

  export default interpret(sendMachine).start();