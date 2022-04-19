import React from "react";
import 'grapesjs/dist/css/grapes.min.css';
import { Editor } from 'grapesjs-react'
import './styles.css'

// const editor = grapesjs.init({
//   container : '#root',
//   components: '<div class="txt-red">Hello world!</div>',
//   style: '.txt-red{color: red}',
// });

// const blockManager = editor.BlockManager;

// blockManager.add('my-first-block', {
//   label: 'Simple block',
//   content: '<div class="my-block">This is a simple block</div>',
// });

const Context = React.createContext()

const customComponents = editor => {
  editor.DomComponents.addType('my-input-type', {
    // Make the editor understand when to bind `my-input-type`
    isComponent: el => el.tagName === 'INPUT',
  
    // Model definition
    model: {
      // Default properties
      defaults: {
        tagName: 'input',
        draggable: 'form, form *', // Can be dropped only inside `form` elements
        droppable: false, // Can't drop other elements inside
        attributes: { // Default attributes
          type: 'text',
          name: 'default-name',
          placeholder: 'Insert text here',
        },
        traits: [
          'name',
          'placeholder',
          { type: 'checkbox', name: 'required' },
        ],
      }
    }
  });
};

const onInit = (editor, foo) => {
  // console.log({ editor, foo })
  const blocks = editor.BlockManager.getAllVisible()
      console.log({ blocks })
}

export default function App() {
  const grapes = React.useRef({})
  window.grapes = grapes.current
  
  console.log(grapes.current)
  React.useEffect(() => {
    if (grapes.current) {
      const blocks = grapes.BlockManager.getAllVisible()
      console.log({ blocks })
    }
  }, [grapes.current])

  return (
    <Context.Provider value={grapes.current}>
    <div className="App">
      <Editor ref={grapes} onInit={onInit} plugins={[customComponents]}/>
    </div>
    </Context.Provider>
  );
}
