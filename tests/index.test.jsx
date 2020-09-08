
import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { setupServer } from 'msw/node';

import Search from '../src/Search';

// declare which API requests to mock
const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/api/search', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json({ }))
  }),
);
// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('App', () => {

  // it('renders without crashing', () => {
  //   render(<Index />);
  //   expect(
  //     screen.getByAltText('Splash'),
  //   ).toBeInTheDocument();
  // });

  it('submits search form when valid search terms entered', async () => {
    const handleSubmit = jest.fn();

    server.use(
      rest.get('/api/search', (req, res, ctx) => {
        console.log("keywords:"+req.query.keywords);
        return res(ctx.json({
          pathname: '/coops',
          query: {
            keywords: req.query.keywords,
          },
        }));
      }),
    );

    render(<Search handleSubmit={handleSubmit} />);

    const searchInput = screen.getByLabelText(/Search words/i);
    const searchBtn = screen.getByRole('button', { name: /Search/i });

    userEvent.type(
      searchInput,
      'farmer',
    )
    userEvent.click(searchBtn);

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({
      pathname: '/coops',
      query: {
        keywords: 'farmer',
      },
    }));
  });
});
