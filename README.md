# deno_argon2

use [argon2](https://docs.rs/argon2/latest/argon2/) crate(rust) in deno-runtime.  

### Example usage

create a typescript file app.ts.
```ts
import { hash, verify } from "https://deno.land/x/rust_argon2@v1.0.1/argon2.ts";
import { assertEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";

const hash=await hash("mypassword");
const result=await verify("mypassword",hash);

assertEquals(1, result);
```

run app with appropriate flags.
```sh
deno run --allow-read -allow-env --allow-ffi --unstable  app.ts
```
