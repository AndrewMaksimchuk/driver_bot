import { assertEquals } from "https://deno.land/std@0.141.0/testing/asserts.ts";
import setEntriesToObject from "../setEntriesToObject.ts";

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
