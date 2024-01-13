import { registerTwoPhaseEvent } from "./EventRegistry";


const simpleEventPluginEvents = [
  'click'
]

function registerSimpleEventPluginEvent(domEventname,reactName){



  // 注册事件 
   registerTwoPhaseEvent(reactName, [domEventname])
   
}

export function registerSimpleEvents(){

  for (let index = 0; index < simpleEventPluginEvents.length; index++) {
    const eventName = simpleEventPluginEvents[index];
    const domEventName = eventName.toLowerCase();
    

    const capitalizeEvent = eventName[0].toLowerCase() + eventName.slice(1);

   registerSimpleEventPluginEvent(domEventName,`on${capitalizeEvent}`)
  }


}