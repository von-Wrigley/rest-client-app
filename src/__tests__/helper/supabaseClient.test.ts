describe("Supabase Client Initialization", () => {
  const mockUrl = "https://mock.supabase.co";
  const mockKey = "mock-anon-key";
  const originalEnv = process.env;

  let createClient: jest.Mock;

  beforeEach(() => {
    jest.resetModules();

    process.env = { ...originalEnv };
    process.env.NEXT_PUBLIC_SUPABASE_URL = mockUrl;
    process.env.NEXT_PUBLIC_SUPABASE_ANONKEY = mockKey;

    jest.doMock("@supabase/supabase-js", () => {
      createClient = jest.fn(() => ({}));
      return { createClient };
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env = originalEnv;
  });

  it("should create client with correct credentials when env vars are set", () => {
    const { supabase } = require("../../helper/supabaseClient");

    expect(createClient).toHaveBeenCalledTimes(1);
    expect(createClient).toHaveBeenCalledWith(mockUrl, mockKey);
    expect(supabase).toBeDefined();
  });

  it("should throw error when SUPABASE_URL is missing", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "";
    process.env.NEXT_PUBLIC_SUPABASE_ANONKEY = mockKey;

    expect(() => {
      require("../../helper/supabaseClient");
    }).toThrow("Missing Supabase environment variables");
  });

  it("should throw error when SUPABASE_ANONKEY is missing", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = mockUrl;
    process.env.NEXT_PUBLIC_SUPABASE_ANONKEY = "";

    expect(() => {
      require("../../helper/supabaseClient");
    }).toThrow("Missing Supabase environment variables");
  });

  it("should throw error when both env vars are missing", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "";
    process.env.NEXT_PUBLIC_SUPABASE_ANONKEY = "";

    expect(() => {
      require("../../helper/supabaseClient");
    }).toThrow("Missing Supabase environment variables");
  });

  it("should create client only once when module is imported multiple times", () => {
    const client1 = require("../../helper/supabaseClient").supabase;
    const client2 = require("../../helper/supabaseClient").supabase;

    expect(createClient).toHaveBeenCalledTimes(1);
    expect(client1).toBe(client2);
  });
});
