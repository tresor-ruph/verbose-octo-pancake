import { EmailVerification,PasswordVerification,UsernameVerification, } from "../../helper/detailsVerification";

test('email validation should return true',()=> {
    expect(EmailVerification('test@gmail.com')).toEqual(true);
})

test('email validation should return false',()=> {
    expect(EmailVerification('test@gmail.qsdqsq')).toEqual(false);
})

test('password validation should return true',()=> {
    expect(PasswordVerification('passWrd2678')).toEqual(true);
})

test('password validation should return false',()=> {
    expect(PasswordVerification('password')).toEqual(false);
})

test('user validation should return false',()=> {
    expect(UsernameVerification('us')).toEqual(false);
})

test('user validation should return true',()=> {
    expect(UsernameVerification('tresor')).toEqual(true);
})