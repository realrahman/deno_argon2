import { hash as hash_params, hash_default,verify as verifyffi,type Algorithm,type Params } from "./bindings/bindings.ts";
export { type Algorithm,type Params } from "./bindings/bindings.ts"
/**
 * 
 * @param password -password in plaintext
 * @param parameters -optional hashing parameters, uses defaults from rust argon2 crate
 * most properties of params are not optional.
 * @param algorithm -type of argon2 algorithm, uses Argon2id by default
 * @returns return password-hash of format $argon2{X}$v={V}$m={M},t={T},p={P}${salt}${digest}
 */
export function hash(password: string, parameters?: Params, algorithm: Algorithm = "Argon2id"):Promise<string> {
    if (typeof parameters =='undefined') {
        return hash_default(password);
    } else {
        return hash_params(password, algorithm, parameters);
    }
}

/**
 * 
 * @param password -password in plaintext
 * @param passwordHash -password-hash of format $argon2{X}$v={V}$m={M},t={T},p={P}${salt}${digest}
 * @returns -returns 1 if password matches hash else return 0
 */
export async function verify(password: string, passwordHash: string): Promise<boolean> {
    const result= verifyffi(password, passwordHash);
    
    switch(result){
        case 1:
            return true;
        case 0:
            return false;
        default:
            throw new TypeError('unexpected integer value,result should be either 1 or 0');
    }
}
