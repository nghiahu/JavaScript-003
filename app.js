let students = [
    {
        studentCode: "STU-001",
        fullName: "Đặng Gia Huy",
        courseName: "Tiếng Anh Giao Tiếp",
        age: 19,
        placementScore: 65
    },
    {
        studentCode: "STU-002",
        fullName: "Phan Ngọc Lan",
        courseName: "Tiếng Anh Học Thuật",
        age: 24,
        placementScore: 72
    },
    {
        studentCode: "STU-003",
        fullName: "Trương Bảo Ngọc",
        courseName: "Tiếng Anh Thiếu Nhi",
        age: 9,
        placementScore: 40
    }
];

let isExit = false;

function ptChoice() {
    while (true) {
        let choicePrompt = prompt("Vui lòng nhập lựa chọn của bạn");
        if (choicePrompt === null) {
            return null;
        }
        choicePrompt = choicePrompt.trim();

        if (choicePrompt === "") {
            return "";
        }
        return choicePrompt;
    }
}

function validateStudentCode(code) {
    if (code === "") {
        return "Lỗi: Chưa nhập mã học viên";
    }
    if (code.length < 6) {
        return "Lỗi: Độ dài nhỏ hơn 6 ký tự";
    }
    if (!code.startsWith("STU-")) {
        return 'Lỗi: Sai tiền tố "STU-"';
    }
    if (code.includes(" ")) {
        return "Lỗi: Chứa khoảng trắng";
    }
    if (findStudentIndex(code) !== -1) {
        return "Lỗi: Mã học viên đã tồn tại";
    }
    return "";
}

function findStudentIndex(code) {
    for (let i = 0; i < students.length; i++) {
        if (students[i].studentCode === code) {
            return i;
        }
    }
    return -1;
}

function normalizeText(rawText) {
    let textArr = rawText.trim().split(" ");
    let result = "";

    for (let text of textArr) {
        if (text !== "") {
            text = text.toLowerCase();
            text = text[0].toUpperCase() + text.slice(1);

            if (result !== "") {
                result += " ";
            }
            result += text;
        }
    }
    return result;
}

function inputIntegerInRange(message, min, max) {
    while (true) {
        let input = prompt(message);
        if (input === null) {
            return null;
        }
        input = input.trim();
        if (input === "") {
            console.log("Lỗi: Chưa nhập, vui lòng nhập lại!");
            continue;
        }
        let number = Number(input);
        if (!Number.isInteger(number)) {
            console.log("Lỗi: Không phải số nguyên, vui lòng nhập lại!");
            continue;
        }
        if (number < min || number > max) {
            console.log(`Lỗi: Ngoài phạm vi ${min} - ${max}, vui lòng nhập lại!`);
            continue;
        }
        return number;
    }
}

function displayStudents(list) {
    if (list.length <= 0) {
        console.log("Danh sách học viên trống");
        return;
    }
    for (let i = 0; i < list.length; i++) {
        console.log(`${i + 1}. ${list[i].studentCode} - ${list[i].fullName} - ${list[i].courseName} - Tuổi: ${list[i].age} | Điểm đầu vào: ${list[i].placementScore}`);
    }
    console.log(`Tổng: ${list.length} học viên`);
}

function addStudent() {
    let code = prompt("Vui lòng nhập mã học viên:");
    if (code === null) {
        console.log("Đã hủy thêm");
        return;
    }
    code = code.trim().toUpperCase();
    let error = validateStudentCode(code);
    if (error !== "") {
        console.log(error);
        return;
    }
    let name = prompt("Vui lòng nhập họ tên:");
    if (name === null) {
        console.log("Đã hủy thêm");
        return;
    }
    name = normalizeText(name);
    while (name === "") {
        name = prompt("Họ tên không được để trống, vui lòng nhập lại:");
        if (name === null) {
            console.log("Đã hủy thêm");
            return;
        }
        name = normalizeText(name);
    }
    let course = prompt("Vui lòng nhập tên khóa học:");
    if (course === null) {
        console.log("Đã hủy thêm");
        return;
    }
    course = normalizeText(course);
    while (course === "") {
        course = prompt("Tên khóa học không được để trống, vui lòng nhập lại:");

        if (course === null) {
            console.log("Đã hủy thêm");
            return;
        }
        course = normalizeText(course);
    }
    let age = inputIntegerInRange("Nhập tuổi (6 - 60):", 6, 60);
    if (age === null) {
        console.log("Đã hủy thêm");
        return;
    }
    let score = inputIntegerInRange("Nhập điểm đầu vào (0 - 100):", 0, 100);
    if (score === null) {
        console.log("Đã hủy thêm");
        return;
    }
    let newStudent = {
        studentCode: code,
        fullName: name,
        courseName: course,
        age: age,
        placementScore: score
    };
    students.push(newStudent);
    console.log("Thêm học viên thành công!");
    displayStudents([newStudent]);
}

function updateStudent() {
    let code = prompt("Nhập mã học viên cần cập nhật:");
    if (code === null) {
        console.log("Đã hủy thao tác cập nhật");
        return;
    }
    code = code.trim().toUpperCase();
    let index = findStudentIndex(code);
    if (index === -1) {
        console.log(`Không tìm thấy học viên có mã ${code}`);
        return;
    }
    let oldAge = students[index].age;
    let oldScore = students[index].placementScore;
    let newAge = inputIntegerInRange("Nhập tuổi mới (6 - 60):", 6, 60);
    if (newAge === null) {
        console.log("Đã hủy cập nhật");
        return;
    }
    let newScore = inputIntegerInRange("Nhập điểm đầu vào mới (0 - 100):", 0, 100);
    if (newScore === null) {
        console.log("Đã hủy cập nhật");
        return;
    }
    students[index].age = newAge;
    students[index].placementScore = newScore;
    console.log("Cập nhật thành công!");
    console.log(`Trước: ${oldAge} tuổi / ${oldScore} điểm`);
    console.log(`Sau: ${newAge} tuổi / ${newScore} điểm`);
}

function deleteStudent() {
    let code = prompt("Nhập mã học viên cần xóa:");
    if (code === null) {
        console.log("Đã hủy thao tác xóa");
        return;
    }
    code = code.trim().toUpperCase();
    let index = findStudentIndex(code);
    if (index === -1) {
        console.log(`Không tìm thấy học viên có mã ${code}`);
        return;
    }
    let confirmDel = prompt("Bạn có chắc chắn muốn xóa học viên này? (Y/N)");
    if (confirmDel === null || confirmDel.trim().toUpperCase() !== "Y") {
        console.log(`Đã hủy thao tác xóa, còn ${students.length} học viên`);
        return;
    }
    students.splice(index, 1);
    console.log(`Xóa học viên thành công, còn ${students.length} học viên`);
}

// function findStundentByCouse(){
//     let couseFind = print("Nhập khóa học muốn tìm");
//     let noramlFind = normalizeText(couseFind).toLowerCase();
//     for(let )
// }
do {
    console.log("=====================================================");
    console.log("  HỆ THỐNG QUẢN LÝ HỌC VIÊN TRUNG TÂM GLOBAL ENGLISH ");
    console.log("=====================================================");
    console.log("1. Hiển thị danh sách học viên");
    console.log("2. Thêm học viên mới");
    console.log("3. Cập nhật thông tin học viên");
    console.log("4. Xóa học viên");
    console.log("5. Tìm kiếm học viên theo khóa học");
    console.log("0. Thoát chương trình");
    console.log("=====================================================");
    console.log("Vui lòng nhập lựa chọn của bạn (0 - 5): ");
    let choice = ptChoice();
    switch (choice) {
        case "1":
            displayStudents(students);
            break;
        case "2":
            addStudent();
            break;
        case "3":
            updateStudent();
            break;
        case "4":
            deleteStudent();
            break;
        case "5":
            break;
        case "0":
            isExit = true;
            console.log("Chương trình kết thúc! Hẹn gặp lại!");
            break;
        default:
            console.log("Lựa chọn không hợp lệ, vui lòng lựa chọn lại!");
            break;
    }
} while (!isExit);