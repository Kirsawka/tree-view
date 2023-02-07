import {useState} from 'react';
import {TreeNode, TreeViewProps} from "../types";
import Node from './Node';

function TreeView({tree}: TreeViewProps) {
  const [data, setData] = useState(tree);
  const [nodeName, setNodeName] = useState('');

  const findNode = (data: any, name: string): TreeNode | undefined => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].name === name) {
        return data[i];
      }
      if (data[i].children) {
        const node = findNode(data[i].children, name);
        if (node) {
          return node;
        }
      }
    }
  }

  const recursiveRemove = (data: TreeNode[], name: string) => {
    return data.map(node => {
      return {...node}
    }).filter(node => {
      if (node.children) {
        node.children = recursiveRemove(node.children, name);
      }
      return node.name !== name;
    });
  };

  const addNode = (name: string) => {
    const parentNode = findNode(data, name);
    if (parentNode) {
      if (!parentNode.children) {
        parentNode.children = [];
      }
      if (nodeName) parentNode.children.push({name: nodeName});
    }
    setData([...data]);
    setNodeName('');
  };

  const getNewNoneName = (text: string) => {
    if (text) setNodeName(text);
  };

  const deleteNode = (name: string) => {
    setData(recursiveRemove(data, name));
  };

  return (
    <ul className='list'>
      {data.map((node, index) => (
        <Node
          key={index}
          node={node}
          addNode={addNode}
          deleteNode={deleteNode}
          nodeName={nodeName}
          getNewNoneName={getNewNoneName}
        />
      ))}
    </ul>
  );
}

export default TreeView;
