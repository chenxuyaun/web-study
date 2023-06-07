import { createMachine, assign, interpret} from 'xstate';
const fetchMachine = createMachine({
    id: 'fetchMachine',
    initial: 'idle',
    context: {
        dog: null
    },
    states: {
        idle: {
            on: {
                FETCH: 'loading'
            }
        },
        loading: {
            invoke: {
                id: 'fetchDog',
                src: (context, event) =>
                    fetch('https://dog.ceo/api/breeds/image/random').then((data) =>
                        data.json()
                    ),
                onDone: {
                    target: 'resolved',
                    actions: assign({
                        dog: (_, event) => event.data
                    })
                },
                onError: 'rejected'
            },
            on: {
                CANCEL: 'idle'
            }
        },
        resolved: {
            type: 'final'
        },
        rejected: {
            on: {
                FETCH: 'loading'
            }
        }
    }
}); 
export default interpret(fetchMachine).start();