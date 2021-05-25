function formatDate( date ) {
    const now = new Date( date );
    return `${ now.getMonth() + 1 }/${ now.getDate() }/${ now.getFullYear().toString().slice( 2 ) }`
}

export default formatDate