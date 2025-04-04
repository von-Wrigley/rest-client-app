import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WelcomeSection } from '@/app/pages/home';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

describe('WelcomeSection component', () => {
  it('renders correctly with all elements', () => {
    render(<WelcomeSection />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('title');
    expect(screen.getByText('description')).toBeInTheDocument();
    
    const signInButton = screen.getByRole('link', { name: 'signIn' });
    expect(signInButton).toHaveAttribute('href', '/signin');
    
    const signUpButton = screen.getByRole('link', { name: 'signUp' });
    expect(signUpButton).toHaveAttribute('href', '/signup');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<WelcomeSection />);
    expect(asFragment()).toMatchSnapshot();
  });
});