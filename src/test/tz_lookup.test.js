const tz_lookup = require('tz-lookup')

test('California Lat/Lng to correct timezone', () => {
  const lat = 34.632093
  const lng = -120.610829

  const expectedTimezone = 'America/Los_Angeles'
  const result = tz_lookup(lat, lng)

  expect(result).toBe(expectedTimezone)
})

test('Denmark Lat/Lng to correct timezone', () => {
  const lat = 55.676098
  const lng = 12.568337

  const expectedTimezone = 'Europe/Copenhagen'
  const result = tz_lookup(lat, lng)

  expect(result).toBe(expectedTimezone)
})
