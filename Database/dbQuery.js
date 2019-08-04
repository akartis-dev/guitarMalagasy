import fs from 'react-native-fs'
import Realm from 'realm'

function dbConnect(){
    //tab artiste
    const artiste = {
        name: 'artiste',
        primaryKey: 'IDartiste',
        properties: {
          IDartiste: 'int',
          artiste: 'string'
        }
    }   

    //tab hira
    const hira = {
        name: 'hira',
        properties: {
            IDhira: 'int?',
            titre: 'string?',
            IDartiste: 'int?'
        }
    }

    //dbConfig
    const dbConfig = {
        schema : [artiste, hira],
        path : fs.DocumentDirectoryPath + '/dbGlita.realm',
        schemaVersion : 4
    }

    //initialiasation de notre base
    const db = new Realm(dbConfig)

    //return un objet de notre base de donnee
    return {
        artiste : db.objects('artiste'),
        hira : db.objects('hira'),
    }

}
/**
 * fonction qui retournera un 15 resultat de notre artiste suivant un systeme de pagination
 * prend en parametre nb debut requete, nb de fin
 */
export function queryData(debut, fin){
    return dbQueryAllArtiste().slice(debut, fin)
}

/**
 * fonction qui retourne la nb des artistes pour gerer la pagination
 */
export function artisteCount(){
    return dbConnect().artiste.length
}

/**
 * permet de lister tous les artistes que nous avons sur la base, bien sur avec les mises a jour
 * return un tableau d'object contenant notre id artiste et notre artiste
 */
function dbQueryAllArtiste(){
    const result  = []
    const artisteDb = dbConnect().artiste
    for(let a in artisteDb){
        result.push({id : artisteDb[a].IDartiste, artiste : artisteDb[a].artiste})
    }
    return result.sort((a, b) => a.artiste.localeCompare(b.artiste))
}

/**
 * permet de retourner le nombre de chanson de chaque artiste
 */
export function dbQueryArtisteChant(idArtiste){
    let hira = []
    let db = dbConnect().hira
    
    for(let p in db){
        if(db[p].IDartiste === idArtiste)
        hira.push({idHira : db[p].IDhira, titreHira : db[p].titre})
    }

    return hira.sort((a,b) => a.titreHira.localeCompare(b.titreHira))
}

/**
 * Retourne tous les chansons qu'on a actuellement
 */
export function dbQueryAllSong(){
    let hiraRehetra = []
    let db = dbConnect().hira
    let dbArtiste = dbConnect().artiste

    for(let p in db){
        hiraRehetra.push({
            idHira : db[p].IDhira, 
            titreHira : db[p].titre, 
            artiste: dbArtiste[db[p].IDartiste - 1]
        })
    }
    return hiraRehetra.sort((a,b) => a.titreHira.localeCompare(b.titreHira))
}

/**
 * recupere les info de notre chant
 * @param {id anle hira} id 
 */

export function queryChantDetailWithId(id){ 
    let id1 = id < 80 ? id - 1 : id - 2
    //console.warn(dbConnect().hira[id1])
    return{
        titre :dbConnect().hira[id1].titre,
        artiste : dbConnect().artiste[dbConnect().hira[id1].IDartiste - 1].artiste
    }
}
