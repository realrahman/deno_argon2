# deno_argon2

use native [argon2](https://docs.rs/argon2/latest/argon2/) crate(rust) in deno-runtime.
note:- this module uses deno ffi which require --unstable and other flags.   

### Example usage

create a typescript file app.ts.
```ts
import { hash, verify } from "https://deno.land/x/rust_argon2@v2.0.0/argon2.ts";
import { assertEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";

const _hash=await hash("mypassword");
const result=await verify("mypassword",_hash);

console.log(result);
```

run app with appropriate flags.
```sh
deno run --allow-read --allow-env --allow-ffi --unstable  app.ts
```
