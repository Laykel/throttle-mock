import { Context, Request } from "./deps.ts";
import Stats from "./model/stats.ts";

let test = 0;

const getRoot = ({ request, response }: Context) => {
  basicLog(request);

  response.body = {
    TBD: "What should I say?",
  };
};

const getNotRateLimited = ({ request, response }: Context) => {
  basicLog(request);

  response.body = {
    situation: "Success",
  };
};

const getRateLimited = ({ request, response }: Context) => {
  basicLog(request);

  response.status = 429;
  response.body = {
    situation: "Too many requests",
  };
};

const getStats = ({ response }: Context) => {
  response.body = {
    nbrRequests: 3,
  } as Stats;
};

// Reset the counters and stats
const deleteCounters = ({ response }: Context) => {
  test = 0;

  if (test == 0) response.status = 204;
};

// Basic console output for requests
const basicLog = (request: Request) => {
  console.log("---");
  console.log(`Request path: ${request.url}`);
  console.log(`Request method: ${request.method}`);
  console.log(`Request IP: ${request.ip}`);
  console.log(`User-agent: ${request.headers.get("user-agent")}`);
};

export { deleteCounters, getNotRateLimited, getRateLimited, getRoot, getStats };
