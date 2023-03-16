let editElem;

// Модальне вікна
var myModalAddEdit = new bootstrap.Modal($('#ModalAddEditStudent'), {
    keyboard: false
})

$(".nav-link-notification").on("click", function(){
    $("#notification-point").css("animation", "glowing 1200ms infinite");
})

let $btnAdd = $('button#btn-add-edit');
$btnAdd.on('click', function(event) {
    if(event.target.innerHTML === "Create")
    {
        AddStudent();
    } 
    else if(event.target.innerHTML === "Save")
    {
        EditStudent();
    }
})

function EditStudent(){
    const dataArr = editElem.parentElement.parentElement.children;
    dataArr[1].innerHTML = $('#stud_group').val();
    dataArr[2].innerHTML = `${$('#stud_f_name').val()} ${$('#stud_l_name').val()}`;
    dataArr[3].innerHTML = $('#stud_gender').val() ==="Male" ? "M" : "F";
    dataArr[4].innerHTML = $('#stud_bday').val();

    $('#stud_group').val('');
    $('#stud_f_name').val('');
    $('#stud_l_name').val('');
    $('#stud_gender').val('');
    $('#stud_bday').val('');

    myModalAddEdit.hide()
}

function AddStudent(){
    let elemsBody = document.querySelector("tbody");
        elemsBody.insertAdjacentHTML("beforeend",
        `
        <tr>
            <th scope="row" style="text-align: center;"><input class="form-check-input" type="checkbox" value="" id="reverseCheck1"></th>
            <td>${$('#stud_group').val()}</td>
            <td>${$('#stud_f_name').val()} ${$('#stud_l_name').val()}</td>
            <td>${$('#stud_gender').val()==="Male" ? "M" : "F"}</td>
            <td>${$('#stud_bday').val()}</td>
            <td><i class="fa-solid fa-circle stud-status"></i></td>
            <td>
                <button type="button" class="btn btn-outline-secondary btn-edit-stud" data-bs-toggle="modal" data-bs-target="#ModalAddEditStudent"><i class="fa-solid fa-pen"></i></button>
                <button type="button" class="btn btn-outline-secondary btn-delete-stud"><i class="fa-solid fa-xmark"></i></button>
            </td>
        </tr>
        `
        )

        $('#stud_group').val('');
        $('#stud_f_name').val('');
        $('#stud_l_name').val('');
        $('#stud_gender').val('');
        $('#stud_bday').val('');

        myModalAddEdit.hide()
}
function RemoveStudent (event) {
    Swal.fire({
        title: 'Do you want to delete user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', '', 'success');
          let activeBtn = event.currentTarget;
          activeBtn.parentElement.parentElement.remove();
        }
      })

}
$(document).on('click', 'button.btn-delete-stud', RemoveStudent);

function ChangeStatus(event){
    let activeBtn = event.currentTarget;
    activeBtn.classList.toggle("online");
    if(activeBtn.classList.contains("online"))
        activeBtn.style.color = "green"; 
    else
        activeBtn.style.color = "#9b9b9b";

}
$(document).on('click', 'i.stud-status', ChangeStatus);

function FillingEditFields (event) {
    
    $("#ModalLabel").text("Edit student");
    $('button#btn-add-edit').text("Save");
    let activeBtn = event.currentTarget;
    editElem = event.currentTarget;
    console.log(activeBtn.parentElement.parentElement)
    const dataArr = activeBtn.parentElement.parentElement.children;

    let $groupOption = $('.select-group option')
    for (const option of  $groupOption) {
        //console.log(option)
        if(option.innerHTML === dataArr[1].innerHTML){
            option.selected = true;
            break;
        }
    }

    const firstLastName = dataArr[2].innerHTML.split(" ");


    $('#stud_f_name').val(firstLastName[0]);
    $('#stud_l_name').val(firstLastName[1]);

    let $genderOption = $('.select-gender option')
 
    //console.log(option)
    if(dataArr[3].innerHTML === "M"){
        $genderOption[0].selected = true;
    }
    else{
        $genderOption[1].selected = true;
    }
    const dateStr = dataArr[4].innerHTML;
/*     const [day, month, year] = dateStr.split('.').map(Number);

    const date = new Date(year, month - 1, day + 1);
    const dateString = date.toISOString().split('T')[0];
     */

    const input = document.querySelector('input[type="date"]');
    input.value = dateStr;

}

$(document).on('click', 'button.btn-edit-stud', FillingEditFields);

function OpenModalToAdd (event) {
    $("#ModalLabel").text("Add student");
    $('button#btn-add-edit').text("Create");
}
$(document).on('click', 'button.btn-add-stud', OpenModalToAdd);