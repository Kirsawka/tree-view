import {ChangeEvent} from "react";

export type TreeNode = {
  name: string;
  children?: TreeNode[];
};

export type Tree = TreeNode[];

export type TreeViewProps = {
  tree: TreeNode[];
}

export type NodeProps = {
  node: TreeNode;
  addNode: (nodeName: string) => void;
  deleteNode: (nodeName: string) => void;
  nodeName: string;
  getNewNoneName: (text: string) => void;
}

export type NodeInputProps = {
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}