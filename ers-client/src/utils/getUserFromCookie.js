function getUserFromCookie() {
    const user = { id: '', roleId: '', username: '' }
    let cookieCutter = document.cookie.split( "; " ).map( e => e.split( '=' ) ).map( el => el[ 1 ] )
    console.log( cookieCutter )
    for ( let i = 0; i < cookieCutter.length; i++ ) {
        user[ Object.keys( user )[ i ] ] = cookieCutter[ i ]
    }

    return user;
}

export default getUserFromCookie;