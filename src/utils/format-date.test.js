const { formatDateTimeWithTimeZone } = require('./format-date')

// Test that the local and utc time is identical given a timezone
test('Local and utc is equal given a timezone', () => {
  const localTimestamp = '2020-11-21T09:17:00-08:00'
  const utcTimestamp = '2020-11-21T17:17:00.000Z'

  const expectedLocalTimeStamp = formatDateTimeWithTimeZone(
    localTimestamp,
    'America/Los_Angeles'
  )
  const expectedUTCTimeStamp = formatDateTimeWithTimeZone(
    utcTimestamp,
    'America/Los_Angeles'
  )
  expect(expectedLocalTimeStamp).toBe(expectedUTCTimeStamp)
})
