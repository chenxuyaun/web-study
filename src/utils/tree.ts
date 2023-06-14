import { type } from "os"

export type Node<T> = {
    id: number;
    val: T;
    children: Node<T>[];
}

// 树形数据
export type TreeNode<T> = Partial<Node<T>>

export type BinaryNode<T> = {
    id: number;
    val: T;
    left: BinaryNode<T>,
    right: BinaryNode<T>
}

// 二叉树数据格式
export type BinaryTreeNode<T> = Partial<BinaryNode<T>>

export class tree<T> {
    private MAX_TREE_SIZE: number;
    private TREE_NODES: TreeNode<T>;
    constructor(nodes: TreeNode<T> = {},size = 100) {
        this.MAX_TREE_SIZE = size;
        this.TREE_NODES = nodes;
    }
    // 获取树状数据深度
    public getTreeDepth(nodes: TreeNode<T>): number{
        if(!nodes.val || !nodes?.children?.length)
            return 0;
        let maxDepth = 0;
        for (let index = 0; index < nodes.children.length; index++) {
            maxDepth = Math.max(maxDepth, this.getTreeDepth(nodes.children[index]))
        }
        return maxDepth + 1;
    }
    // 获取树状数据节点数量
    public getTreeNodeCount(nodes: TreeNode<T> ): number {
        if(!nodes.val || !nodes?.children?.length)
            return 1;
            let maxCount = 0;
            for (let index = 0; index < nodes.children.length; index++) {
                maxCount += this.getTreeDepth(nodes.children[index]);
            }
            return maxCount;
    }
    // 树状结点数据转换成二叉树结点数据
    private treeByBinary<T>(node: TreeNode<T>, left?: BinaryNode<T>, right?: BinaryNode<T>): BinaryTreeNode<T>{
        const { id, val } = node;
        return {
            id,
            val,
            left: left,
            right: right
        }  
    }
    // 树状数据转二叉树
    public getBinary(nodes: TreeNode<T>): BinaryTreeNode<T>{
        if(!nodes?.children?.length){
            return this.treeByBinary<T>(nodes);
        }
        const binaryTreeNode: BinaryTreeNode<T> = this.treeByBinary<T>(nodes, );
        const data = new Array(nodes.children.length);
        data[0] = this.getBinary(nodes.children?.[0]) as BinaryNode<T>;
        for (let index = 1; index < nodes.children.length; index++) {
            data[index]= this.getBinary(nodes.children?.[index]) as BinaryNode<T>;
        }
        for (let index = nodes.children.length - 1; index > 0; index--) {
            data[index - 1].right= data[index];
        }
        return binaryTreeNode;
    }
}