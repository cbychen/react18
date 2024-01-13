
import { createRoot } from "react-dom/client"
// const element = (
//    <h1>
//     hello,,
//     <span style={{color:'red'}}>world</span>
//   </h1>
// )


function FunctionComponent() {
  return (
    <h1>
    hello,,
    <span style={{color:'red'}}>world</span>
  </h1>
  )
}

const element = <FunctionComponent />

const root = createRoot(document.getElementById('root'))

root.render(element)
console.log(root)