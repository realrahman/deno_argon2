// Auto-generated with deno_bindgen
import { CachePolicy, prepare } from "https://deno.land/x/plug@0.5.2/plug.ts"

function encode(v: string | Uint8Array): Uint8Array {
  if (typeof v !== "string") return v
  return new TextEncoder().encode(v)
}

function decode(v: Uint8Array): string {
  return new TextDecoder().decode(v)
}

function readPointer(v: any): Uint8Array {
  const ptr = new Deno.UnsafePointerView(v as bigint)
  const lengthBe = new Uint8Array(4)
  const view = new DataView(lengthBe.buffer)
  ptr.copyInto(lengthBe, 0)
  const buf = new Uint8Array(view.getUint32(0))
  ptr.copyInto(buf, 4)
  return buf
}

const url = new URL("../target/release", import.meta.url)
let uri = url.toString()
if (!uri.endsWith("/")) uri += "/"

let darwin: string | { aarch64: string; x86_64: string } = uri
  + "libdeno_argon2.dylib"

if (url.protocol !== "file:") {
  // Assume that remote assets follow naming scheme
  // for each macOS artifact.
  darwin = {
    aarch64: uri + "libdeno_argon2_arm64.dylib",
    x86_64: uri + "libdeno_argon2.dylib",
  }
}

const opts = {
  name: "deno_argon2",
  urls: {
    darwin,
    windows: uri + "deno_argon2.dll",
    linux: uri + "libdeno_argon2.so",
  },
  policy: undefined,
}
const _lib = await prepare(opts, {
  hash: {
    parameters: ["buffer", "usize", "buffer", "usize", "buffer", "usize"],
    result: "buffer",
    nonblocking: true,
  },
  hash_default: {
    parameters: ["buffer", "usize"],
    result: "buffer",
    nonblocking: true,
  },
  verify: {
    parameters: ["buffer", "usize", "buffer", "usize"],
    result: "u8",
    nonblocking: true,
  },
})
export type Params = {
  /**
   * Memory size, expressed in kilobytes, between 1 and (2^32)-1.
   *
   * Value is an integer in decimal (1 to 10 digits).
   */
  memoryCost: number
  /**
   * Number of iterations, between 1 and (2^32)-1.
   *
   * Value is an integer in decimal (1 to 10 digits).
   */
  timeCost: number
  /**
   * Degree of parallelism, between 1 and 255.
   *
   * Value is an integer in decimal (1 to 3 digits).
   */
  parallelismCost: number
  /**
   * Size of the output (in bytes).
   */
  outputLength: number | undefined | null
}
export type Algorithm = /**
   * Optimizes against GPU cracking attacks but vulnerable to side-channels.
   *
   * Accesses the memory array in a password dependent order, reducing the
   * possibility of time–memory tradeoff (TMTO) attacks.
   */
  | "Argon2d"
  | /**
   * Optimized to resist side-channel attacks.
   *
   * Accesses the memory array in a password independent order, increasing the
   * possibility of time-memory tradeoff (TMTO) attacks.
   */
  "Argon2i"
  | /**
   * Hybrid that mixes Argon2i and Argon2d passes (*default*).
   *
   * Uses the Argon2i approach for the first half pass over memory and
   * Argon2d approach for subsequent passes. This effectively places it in
   * the "middle" between the other two: it doesn't provide as good
   * TMTO/GPU cracking resistance as Argon2d, nor as good of side-channel
   * resistance as Argon2i, but overall provides the most well-rounded
   * approach to both classes of attacks.
   */
  "Argon2id"
export function hash(a0: string, a1: Algorithm, a2: Params) {
  const a0_buf = encode(a0)
  const a1_buf = encode(JSON.stringify(a1))
  const a2_buf = encode(JSON.stringify(a2))
  let rawResult = _lib.symbols.hash(
    a0_buf,
    a0_buf.byteLength,
    a1_buf,
    a1_buf.byteLength,
    a2_buf,
    a2_buf.byteLength,
  )
  const result = rawResult.then(readPointer)
  return result.then(decode)
}
export function hash_default(a0: string) {
  const a0_buf = encode(a0)
  let rawResult = _lib.symbols.hash_default(a0_buf, a0_buf.byteLength)
  const result = rawResult.then(readPointer)
  return result.then(decode)
}
export function verify(a0: string, a1: string) {
  const a0_buf = encode(a0)
  const a1_buf = encode(a1)
  let rawResult = _lib.symbols.verify(
    a0_buf,
    a0_buf.byteLength,
    a1_buf,
    a1_buf.byteLength,
  )
  const result = rawResult
  return result
}
