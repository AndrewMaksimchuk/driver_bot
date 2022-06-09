import { assertEquals } from "https://deno.land/std@0.141.0/testing/asserts.ts";
import setKeyValueToString from "../setKeyValueToString.ts";

Deno.test("setKeyValueToString", () => {
  assertEquals(setKeyValueToString({}), {});

  const obj = {
    commands: [
      { command: "unsubscribe", description: "some text description" },
    ],
    scope: { type: "default" },
    language_code: "uk",
  };
  const objStringify = {
    commands:
      '[{"command":"unsubscribe","description":"some text description"}]',
    scope: '{"type":"default"}',
    language_code: "uk",
  };

  assertEquals(setKeyValueToString(obj), objStringify);
});
