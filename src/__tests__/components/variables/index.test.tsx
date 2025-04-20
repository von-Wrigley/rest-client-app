import { render, screen } from '@testing-library/react'; 
import { useTranslations } from 'next-intl';
import VariablesComponent from '@/app/components/Variables/Variable';
import Variables from '@/components/variables';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('@/app/components/Variables/Variable', () => 
  jest.fn(() => <div data-testid="variables-component" />)
);

describe('Variables Page Component', () => {
  const mockT = jest.fn((key) => key);
  
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue(mockT);
    mockT.mockClear();
  });

  it('should render without crashing', () => {
    render(<Variables />);
    expect(screen.getByTestId('variables-component')).toBeInTheDocument();
  });

  it('should apply the correct header class', () => {
    render(<Variables />);
    const header = screen.getByRole('heading', { level: 1 });
    expect(header).toHaveClass('header');
  });

  it('should render the VariablesComponent', () => {
    render(<Variables />);
    expect(VariablesComponent).toHaveBeenCalled();
    expect(screen.getByTestId('variables-component')).toBeInTheDocument();
  });

  it('should match the expected structure', () => {
    const { container } = render(<Variables />);
    expect(container.firstChild).toMatchSnapshot();
  });
});