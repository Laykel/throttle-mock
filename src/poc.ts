// ---- Rate limiting dirty test
const unixTime = (timestamp: number): number => Math.floor(timestamp / 1000);
let totalRequests = 0;
let failedRequests = 0;
let successfulRequests = 0;

const initial = 10;
const resetAfter = 1000;

let remaining = initial;
let reset = Date.now();

const resetRemaining = () => setTimeout(() => remaining = initial, resetAfter);

const resetFn = () => {
  const delta = Date.now() - reset;
  if (delta > resetAfter) {
    reset = Date.now() + resetAfter;
    console.log(`Reset at: ${unixTime(reset)}`);
    resetRemaining();
  }
};

const getLimit = ({ response }: Context) => {
  totalRequests++;

  if (remaining > 0) {
    remaining--;
    successfulRequests++;
    if (failedRequests > 0) {
      console.error(`Failed before reset: ${failedRequests}`);
      failedRequests = 0;
    }

    console.info(`Success: ${unixTime(Date.now())}`);
    response.body = {
      situation: "Success",
    };
  } else {
    resetFn();
    failedRequests++;

    response.status = 429;
    response.body = {
      situation: "Too many requests",
    };
  }

  response.headers.append("X-RateLimit-Limit", `${initial}`);
  response.headers.append("X-RateLimit-Remaining", `${remaining}`);
  response.headers.append("X-RateLimit-Reset", unixTime(reset).toString());
};

const getTotal = ({ response }: Context) => {
  response.body = {
    nbrOfRequests: `${totalRequests}`,
    successRate: `${(successfulRequests / totalRequests) * 100}%`,
  };
};

// Also reset endpoint