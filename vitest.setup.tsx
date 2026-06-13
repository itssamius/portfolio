import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// next/image -> plain img in tests
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props as any;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...rest} />;
  },
}));

// jsdom has no IntersectionObserver; stub it so framer-motion's useInView doesn't throw
const mockIntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
window.IntersectionObserver = mockIntersectionObserver;

// jsdom has no matchMedia; default to reduced motion in tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query.includes("reduce"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});
