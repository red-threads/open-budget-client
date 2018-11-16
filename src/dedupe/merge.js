
export default function merge (data) {
  const { configuration, parsedItem, serverItem } = data
  if (configuration.mergeOperation === 'merge') {
    return {
      ...data,
      mergedItem: {
        ...(serverItem || {}),
        ...parsedItem
      }
    }
  }
  if (configuration.mergeOperation === 'pick-client') {
    return {
      ...data,
      mergedItem: parsedItem
    }
  }
  if (configuration.mergeOperation === 'prefer-server') {
    return {
      ...data,
      mergedItem: serverItem || parsedItem
    }
  }
  throw new Error('No mergeOperation option has been defined')
}
