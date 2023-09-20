
import * as ReactWorkTags from 'react-reconciler/src/ReactWorkTags'

const ReactWorkTagsMap = new Map()

for (const tag in ReactWorkTags) {
  ReactWorkTagsMap.set(ReactWorkTags[tag], tag)
}

export default function (prefix,workInProgress) {
  
  let tagValue =  workInProgress.tag;

  let tagName = ReactWorkTagsMap.get(tagValue);

  let str = `${tagName}`

  if(tagName==='hostComponent') {
  	str +  `${workInProgress.type}`
  }else if(tagName === 'HostText'){
    str + `${workInProgress.pendingProps}`
  }



   console.log('str prefix',`${prefix}${str}` )
}