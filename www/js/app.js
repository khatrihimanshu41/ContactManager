var Header = React.createClass({
    render: function () {
        return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>

            </header>
        );
    }
});

var SearchBar = React.createClass({
    searchHandler: function() {
        this.props.searchHandler(this.refs.searchKey.getDOMNode().value);
    },
    componentDidMount: function() {
        this.searchHandler('');
    },
    render: function () {
        return (
            <div className="bar bar-standard bar-header-secondary">
                <input type="search" ref="searchKey"  onChange={this.searchHandler} value={this.props.searchKey}/>
                <div><a href={"#editemployee/"} className="media-object small pull-right">Add</a></div>
            </div>


        );
    }
});

var EmployeeListItem = React.createClass({
    render: function () {
        return (
            <li className="table-view-cell media">
                <a href={"#employees/" + this.props.employee.id}>
                    <img className="media-object small pull-left" src={"pics/user.png" }/>
                    {this.props.employee.firstName} {this.props.employee.lastName}
                    <p>{this.props.employee.title}</p>
                </a>
                <a href={"#editemployee/" + this.props.employee.id} className="media-object small pull-right">edit</a>
            </li>
        );
    }
});

var EmployeeList = React.createClass({
    render: function () {
        var items = this.props.employees.map(function (employee) {
            return (
                <EmployeeListItem key={employee.id} employee={employee} />
            );
        });
        return (
            <ul  className="table-view">
                {items}
            </ul>
        );
    }
});

var HomePage = React.createClass({
    render: function () {
        return (
            <div className={"page " + this.props.position}>
                <Header text="Contact Manager" back="false"/>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>
                <div className="content">
                    <EmployeeList employees={this.props.employees}/>
                </div>
            </div>
        );
    }
});

var EmployeePage = React.createClass({
    getInitialState: function() {
        return {employee: {}};
    },
    deleteEmployee: function() {
        if(confirm('Are you sure to delete?'))
        {
        this.props.service.deleteEmployeeDetails(this.props.employeeId).done(function(result) {
            alert(result);
            window.location.hash="#";
        }.bind(this));
        }
    },
    componentDidMount: function() {
        this.props.service.findById(this.props.employeeId).done(function(result) {
            this.setState({employee: result});
        }.bind(this));
    },
    render: function () {
        return (
            <div className={"page " + this.props.position}>
                <Header text="Employee" back="true"/>
                <div className="card">
                    <ul className="table-view">
                        <li className="table-view-cell media">
                            <img className="media-object big pull-left" src={"pics/user.png" }/>
                            <h1>{this.state.employee.firstName} {this.state.employee.lastName}</h1>
                            <p>{this.state.employee.title}</p>
                        </li>
                        <li className="table-view-cell media">
                            <a href={"tel:" + this.state.employee.officePhone} className="push-right">
                                <span className="media-object pull-left icon icon-call"></span>
                                <div className="media-body">
                                Call Office
                                    <p>{this.state.employee.officePhone}</p>
                                </div>
                            </a>
                        </li>
                        <li className="table-view-cell media">
                            <a href={"tel:" + this.state.employee.mobilePhone} className="push-right">
                                <span className="media-object pull-left icon icon-call"></span>
                                <div className="media-body">
                                Call Mobile
                                    <p>{this.state.employee.mobilePhone}</p>
                                </div>
                            </a>
                        </li>
                        <li className="table-view-cell media">
                            <a href={"sms:" + this.state.employee.mobilePhone} className="push-right">
                                <span className="media-object pull-left icon icon-sms"></span>
                                <div className="media-body">
                                SMS
                                    <p>{this.state.employee.mobilePhone}</p>
                                </div>
                            </a>
                        </li>
                        <li className="table-view-cell media">
                            <a href={"mailto:" + this.state.employee.email} className="push-right">
                                <span className="media-object pull-left icon icon-email"></span>
                                <div className="media-body">
                                Email
                                    <p>{this.state.employee.email}</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <button onClick={this.deleteEmployee}>Delete</button>
                </div>
            </div>
        );
    }
});

var EditEmployeePage = React.createClass({
    getInitialState: function() {
        this.updateState = this.updateState.bind(this);
        return {employee: {}};
    },
    updateState:function(e) {
        var key=e.target.getAttribute("data");
        this.state.employee[key]=e.target.value;
        this.setState({employee: this.state.employee});
    },
    componentDidMount: function() {
       
        if(this.props.employeeId=="")return;
        this.props.service.findById(this.props.employeeId).done(function(result) {
            this.setState({employee: result});
        }.bind(this));
    },
    handleSubmit:function(event) {
       
        if(this.state.employee.id) {
            this.props.service.updateEmployeeDetails(this.state.employee).done(function (result) {
                alert(result);
                window.location.hash="#";
            }.bind(this));
        }
        else
        {
            this.props.service.addEmployeeDetails(this.state.employee).done(function (result) {
                alert(result);
                window.location.hash="#";
            }.bind(this));
        }
        event.preventDefault();
    },
    render: function () {
        return (
            <div className={"page " + this.props.position}>
                <Header text="Edit Employee" back="true"/>
                <div className="content">
                <form onSubmit={this.handleSubmit}>
                    <ul className="table-view">
                        <li className="table-view-cell media">
                            <input type="hidden" ref="id"  value={this.props.employeeId} />
                        </li>
                        <li className="table-view-cell media">
                            <label>First Name:</label>
                            <input type="text" data="firstName"  value={this.state.employee.firstName} onChange = {this.updateState}/>
                        </li>
                        <li className="table-view-cell media">
                            <label>Last Name:</label>
                            <input type="text" data="lastName"  value={this.state.employee.lastName} onChange = {this.updateState}/>
                        </li>
                        <li className="table-view-cell media">
                            <label>Reports:</label>
                            <input type="text" data="reports"  value={this.state.employee.reports} onChange = {this.updateState}/>
                        </li>
                        <li className="table-view-cell media">
                            <label>Title:</label>
                            <input type="text" data="title"  value={this.state.employee.title} onChange = {this.updateState}/>
                        </li>
                        <li className="table-view-cell media">
                            <label>Department:</label>
                            <input type="text" data="department"  value={this.state.employee.department} onChange = {this.updateState}/>
                        </li>
                        <li className="table-view-cell media">
                            <label>Mobile Phone:</label>
                            <input type="text" data="mobilePhone"  value={this.state.employee.mobilePhone} onChange = {this.updateState}/>
                        </li>

                        <li className="table-view-cell media">
                            <label>Office Phone:</label>
                            <input type="text" data="officePhone"  value={this.state.employee.officePhone} onChange = {this.updateState}/>
                        </li>
                        <li className="table-view-cell media">
                            <label>Email:</label>
                            <input type="text" data="email"  value={this.state.employee.email} onChange = {this.updateState}/>
                        </li>
                        <li className="table-view-cell media">
                            <label>City:</label>
                            <input type="text" data="city"  value={this.state.employee.city} onChange = {this.updateState}/>
                        </li>
                        <li className="table-view-cell media">
                            <label>TwitterId:</label>
                            <input type="text" data="twitterId"  value={this.state.employee.twitterId} onChange = {this.updateState}/>
                        </li>
                        <li className="table-view-cell media">
                            <label>Website:</label>
                            <input type="text" data="blog"  value={this.state.employee.blog} onChange = {this.updateState}/>
                        </li>
                    </ul>

                    <button type="submit">Save</button>

                </form>
                    </div>
                </div>


        );
    }
});

var App = React.createClass({
    mixins: [PageSlider],
    getInitialState: function() {
        return {
            searchKey: '',
            employees: []
        }
    },
    searchHandler: function(searchKey) {
       
        employeeService.findByName(searchKey).done(function(employees) {
            this.setState({
                searchKey:searchKey,
                employees: employees,
                pages: [<HomePage key="list" searchHandler={this.searchHandler} searchKey={searchKey} employees={employees}/>]});
        }.bind(this));
    },
    componentDidMount: function() {
        router.addRoute('', function() {
            this.slidePage(<HomePage key="list" searchHandler={this.searchHandler} searchKey={this.state.searchKey} employees={this.state.employees}/>);
        }.bind(this));
        router.addRoute('employees/:id', function(id) {
            this.slidePage(<EmployeePage key="details" employeeId={id} service={employeeService}/>);
        }.bind(this));
        router.addRoute('editemployee/:id', function(id) {
            this.slidePage(<EditEmployeePage key="edit" employeeId={id} service={employeeService}/>);
        }.bind(this));
        router.start();
    }
});

React.render(<App/>, document.body);