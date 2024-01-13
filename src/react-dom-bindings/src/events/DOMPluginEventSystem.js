import { allNativeEvents } from "./EventRegistry"



import * as SimpleEventPlugin from './plugins/SimpleEventPlugin'
SimpleEventPlugin.registerEvents()
export function listenToAllSupportedEvents() {
	

  allNativeEvents.forEach((domEventName)=>{

    console.log('domEventName',domEventName)
  })
}