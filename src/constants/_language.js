function en (){
    return false
}

function ru (){
    return true
}

export function whichLang () {
   return localStorage.getItem('#l34') === "en" ? en() : ru()
}

