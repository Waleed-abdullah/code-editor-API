const getLang = (language) => {
    let lang = ''

    switch(language){
        case 'c': {
            lang = 'c'
            break
        }
        case 'cljs': {
            lang = 'clojure'
            break
        }
        case 'cpp': {
            lang = 'cpp'
            break
        }        
        case 'cr': {
            lang = 'crystal'
            break
        }        
        case 'cs': {
            lang = 'csharp'
            break
        }        
        case 'd': {
            lang = 'd'
            break
        }        
        case 'ex': {
            lang = 'elixir'
            break
        }        
        case 'go': {
            lang = 'go'
            break
        }        
        case 'hs': {
            lang = 'haskell'
            break
        }        
        case 'java': {
            lang = 'java'
            break
        }        
        case 'jl': {
            lang = 'julia'
            break
        }        
        case 'kt': {
            lang = 'kotlin'
            break
        }        
        case 'lua': {
            lang = 'lua'
            break
        }        
        case 'pl': {
            lang = 'perl'
            break
        }        
        case 'php': {
            lang = 'php'
            break
        }        
        case 'py': {
            lang = 'python'
            break
        }        
        case 'rb': {
            lang = 'ruby'
            break
        }       
        case 'rs': {
            lang = 'rust'
            break
        }        
        case 'ts': {
            lang = 'typescript'
            break
        }   
    }
    return lang
}

export {getLang}
