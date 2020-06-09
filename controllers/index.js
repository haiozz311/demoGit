// console.log(axios);
// tạo ra 1 đối tượng chưa 3 thuộc tính cần thiết để giao tiếp với backend
var objectAjax = {
    url: 'DanhSachNguoiDung.json', // đường dẫn đến file chứa dữ liệu hoặc api backend
    method: 'GET'//giao thức backend cung ứng với url
    // responseType: 'JSON'
    // định dạng dữ liệu trả về từ server
}

// dùng thư viện để đọc file hoặc api từ backend
var promise = axios(objectAjax);
console.log(promise);

promise.then(function (res) {
    var noiDungTable = '';
    for (let i = 0; i < res.data.length; i++) {
        //sau mỗi lần lấy ra 1 đối tượng người dùng
        var nguoiDung = res.data[i];
        //từ đối tương người dùng sẽ tạo ra thẻ re tương ứng
        noiDungTable += `
       <tr>
            <td>${nguoiDung.TaiKhoan}</td>
            <td>${nguoiDung.MatKhau}</td>
            <td>${nguoiDung.HoTen}</td>
            <td>${nguoiDung.Email}</td>
            <td>${nguoiDung.SoDT}</td>
       </tr>
        `
    }
    //dom đến table tbody chèn các tr vừa tạo vào
    document.querySelector('#tblNguoiDung').innerHTML = noiDungTable;
    console.log(res);

    // hàm sử lý khi request thành công

}).catch(function (error) {
    // hàm sử lý khi request thất bại
    console.log(error.response.data);

})


