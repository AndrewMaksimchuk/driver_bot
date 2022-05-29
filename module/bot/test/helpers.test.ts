import { assertEquals } from "https://deno.land/std@0.141.0/testing/asserts.ts";

import setEntriesToObject from "../helpers/setEntriesToObject.ts";
import setKeyValueToString from "../helpers/setKeyValueToString.ts";

Deno.test("setEntriesToObject", () => {
  assertEquals(setEntriesToObject(["23", 23]), { 23: "23" });
  assertEquals(setEntriesToObject(["boolean", true]), { boolean: "true" });
  assertEquals(setEntriesToObject(["string", "string"]), { string: "string" });
  assertEquals(setEntriesToObject(["object", {}]), { object: "{}" });
  assertEquals(
    setEntriesToObject([
      "object",
      { chat_id: 234234, menu_button: { type: "default" } },
    ]),
    { object: '{"chat_id":234234,"menu_button":{"type":"default"}}' },
  );
});

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
