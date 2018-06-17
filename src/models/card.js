import jsonApi from '../api'

export const entity = 'card'

export function setModel () {
  jsonApi.define(entity, {
    createdAt: null,
    updatedAt: null,
    category: '',
    name: '',
    givenName: '',
    additionalName: '',
    familyName: '',
    nickname: '',
    email: '',
    logo: '',
    photo: '',
    url: '',
    extendedAddress: '',
    streetAddress: '',
    locality: '',
    region: '',
    postalCode: '',
    countryCode: '',
    geoLatitude: '',
    geoLongitude: '',
    telephone: '',
    notes: '',
    birthday: '',
    publicKey: '',
    organization: '',
    role: '',
    iban: '',
    bic: '',
    currency: ''
  })
}
