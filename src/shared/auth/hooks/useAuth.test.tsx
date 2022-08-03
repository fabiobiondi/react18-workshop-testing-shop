import { renderHook } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_API } from '../../../core/config';
import { useAuth } from './useAuth';


const server = setupServer(
  // capture "GET /greeting" requests
  rest.get(`${BASE_API}/login`, (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json({ accessToken: '123' }))
  }),
)

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())


test.skip('signIn returns a promise with data if success', async () => {
  const { result } = renderHook(() => useAuth())
  const res = await result.current.signIn({ username: 'f', password: 'b' })
  expect(res.accessToken).toBe('123')
});

test.skip('signin returns error if there are server problem', async () => {
  server.use(
    rest.get(`${BASE_API}/login`, (req, res, ctx) => {
      return res(
        ctx.status(404),
        ctx.json({
          errorMessage: `some errors`,
        }),
      )
    }),
  )
  const { result } = renderHook(() => useAuth())
  let errorMsg;
  try {
    await result.current.signIn({ username: 'f', password: 'b' })
  } catch (e: any) {
    errorMsg = e.response.data.errorMessage
  }
  expect(errorMsg).toBe('some errors')

});
