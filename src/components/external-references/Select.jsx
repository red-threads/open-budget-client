import Debug from 'debug'
import Link from 'next/link'
import React from 'react'

const debug = Debug('ob:c:comp:ext-ref')

export default function ExtRefSelect (props) {
  debug('value')
  debug(props.options)

  return [
    <select>
      <option value=''>None</option>
      {
        props.options.items.map(item => (
          <option
            key={item.id}
            selected={props.value && item.id === props.value.id}
            value={item.id}
          >{item.name || item.organization}</option>
        ))
      }
    </select>,
    <Link href={`/${props.options.innerSchema.meta.name}/new`}>
      <a>Add new</a>
    </Link>
  ]
}
