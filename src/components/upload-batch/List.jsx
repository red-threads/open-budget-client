import Debug from 'debug'
import batchTypes from '../../models/batchTypes.map'

const debug = Debug('ob:c:comp:updload-batch-list')
export default function UploadBatchList(props) {
  debug(props)
  if (props.items.length === 0) {
    return null
  }
  const mapper = batchTypes[props.type].mapTo[props.entity]
  debug(mapper)
  if (typeof mapper !== 'function') {
    return null
  }
  return (
    <ul>
      {
        props.items.map(item => {
          return (
            <div>{JSON.stringify(mapper({ entity: props.entity, item }))}</div>
          )
        })
      }
    </ul>
  )
}
