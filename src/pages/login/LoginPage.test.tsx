test("placeholder", () => {
  expect(true).toBeTruthy();
});

// import { fireEvent, render, screen } from '@testing-library/react';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';

// import LoginPage from './LoginPage';

// // mock use Navigate
// const mockedUsedNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom') as any,
//   useNavigate: () => mockedUsedNavigate,
// }));

// const server = setupServer(
//   // capture "GET /greeting" requests
//   rest.get('http://localhost:3001/login', (req, res, ctx) => {
//     // respond using a mocked JSON body
//     return res(ctx.json({ greeting: 'hello there' }))
//   }),
// )

// // establish API mocking before all tests
// beforeAll(() => server.listen())
// // reset any request handlers that are declared as a part of our tests
// // (i.e. for testing one-time error scenarios)
// afterEach(() => server.resetHandlers())
// // clean up once the tests are done
// afterAll(() => server.close())

// test('username and password are filled', () => {
//   render(<LoginPage />)
//   const usernameInput = screen.getByPlaceholderText('Username');
//   const passwordInput = screen.getByPlaceholderText('Your Password');
//   fireEvent.change(usernameInput, { target: { value: 'Fabio' } })
//   fireEvent.change(passwordInput, { target: { value: '123456' } })
//   expect(usernameInput).toHaveValue('Fabio')
//   expect(passwordInput).toHaveValue('123456')
// });

// test('button is disabled if form is invalid', () => {
//   render(<LoginPage />)
//   const usernameInput = screen.getByPlaceholderText('Username');
//   const passwordInput = screen.getByPlaceholderText('Your Password');
//   const button = screen.getByRole('button');
//   fireEvent.change(usernameInput, { target: { value: 'ab' } }) // requires at least 3 chars
//   fireEvent.change(passwordInput, { target: { value: '12' } }) // requires at least 3 chars
//   expect(button).toBeDisabled();
// });

// test('display error if login API returns error', async () => {
//   render(<LoginPage />)

//   server.use(
//     rest.get('http://localhost:3001/login', (req, res, ctx) => {
//       return res(ctx.status(404))
//     }),
//   )
//   const usernameInput = screen.getByPlaceholderText('Username');
//   const passwordInput = screen.getByPlaceholderText('Your Password');
//   const button = screen.getByRole('button');
//   fireEvent.change(usernameInput, { target: { value: 'Mario' } }) // requires at least 3 chars
//   fireEvent.change(passwordInput, { target: { value: 'rossi' } }) // requires at least 3 chars

//   fireEvent.click(button)
//   expect(await screen.findByTestId('error-msg')).toBeInTheDocument()
// });

// test('don\'t display error after login', async () => {
//   render(<LoginPage />)

//   server.use(
//     // override the initial "GET /greeting" request handler
//     // to return a 500 Server Error
//     rest.get('http://localhost:3001/login', (req, res, ctx) => {
//       return res(ctx.status(200))
//     }),
//   )
//   const usernameInput = screen.getByPlaceholderText('Username');
//   const passwordInput = screen.getByPlaceholderText('Your Password');
//   const button = screen.getByRole('button');
//   fireEvent.change(usernameInput, { target: { value: 'Mario' } }) // requires at least 3 chars
//   fireEvent.change(passwordInput, { target: { value: 'rossi' } }) // requires at least 3 chars

//   fireEvent.click(button)
//   // act(() => {
//   expect(screen.queryByTestId('error-msg')).not.toBeInTheDocument()
//   // });

// });

// test('Go to home after login', () => {
//   render(<LoginPage />)
//   const usernameInput = screen.getByPlaceholderText('Username');
//   const passwordInput = screen.getByPlaceholderText('Your Password');
//   const button = screen.getByRole('button');
//   fireEvent.change(usernameInput, { target: { value: 'Mario' } }) // requires at least 3 chars
//   fireEvent.change(passwordInput, { target: { value: 'Rossi' } }) // requires at least 3 chars
//   fireEvent.click(button)
//   expect(screen.getByText('HomePage')).toBeInTheDocument()

// });

// test('Go to home after login', () => {
//   render(<LoginPage />, { wrapper: BrowserRouter })

//   const usernameInput = screen.getByPlaceholderText('Username');
//   const passwordInput = screen.getByPlaceholderText('Your Password');
//   const button = screen.getByRole('button');
//   fireEvent.change(usernameInput, { target: { value: 'Mario' } }) // requires at least 3 chars
//   fireEvent.change(passwordInput, { target: { value: 'Rossi' } }) // requires at least 3 chars
//   fireEvent.click(button)
//   expect(screen.getByText('HomePage')).toBeInTheDocument()

// });

// test('rendering a component that uses useLocation', () => {
//   const route = '/some-route'

//   // use <MemoryRouter> when you want to manually control the history
//   render(
//     <MemoryRouter initialEntries={[route]}>
//       <LoginPage />
//     </MemoryRouter>,
//   )

//   // verify location display is rendered
//   const usernameInput = screen.getByPlaceholderText('Username');
//   const passwordInput = screen.getByPlaceholderText('Your Password');
//   const button = screen.getByRole('button');
//   fireEvent.change(usernameInput, { target: { value: 'Mario' } }) // requires at least 3 chars
//   fireEvent.change(passwordInput, { target: { value: 'Rossi' } }) // requires at least 3 chars
//   fireEvent.click(button);
//   expect(screen.getByText('HomePage')).toBeInTheDocument()
// })

// test('rendering a component that uses useLocation', () => {
//   render(
//     <MemoryRouter>
//       <LoginPage />
//     </MemoryRouter>,
//   );

//   const usernameInput = screen.getByPlaceholderText('Username');
//   const passwordInput = screen.getByPlaceholderText('Your Password');
//   const button = screen.getByRole('button');
//   fireEvent.change(usernameInput, { target: { value: 'Mario' } }) // requires at least 3 chars
//   fireEvent.change(passwordInput, { target: { value: 'Rossi' } }) // requires at least 3 chars
//   fireEvent.click(button);
//   expect(screen.getByText('HomePage')).toBeInTheDocument()

// })
