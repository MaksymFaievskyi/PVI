console.log("File is read")

// Модальне вікна
var myModalAdd = new bootstrap.Modal($('#ModalAddStudent'), {
    keyboard: false
})

$(".nav-link-notification").on("click", function(){
    $("#notification-point").css("animation", "glowing 1200ms infinite");
})

let $btnAdd = $('button#btn-add');
$btnAdd.on('click', function() {

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
                <button type="button" class="btn btn-outline-secondary"><i class="fa-solid fa-pen"></i></button>
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

        myModalAdd.hide()
})

function RemoveStudent (event) {
    Swal.fire({
        title: 'Do you want to save the changes?',
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


 