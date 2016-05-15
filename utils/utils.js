/**
 * Created by antoremin on 5/15/16.
 */
/**
 * Created by antoremin on 5/15/16.
 */
module.exports = function guidGenerator() {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
