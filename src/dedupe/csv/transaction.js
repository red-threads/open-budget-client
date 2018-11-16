export function parse (data) {
  const { item, dependencies } = data
  const gross = Number(item['Amount (EUR)']) * 100
  const isIncoming = gross > 0
  const parsedItem = Object.assign({
    createdAt: item['Date'],
    gross: Math.abs(gross),
    status: 'processed',
    source: 'csv',
    externalReference: item['Payment reference']
  }, {
    [isIncoming ? 'from' : 'to']: dependencies[0] ? dependencies[0].payload.mergedItem : {}
  })

  return Object.assign({}, data, { parsedItem })
}

export function getSearchFilter ({ parsedItem }) {
  return `(:and,(gross,\`${parsedItem.gross}\`),(createdAt,\`${parsedItem.createdAt}\`),(externalReference,\`${parsedItem.externalReference}\`))`
}
