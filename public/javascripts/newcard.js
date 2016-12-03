/**
 * Created by antoremin on 11/9/16.
 */

link = function() {
    $(document).ready(function(){
        $('ul.tabs').tabs('select_tab', 'link');
    });

}
$(document).ready(function(){
    $('ul.tabs').tabs('onShow', 'link');
});