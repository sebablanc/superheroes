import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function executeMessage(message, icon){
    MySwal.fire({
        title: <p>{message}</p>,
        footer: 'Copyright 2018',
        icon: 'success',
        didOpen: () => {
            MySwal.clickConfirm()
        }
    }).then(() => {
        return MySwal.fire({
                title: message,
                icon: icon
            })
    })
}

async function confirmMessage(message){
    return MySwal.fire({
        title: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `Borrar`,
        cancelButtonText: `No Borrar`,
    }).then((result) => {
        return result.isConfirmed;
    })
}

export default {executeMessage, confirmMessage};