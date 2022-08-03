var User = /** @class */ (function () {
    function User() {
        this._password = 'user';
    }
    User.prototype.checkGoogleLogin = function (token) {
        // return "this will not work";
        return (token === this._googleToken);
    };
    User.prototype.setGoogleToken = function (token) {
        this._googleToken = token;
    };
    User.prototype.getFacebookLogin = function (token) {
        return (token === this._facebookToken);
    };
    User.prototype.setFacebookToken = function (token) {
        this._facebookToken = token;
    };
    User.prototype.checkPassword = function (password) {
        return (password === this._password);
    };
    User.prototype.resetPassword = function () {
        this._password = prompt('What is your new password?');
    };
    return User;
}());
var Admin = /** @class */ (function () {
    function Admin() {
        this._password = 'admin';
    }
    Admin.prototype.checkPassword = function (password) {
        return (password === this._password);
    };
    Admin.prototype.resetPassword = function () {
        this._password = prompt('What is your new password?');
    };
    return Admin;
}());
var GoogleBot = /** @class */ (function () {
    function GoogleBot() {
        this.googleToken = '';
    }
    GoogleBot.prototype.checkGoogleLogin = function (token) {
        return (token === this.googleToken);
    };
    GoogleBot.prototype.setGoogleToken = function (token) {
        this.googleToken = token;
    };
    return GoogleBot;
}());
var passwordElement = document.querySelector('#password');
var typePasswordElement = document.querySelector('#typePassword');
var typeGoogleElement = document.querySelector('#typeGoogle');
var typeFacebookElement = document.querySelector('#typeFacebook');
var loginAsAdminElement = document.querySelector('#loginAsAdmin');
var resetPasswordElement = document.querySelector('#resetPassword');
document.querySelector('#login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var user;
    var auth = false;
    // debugger;
    switch (true) {
        case (typePasswordElement.checked && loginAsAdminElement.checked):
            user = new Admin();
            auth = user.checkPassword(passwordElement.value);
            break;
        case (loginAsAdminElement.checked && !typePasswordElement.checked):
            alert('You no enter');
            break;
        case (!loginAsAdminElement.checked || passwordElement.value === 'user'):
            user = new User();
            switch (true) {
                case typePasswordElement.checked:
                    auth = user.checkPassword(passwordElement.value);
                    break;
            }
            // debugger;
            break;
    }
    if (auth) {
        alert('login success');
    }
    else {
        alert('login failed');
    }
});
resetPasswordElement.addEventListener('click', function (event) {
    event.preventDefault();
    var user = loginAsAdminElement.checked ? admin : guest;
    user.resetPassword();
});
// interface UserAuth {
//     checkPassword(password: string) : boolean;
//     resetPassword();
//     setGoogleToken(token : string);
//     checkGoogleLogin(token : string) : boolean;
//     setFacebookToken(token : string);
//     getFacebookLogin(token : string) : boolean;
// }
// class User implements UserAuth {
//     private _password : string = 'user';
//     private _facebookToken : string;
//     private _googleToken : string;
//
//     //Interesting detail here: while I did not define a return type or param type, any deviation from the interface will give you an error.
//     // Test it out by uncommenting the code below.
//     checkGoogleLogin(token) {
//         // return "this will not work";
//         return (token === this._googleToken);
//     }
//
//     setGoogleToken(token : string) {
//         this._googleToken = token;
//     }
//
//     getFacebookLogin(token) {
//         return (token === this._facebookToken);
//     }
//
//     setFacebookToken(token : string) {
//         this._facebookToken = token;
//     }
//
//     checkPassword(password: string) : boolean {
//         return (password === this._password);
//     }
//
//     resetPassword() {
//         this._password = prompt('What is your new password?');
//     }
// }
//admin cannot use google or facebook token
// class Admin implements UserAuth {
//     private _password : string = 'admin';
//
//     checkGoogleLogin(token: string): boolean {
//         return false;
//     }
//
//     checkPassword(password: string): boolean {
//         return (password === this._password);
//     }
//
//     getFacebookLogin(token: string): boolean {
//         return false;
//     }
//
//     setFacebookToken() {
//         throw new Error('Function not supported for admins');
//     }
//
//     setGoogleToken() {
//         throw new Error('Function not supported for admins');
//     }
//
//     resetPassword() {
//         this._password = prompt('What is your new password?');
//     }
// }
// class GoogleBot implements UserAuth {}
// const passwordElement = <HTMLInputElement>document.querySelector('#password');
// const typePasswordElement = <HTMLInputElement>document.querySelector('#typePassword');
// const typeGoogleElement = <HTMLInputElement>document.querySelector('#typeGoogle');
// const typeFacebookElement = <HTMLInputElement>document.querySelector('#typeFacebook');
// const loginAsAdminElement = <HTMLInputElement>document.querySelector('#loginAsAdmin');
// const resetPasswordElement = <HTMLAnchorElement>document.querySelector('#resetPassword');
// let guest = new User;
// let admin = new Admin;
//
// document.querySelector('#login-form').addEventListener('submit', (event) => {
//     event.preventDefault();
//
//     let user = loginAsAdminElement.checked ? admin : guest;
//
//     if(!loginAsAdminElement.checked) {
//         user.setGoogleToken('secret_token_google');
//         user.setFacebookToken('secret_token_fb');
//     }
//     debugger;
//
//     let auth = false;
//     switch(true) {
//         case typePasswordElement.checked:
//             auth = user.checkPassword(passwordElement.value);
//             break;
//         case typeGoogleElement.checked:
//             auth = user.checkGoogleLogin('secret_token_google');
//             break;
//         case typeFacebookElement.checked:
//             debugger;
//             auth = user.getFacebookLogin('secret_token_fb');
//             break;
//     }
//
//     if(auth) {
//         alert('login success');
//     } else {
//         alert('login failed');
//     }
// });
//
// resetPasswordElement.addEventListener('click', (event) => {
//     event.preventDefault();
//
//     let user = loginAsAdminElement.checked ? admin : guest;
//     user.resetPassword();
// });
