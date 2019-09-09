let fontDefault = 20

export function interpolate(size){
    let font
    a = [19,18,17,16,15]
    b = [25,24,23,22,21]
    
    if(size = 0){
        font = fontDefault
    }else if(size < 0 ){
        font = a[Math.abs(size)]
    }else{
        font = b[Math.abs(size)]
    }
    console.warn(size)
    console.warn(font)
    return font
}