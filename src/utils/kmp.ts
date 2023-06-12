export class KMP {
    private source: (string | number)[];
    private target: (string | number)[];
    constructor(source: string | number[], target: string | number[]) {
        this.source = [...source];
        this.target = [...target];
    }
    public getNext() {
        const temp = this.target;
        const next = new Array(temp.length);
        let i = 1;
        let j = 0;
        next[0] = 0;
        while (i < temp.length) {
            if(temp[i] === temp[j]){
                ++j;
                next[i] = j;
                ++i;
            }else{
                if(j > 0){
                    j = next[j-1];
                }else{
                    next[i] = 0;
                    ++i;
                }
            }
        }
        return next;
    }

    /**
     * KMP查找
     */
    public findIndex() {
        // 1. 获取查找资源的kmp的next下标
        const next = this.getNext();
        // 2. 初始化被查询资源的当前下标
        let i = 0;
        // 3. 初始化查询资源的当前下标
        let j = 0;
        // 4. 循环判断，是否已经循环完，查找资源和目标资源
        while (i < this.source.length && j < this.target.length) {
            if(this.source[i] === this.target[j]){
                i++;
                j++;
            }
            else{
                if(j > 0){
                    j = next[j - 1];
                }else{
                    i++;  
                }
            }
        }
        if(j === this.target.length){
            return [i - j + 1, i];
        }else{
            return "无数据";
        }
        
    }
}

console.log(new KMP("aaaccababaaabsba", "ababaaabs").findIndex())