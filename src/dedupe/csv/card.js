export function parse (data) {
  const { item } = data
  const iban = item['Account number'] || ''
  const parsedItem = {
    name: item['Payee'],
    iban,
    aliases: [
      item['Payment reference']
    ],
    countryCode: iban.substr(0, 2),
    currency: 'EUR'
  }

  return Object.assign({}, data, { parsedItem })
}

export function getSearchFilter ({ parsedItem }) {
  return `(:or,(iban,\`${parsedItem.iban}\`),(name,\`${parsedItem.name}\`),(aliases,\`${parsedItem.aliases[0]}\`))`
}
