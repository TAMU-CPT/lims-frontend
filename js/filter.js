export default function(base) {
    base.filter('role_icon', function() {
        return function(input) {
            switch(input){
                case 0: // view
                    return "visibility";
                case 1: // edit
                    return "edit";
                case 2: // admin
                    return "person";
            }
        };
    });
}
