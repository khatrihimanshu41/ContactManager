employeeService = (function () {
    var baseURL = "";
       return {
        findById: function(id) {
            return $.ajax(baseURL + "/employees/" + id);
        },
        findByName: function(searchKey) {
            return $.ajax({url: baseURL + "/employees", data: {name: searchKey}});
        },
        addEmployeeDetails: function(data) {
            return $.ajax({url: baseURL + "/employees",type: 'POST', data: data});
        },
        updateEmployeeDetails: function(data) {
            return $.ajax({url: baseURL + "/employees",type: 'PUT', data: data});
        },
        deleteEmployeeDetails: function(id) {
            return $.ajax({url: baseURL + "/employees/"+id,type: 'DELETE'});
        }
    };

}());