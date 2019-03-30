import systemInfo from './systemInfo';
let info = systemInfo()

const record = (eventType,value) => {
    console.log(eventType)
    console.log(value)
}

export default record;