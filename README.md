# Throttle mock: a mock rate limited API

This is a simple test project to explore the deno ecosystem a little bit.

Mission: mock a rate limited API for testing purposes.

## Features

- Limit by number of requests or by timeframe
- Return X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset
- https://developers.support.clio.com/hc/en-us/articles/360023272714-What-Are-The-Rate-Limit-Headers-Returned-After-Each-API-Call
- Retry-At?
- Configurable Bucket?

## Automation

### Updates

- Updates to the docker dependencies are handled by dependabot.
- Updates to our deno dependencies need to be handled through a scheduled Action
  which calls `deno-udd`, for example (TODO).

### Deployment

- DockerHub?
- DigitalOcean?
