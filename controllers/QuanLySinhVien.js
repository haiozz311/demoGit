// tạo object chứa thông tin request về api từ backend ( lưu ý:các thong tin phải chính xác)
var objectAjax = {
    url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',
    method: 'GET'
}

//dừng thư viện axios để gữi thông tin yêu cầu từ backend trả về dữ liệu

var promise = axios(objectAjax);
promise.then(function (res) {
    var noidungTable = '';
    for (let index = 0; index < res.data.length; index++) {
        var sinhvien = res.data[index];
        noidungTable += `
            <tr>
                <td>${sinhvien.MaSV}</td>
                <td>${sinhvien.HoTen}</td>
                <td>${sinhvien.Email}</td>
                <td>${sinhvien.SoDT}</td>
                <td>${sinhvien.CMND}</td>
                <td>${sinhvien.DiemToan}</td>
                <td>${sinhvien.DiemLy}</td>
                <td>${sinhvien.DiemHoa}</td>
                <td>${sinhvien.DiemHoa}</td>
                <td>
                    <button class="btn btn-danger" onclick="XoaSinhVien('${sinhvien.MaSV}')">Xóa</button>
                    <button class="btn btn-success" onclick="chinhSua('${sinhvien.MaSV}')">Sữa</button>
                </td>
            </tr>
        `
    }
    document.querySelector('#tblSinhVien').innerHTML = noidungTable;
    console.log(res.data);

}).catch(function (error) {
    console.log(error);
})


//--------------------- chức năng thêm sinh viên ---------------------------------------
document.querySelector('#btnthemSv').onclick = function () {
    var sv = new SinhVien();
    sv.MaSV = document.querySelector('#MaSV').value;
    sv.HoTen = document.querySelector('#TenSv').value;
    sv.Email = document.querySelector('#email').value;
    sv.SoDT = document.querySelector('#sdt').value;
    sv.CMND = document.querySelector('#cmnd').value;
    sv.DiemToan = document.querySelector('#toan').value;
    sv.DiemLy = document.querySelector('#ly').value;
    sv.DiemHoa = document.querySelector('#hoa').value;

    var objectAxios = {
        url: `http://svcy.myclass.vn/api/SinhVien/ThemSinhVien`,
        method: 'POST',
        data: sv
    }
    //dùng axios đưa dữ liệu về backend

    axios(objectAxios).then(function (res) {
        console.log(res.data);
        window.location.reload();
    }).catch(function (error) {
        console.log(error.response.data);
        window.location.reload();
    })
    //phương thức reload để load lại trnag
}

var XoaSinhVien = function (MaSv) {
    var objectAjaxXoaSv = {
        url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${MaSv}`,
        method: 'DELETE'
    }
    axios(objectAjaxXoaSv).then(function (res) {
        console.log(res.data);
        window.location.reload();
    }).catch(function (error) {
        console.log(error.response.data);
        window.location.reload();
    })
}

var chinhSua = function (maSv) {
    var objectChinhSua = {
        url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${maSv}`,// đường dẫn đến back end  
        method: 'GET'
    }
    axios(objectChinhSua).then(function (res) {
        console.log(res);

        console.log(res.data);
        // var sinhvien = res.data;
        document.querySelector('#MaSV').value = res.data.MaSV;
        document.querySelector('#TenSv').value = res.data.HoTen;
        document.querySelector('#email').value = res.data.Email;
        document.querySelector('#sdt').value = res.data.SoDT;
        document.querySelector('#cmnd').value = res.data.CMND;
        document.querySelector('#toan').value = res.data.DiemToan;
        document.querySelector('#ly').value = res.data.DiemLy;
        document.querySelector('#hoa').value = res.data.DiemHoa;

    }).catch(function (err) {
        console.log(err);
    })
}

// chức năng cập nhật dữ liệu
document.querySelector('#btnCapNhatSv').onclick = function () {
    var sv = new SinhVien();
    sv.MaSV = document.querySelector('#MaSV').value;
    sv.HoTen = document.querySelector('#TenSv').value;
    sv.Email = document.querySelector('#email').value;
    sv.SoDT = document.querySelector('#sdt').value;
    sv.CMND = document.querySelector('#cmnd').value;
    sv.DiemToan = document.querySelector('#toan').value;
    sv.DiemLy = document.querySelector('#ly').value;
    sv.DiemHoa = document.querySelector('#hoa').value;
    console.log(sv);
    // gọi api cập nhật dữ liệu backend cung cấp
    axios({
        url: `http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien`,
        method: 'PUT',
        data: sv
    }).then(function (res) {
        console.log(res.data);
        window.location.reload();
    }).catch(function (err) {
        console.log(err);
    })
}