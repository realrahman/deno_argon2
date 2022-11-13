import { hash, verify } from "./argon2.ts";
import { assertEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";

const _hash=await hash("mypassword");
const result=await verify("mypassword",_hash);

console.log(result);