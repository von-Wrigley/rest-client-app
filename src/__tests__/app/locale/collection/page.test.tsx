import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CollectionsPage from "@/app/[locale]/collections/[[...slug]]/page";

jest.mock("../../../../components/shared/auth-guard", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-guard">{children}</div>
  ),
}));

jest.mock("../../../../components/collections/collections-wrapper", () => ({
  __esModule: true,
  default: ({ method, encodedUrl, encodedBody, searchParams }: any) => (
    <div data-testid="collections-wrapper">
      method: {method ?? "N/A"}, url: {encodedUrl ?? "N/A"}, body:{" "}
      {encodedBody ?? "N/A"}, search: {JSON.stringify(searchParams)}
    </div>
  ),
}));

describe("CollectionsPage (Next.js App Router)", () => {
  it("renders with default slug values", async () => {
    const params = { locale: "en" };
    const searchParams = {};
    const element = await CollectionsPage({ params, searchParams });
    render(<>{element}</>);
    const wrapper = await screen.findByTestId("collections-wrapper");
    expect(wrapper).toHaveTextContent(
      "method: UNDEFINED, url: N/A, body: N/A, search: {}",
    );
  });

  it("renders with default slug values (alternative test)", async () => {
    const params = { locale: "en" };
    const searchParams = {};
    const element = await CollectionsPage({ params, searchParams });
    render(<>{element}</>);
    const wrapper = screen.getByTestId("collections-wrapper");
    expect(wrapper).toHaveTextContent(
      "method: UNDEFINED, url: N/A, body: N/A, search: {}",
    );
  });

  it("renders with slug and searchParams", async () => {
    const params = {
      locale: "en",
      slug: ["POST", "someEncodedUrl", "someEncodedBody"],
    };
    const searchParams = {
      foo: "bar",
    };

    const element = await CollectionsPage({ params, searchParams });

    render(<>{element}</>);

    const wrapper = await screen.findByTestId("collections-wrapper");
    expect(wrapper).toHaveTextContent("method: POST");
    expect(wrapper).toHaveTextContent("url: someEncodedUrl");
    expect(wrapper).toHaveTextContent("body: someEncodedBody");
    expect(wrapper).toHaveTextContent('"foo":"bar"');
  });
});
