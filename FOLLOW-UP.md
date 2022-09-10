# Implementation:

### Q) What libraries did you add to the frontend? What are they used for?

N/A

### Q) What libraries did you add to the backend? What are they used for?

- Nestjs: out-of-box API, including typescript & other nice-to-have features (code structure, linting, tests, ...)
- Axios: simple HTTP client, with somewhat typescript integration
- Nock: easy HTTP interceptors for tests

### Q) Any other comments we should read before evaluating your solution?

N/A

---

# General:

### Q) If you had more time, what further improvements or new features would you add?

I'd probably implement a background process to fetch & cache binance, coinbase & kraken order book every X seconds
This will help us deliver faster responses on the API

Also, I'd implement a way to retrieve larger order book (if needed) - in order to be able to retrieve best price on a large amount of BTC

Finally, I'd implement a pair-agnostic API: why limit ourselves to BTC/USD? We could easily support any pairs present on Binance, Coinbase and Kraken.

Bonus: create a factory to easily add new providers

Bonus 2: Enable horizontal scaling by creating a separate backend service that refreshes exchanges order book, then store it in a formatted way in a shared database
With this solution, we can add X API services that will efficiently read formatted & fresh order books from the DB, then return best price.

### Q) Which parts are you most proud of? And why?

Code simplicity, yet quite complete thanks to nestjs CLI

### Q) Which parts did you spend the most time with? What did you find most difficult?

I rarely worked with Nestjs, setting everything up took a bit longer than expected.

### Q) How did you find the test overall? Did you have any issues or have difficulties completing? If you have any suggestions on how we can improve the test, we'd love to hear them.

Would be nice to have a scaffold of an API, with incomplete endpoints.
With this base, it'll be easier to ask hard questions to candidates, with tests suites that are included in the scaffold.
