import React, { Component } from 'react';
import { render } from 'react-dom';

import StoryEditor from "./StoryEditor"

import {DragPreviewBlock, DragDropContainer, EditorProvider, DropBlock} from "slate-react-dnd-plugin"

/*import DragPreviewBlock from "../../dist/drag-preview-block"
import DragDropContainer from "../../dist/container"
import DropBlock from "../../dist/drop-block"
import EdititorProvider from "../../dist/editor-provider"*/

const insertBlockFn = (hoverIndex, item, parent, change) => {

  const result = change.insertNodeByKey(parent.key, hoverIndex, {
    object: 'block',
    type: 'paragraph',
    nodes: [
      {
        object: 'text',
        leaves: [
          {
            text: 'A new Block via drag&drop'
          }
        ]
      }
    ]
  });

  item.key = result.value.document.nodes._tail.array[hoverIndex].key;

}

const canDrop = (props, monitor) => {
  return true;
}

const onDrop = (item, parent, change) => {
  console.log('onDrop', item, parent, change);
  change.removeNodeByKey(item.key);
};

const previewBlockStyle = {
	backgroundColor: 'white',
	cursor: 'move',
}

const renderPreviewBlock = (isDragging,children) => {
  const opacity = isDragging ? 0.4 : 1
  return <div style={{ ...previewBlockStyle, opacity }}>{children}</div>
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <DragDropContainer>
          <EditorProvider>
            <div className="wrapper">
              <div className="editor">
                <StoryEditor/>
              </div>
              <div className="rightMenu">
                <DragPreviewBlock className="rightMenu" onHover={insertBlockFn} renderBlock={renderPreviewBlock} >
                  <div className="dragItem">
                    <p>Insert paragraph from here.</p>
                  </div>
                </DragPreviewBlock>
                <DropBlock canDrop={canDrop} onDrop={onDrop}>
                  <div className="dustbin">
                    <p>Drop paragraph here to delete it.</p>
                  </div>
                </DropBlock>
              </div>
            </div>
          </EditorProvider>
        </DragDropContainer>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
