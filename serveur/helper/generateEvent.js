module.exports = {
    generateEventCode:()=> {
        return Math.random().toString(36).substring(7);        
    }
}