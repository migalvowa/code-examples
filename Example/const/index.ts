export const DEFAULT_PAPER_ELEVATION = 2

export const DEFAULT_API_PAGE_SIZE = 10

export const LOCAL_ID_PREFIX = 'local-'

// Provided by our backend.
// This value can be used as "id" field placeholder for new entities, and will be ignored by server.
// So that payload data structure can be the same for POST and PUT, no need to omit "id" field.
export const EMPTY_GUID = '00000000-0000-0000-0000-000000000000'

// In our API, `pageSize` parameter is required.
// If we want to fetch everything at once, have to set page size like this.
export const QUERY_PAGE_SIZE_UNLIMITED = 999

// This format should be treated as "how to display day-month-year info".
// NOT as "default display format for any date in system"
export const DATE_FORMAT = 'DD.MM.YYYY'

export const TIME_FORMAT = 'HH:mm:ss'

// Max "validatable" value in JS.
// With greater values, math start to break: like, "1e16 - 1 === 1e16".
export const MAX_NUMERIC_VALUE = 1e15 - 1

export const EMPTY_VALUE_PLACEHOLDER = '–'
