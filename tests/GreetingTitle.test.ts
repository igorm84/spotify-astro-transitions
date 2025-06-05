import { render } from '@testing-library/svelte';
import GreetingTitle from '../src/components/GreetingTitle.svelte';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

describe('GreetingTitle', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows Good morning during morning hours', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2021-01-01T08:00:00Z'));
    const { getByText } = render(GreetingTitle);
    expect(getByText('Good morning')).toBeInTheDocument();
  });

  it('shows Good afternoon during afternoon hours', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2021-01-01T13:00:00Z'));
    const { getByText } = render(GreetingTitle);
    expect(getByText('Good afternoon')).toBeInTheDocument();
  });

  it('shows Good night during night hours', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2021-01-01T22:00:00Z'));
    const { getByText } = render(GreetingTitle);
    expect(getByText('Good night')).toBeInTheDocument();
  });
});
