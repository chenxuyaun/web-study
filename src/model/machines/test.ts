import { type } from "os";
import { createModel } from "xstate/lib/model";

export type TItem = {
    name: string
    age: number
}
export type TData<T> = {
    list: T[]
    total: number
}
const model = createModel(
    {
        searchValue: '',
        loading: false,
        list: [],
        page: 1,
        total: 0,
    },
    {
        events: {
            // 加载数据
            LOAD: (params: { page: number, searchValue: string }) => params
        },
    }
);
// 模拟远程数据请求
const getTableData = async (page: number, searchValue = '') => {
    return new Promise<TData<TItem>>((resolve, reject) => {
        setTimeout(() => {
            if (page === 3) {
                reject()
                return
            }
            resolve({
                list: Array.from({ length: 10 }).fill(1).map((_, i) => ({
                    name: page + '__' + searchValue + '__' + Math.random().toString(36).substring(2),
                    age: Math.round(Math.random() * 100)
                })),
                total: 100
            })
        }, (Math.random() * 1 + 0.5) * 1000)
    })
}

const machine = model.createMachine({
    context: model.initialContext,
    initial: 'idle',
    states: {
        idle: {
            on: {
                LOAD: {
                    target: 'pending',
                    actions: ['setContext']
                }
            }
        },
        pending: {
            invoke: {
                id: 'pending-data',
                src: (context: any) => getTableData(context.page, context.searchValue),
                onDone: {
                    target: 'success',
                    actions: model.assign({
                        loading: () => false,
                        total: (_, event) => ((event as any).data as TData<TItem>).total,
                        list: (_, event) => ((event as any).data as TData<TItem>).list as any
                    })
                },
                onError: {
                    target: 'failure',
                    actions: [
                        model.assign({
                            loading: false,
                        }),
                        () => alert('获取数据出错')
                    ]
                }
            } as any
        },
        success: {
            on: {
                LOAD: {
                    target: 'pending',
                    actions: ['setContext']
                }
            }
        },
        failure: {
            on: {
                LOAD: {
                    target: 'pending',
                    actions: ['setContext']
                }
            }
        }
    }
}, {
    actions: {
        setContext: model.assign({
            loading: () => true,
            page: (_, event) => event.page,
            searchValue: (_, event) => event.searchValue
        })
    }
})

export default machine;