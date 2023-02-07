import {ChangeEvent, memo, useState} from "react";
import {NodeProps} from "../types";
import NodeInput from "./NodeInput";

function Node({node, addNode, deleteNode, nodeName, getNewNoneName}: NodeProps) {
  const [showNode, setShowNode] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const className = node.children?.length ? 'hasChildren' : 'noChildren';

  const toggleShowNode = () => setShowNode(!showNode);
  const openInput = () => setShowInput(true);

  const findPath = (e: React.MouseEvent) => {
    let path: (string | undefined)[] = [];
    let parent = (e.target as HTMLElement).parentElement;

    do {
      path.unshift(parent!.parentElement?.id);
      parent = parent!.parentElement!.parentElement;
    } while (parent && parent!.parentElement!.id);

    console.log(path.join(' > '));
  }

  return (
    <li id={node.name} className='list-item'>
      <span onClick={toggleShowNode} className={className}>{node.name}</span>
      <div className='buttons'>
        <button className='button' onClick={openInput}>add</button>
        <button className='button' onClick={() => deleteNode(node.name)}>delete</button>
        <button className='button' onClick={findPath}>path</button>
      </div>
      {showInput && (
        <>
          <NodeInput value={nodeName}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => getNewNoneName(e.target.value)}/>
          <button className='button' onClick={() => {
            addNode(node.name);
            setShowInput(false);
          }
          }>
            OK
          </button>
        </>
      )}
      {showNode && <ul className='list'>
        {node.children?.map((node, index) => (
          <Node
            key={index}
            node={node}
            addNode={addNode}
            deleteNode={deleteNode}
            nodeName={nodeName}
            getNewNoneName={getNewNoneName}
          />
        ))}
      </ul>}
    </li>
  )
}

export default memo(Node);
