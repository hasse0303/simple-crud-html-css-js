var employeeList = [];
function onFormSubmit() {
    if(idCtr.value) {
        update(idCtr.value);
    } else {
        save();
    }
    addEmployeeToList();
    addEmployeeToStorage();
    search(searchName.value)
    clearForm();
}
function save() {
    var id = Math.random().toString(16).slice(2);
    const employee = {
        id:id,
        name:nameCtr.value,
        gender:genderCtr.value,
        dob:dobCtr.value,
        email:emailCtr.value,
        position:positionCtr.value
    }
    employeeList.push(employee);
}
function update(id) {
    getEmployeeFormStorage();
    const emp = employeeList.find(emp => emp.id ===id);
    emp.name = nameCtr.value;
    emp.gender = genderCtr.value;
    emp.dob = dobCtr.value;
    emp.email = emailCtr.value;
    emp.position = positionCtr.value;
}
function addEmployeeToList() {
  const tbody = document.getElementById("tbodyCtr");
  let row = "";
  if (!employeeList) {
    employeeList = [];
    return;
  }
  employeeList.forEach((employee, index) => {
    row += `<tr>
            <td>${index + 1}</td>
            <td>${employee.name}</td>
            <td>${employee.gender}</td>
            <td>${employee.dob}</td>
            <td>${employee.email}</td>
            <td>${employee.position}</td>
            <td style="text-align: center">
                <a onClick="onEdit('${employee.id}')" title="Edit"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                <a style="color: red" onClick="onDelete('${employee.id}')" title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></a>
            </td>
         </tr>
        `;
  });
  tbody.innerHTML = row;
}
function addEmployeeToStorage() {
  localStorage.setItem("employees", JSON.stringify(employeeList));
}
function getEmployee() {
  getEmployeeFormStorage();
  addEmployeeToList();
}
function getEmployeeFormStorage() {
    const employees = localStorage.getItem("employees");
    employeeList = JSON.parse(employees);
}
function clearForm() {
    onFormChange();
}
function onEdit(id) {
    const emp = employeeList.find(emp => emp.id === id);
    onFormChange(emp);
}
function onDelete(id) {
    const isConfirm = confirm('Do you want to delete this employee?');
    if(isConfirm){
        employeeList = employeeList.filter(emp => emp.id !== id);
        addEmployeeToList();
        addEmployeeToStorage();
    }
}
function onFormChange(obj = {}){
    idCtr.value = obj.id || '',
    nameCtr.value = obj.name || '',
    genderCtr.value = obj.gender || '',
    dobCtr.value = obj.dob || '',
    emailCtr.value = obj.email || '',
    positionCtr.value = obj.position || '';
}
function search(value) {
    getEmployeeFormStorage();
    if(!value) {
        getEmployee();
        return;
    }
    employeeList = employeeList.filter(emp => emp.name.toLowerCase().includes(searchName.value.toLowerCase()));
    addEmployeeToList();
}
function clearSearch() {
    searchName.value = '';
    search(searchName);
}